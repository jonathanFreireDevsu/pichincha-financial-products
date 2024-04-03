import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from 'src/app/utils/mock-declarations';
import { ProductFormService } from './product-form.service';
import { NotificationService } from '../../notification/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductStateService } from 'src/app/services/product-state.service';
import { ValidationService } from 'src/app/services/validation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('Notification service', () => {
    let service: ProductFormService;
    let mockNotificationService: any;
    let mockProductsService: any;
    let mockProductStateService: any;
    let mockValidationService: any;
    let mockRouter: any;
    let mockExample = {
        "id": "12311",
        "name": "TEST 1",
        "description": "Producto de prueba",
        "logo": "https://www.google.com/images/img.png",
        "date_release": "2023-10-19T00:00:00.000+00:00",
        "date_revision": "2024-10-19T00:00:00.000+00:00"
      };

    beforeEach(() => {
        TestBed.configureTestingModule(mockDeclarations);

        mockNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);
        mockProductsService = jasmine.createSpyObj('ProductsService', ['addItem', 'updateItem']);
        mockProductStateService = jasmine.createSpyObj('ProductStateService', ['getSelectedProduct']);
        mockValidationService = jasmine.createSpyObj('ValidationService', [
        'idExists',
        'isValidUrl',
        'dateGreaterEqualThanToday',
        'releaseGreatherOneYearThanRevision'
        ]);
        mockRouter = { navigate: jasmine.createSpy('navigate') };

        TestBed.configureTestingModule({
        providers: [
            ProductFormService,
            FormBuilder,
            { provide: NotificationService, useValue: mockNotificationService },
            { provide: ProductsService, useValue: mockProductsService },
            { provide: ProductStateService, useValue: mockProductStateService },
            { provide: ValidationService, useValue: mockValidationService },
            { provide: Router, useValue: mockRouter }
        ],
        });

        service = TestBed.inject(ProductFormService);
    
    });

    describe('populate form', () => {
        it('populateForm should populate the form for add mode without a selected product', () => {
            const form = {
                controls: {
                    name: {
                        errors: { 'required': true },
                        dirty: true,
                        touched: true,
                    }
                },
                errors: null,
              };
            expect(form).toBeTruthy();
          });
        
          it('populateForm should populate the form for update mode with a selected product', () => {
            mockProductStateService.getSelectedProduct.and.returnValue(mockExample);
        
            const form = service.populateForm('update');
            expect(form.controls['name'].value).toEqual('TEST 1');
          });
    })

    describe('getErrorMessage', () => {
        it('return error message for required field', () => {
          const form = {
            controls: {
                name: {
                    errors: { 'required': true },
                    dirty: true,
                    touched: true,
                }
            },
            errors: null,
          };
          const errorMessage = service.getErrorMessage(form as unknown as FormGroup<any>, 'name');
          expect(errorMessage).toEqual('El campo es requerido');
        });
      });

    describe('handleSubmitAdd', () => {
        it('should navigate and show notification on successful add', () => {
            mockProductsService.addItem.and.returnValue(of({}));
            service.handleSubmitAdd(mockExample);

            expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
            expect(mockNotificationService.showNotification).toHaveBeenCalledWith(
                'Se ha añadido el producto con éxito', 'done'
            );
        });

        it('should return error with notification', () => {
            mockProductsService.addItem.and.returnValue(throwError(() => new Error('Error')));
            service.handleSubmitAdd(mockExample);
        
            expect(mockNotificationService.showNotification).toHaveBeenCalledWith(
              'Hubo un error al intentar añadir el producto', 'error'
            );
          });
    });
    describe('handleSubmitUpdate', () => {
        it('should navigate and show notification on successful update', () => {
            mockProductsService.updateItem.and.returnValue(of({}));
            service.handleSubmitUpdate(mockExample);

            expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
            expect(mockNotificationService.showNotification).toHaveBeenCalledWith(
                'Se ha actualizado el producto con éxito', 'done'
            );
        });
        it('should return error with notification', () => {
            mockProductsService.updateItem.and.returnValue(throwError(() => new Error('Error')));
            service.handleSubmitUpdate(mockExample);
        
            expect(mockNotificationService.showNotification).toHaveBeenCalledWith(
              'Hubo un error al intentar actualizar el producto', 'error'
            );
          });
    });
});