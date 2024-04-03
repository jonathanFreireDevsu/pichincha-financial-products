import { Injectable } from '@angular/core';
import { FormIDType } from "src/app/models/form.types";
import { stringLenghtValidations } from "src/app/constants/string-lenght-validations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ScreenModeType } from 'src/app/models/screen-mode.types';
import { ValidationService } from 'src/app/services/validation.service';
import { NotificationService } from '../../notification/notification.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { transformISODate } from 'src/app/utils/format.utils';
import { ProductStateService } from 'src/app/services/product-state.service';

@Injectable({
    providedIn: 'root',
})
export class ProductFormService {
    constructor(
        private fb: FormBuilder,
        private validationService: ValidationService,
        private notificationService: NotificationService,
        private router: Router,
        private productsService: ProductsService,
        private productStateService: ProductStateService,
    ){}

    populateForm(screenMode: ScreenModeType): FormGroup {
        const selectedProduct = this.productStateService.getSelectedProduct();
        const allowIdVerify = screenMode === 'add' && [this.validationService.idExists(screenMode)];
        const form = this.fb.group({
          id: ['', {
            validators: [
              Validators.required,
              Validators.minLength(stringLenghtValidations.id.min),
              Validators.maxLength(stringLenghtValidations.id.max)
            ], 
            asyncValidators: allowIdVerify, 
            updateOn: 'blur' 
          }],
          name: ['', [
            Validators.required,
            Validators.minLength(stringLenghtValidations.name.min),
            Validators.maxLength(stringLenghtValidations.name.max)
          ]],
          description: ['', [
            Validators.required,
            Validators.minLength(stringLenghtValidations.description.min),
            Validators.maxLength(stringLenghtValidations.description.max)
          ]],
          logo: ['', [Validators.required, this.validationService.isValidUrl]],
          date_release: ['', [
            Validators.required,
            Validators.minLength(7),
            this.validationService.dateGreaterEqualThanToday
          ]],
          date_revision: ['', [Validators.required, Validators.minLength(7)]],
        },
        { 
          validator: this.validationService.releaseGreatherOneYearThanRevision
        });
        if (selectedProduct && screenMode === 'update') {
            form.setValue({
              id: selectedProduct.id,
              name: selectedProduct.name,
              description: selectedProduct.description,
              logo: selectedProduct.logo,
              date_release: transformISODate(selectedProduct.date_release),
              date_revision: transformISODate(selectedProduct.date_revision),
            })
        }
        return form
    };

    getErrorMessage(form: FormGroup, id: FormIDType) {
        const formControls = form.controls;
        const formControlsErrors = formControls[id].errors;
        const formErrors = form['errors'] as any;
        if (formControlsErrors) {
            if (formControls[id].dirty || formControls[id].touched) {
            if (formControlsErrors['required']) {
                return 'El campo es requerido';
            }
            if (formControlsErrors['minlength']) {
                return `Debe tener al menos ${stringLenghtValidations[id].min} caracteres`;
            }
            if (formControlsErrors['maxlength']) {
                return `Debe tener como máximo ${stringLenghtValidations[id].max} caracteres`;
            }
            if (formControlsErrors['dateGreaterEqualThanToday']) {
                return 'Debe ser mayor o igual a la fecha actual';
            }
            if (formControlsErrors['idExists']) {
                return 'Este ID no está disponible';
            }
            if (formControlsErrors['invalidUrl']) {
                return 'URL no válido';
            }
            }
        }
        if (formErrors) {
            if (formErrors?.releaseGreatherOneYearThanRevision && id === 'date_revision') {
            return 'Debe ser un año mayor a Fecha liberación';
            }
        }
        return '';
    };

    handleSubmitAdd(data: Product) {
        this.productsService.addItem(data).subscribe(
            (_) => {
              this.router.navigate([''])
              this.notificationService.showNotification(
                'Se ha añadido el producto con éxito',
                'done'
              );
            },
            (_) => {
              this.notificationService.showNotification(
                'Hubo un error al intentar añadir el producto',
                'error'
              );
            }
          );
    }

    handleSubmitUpdate(data: Product) {
        this.productsService.updateItem(data).subscribe(
            (_) => {
                this.router.navigate([''])
                this.notificationService.showNotification(
                'Se ha actualizado el producto con éxito',
                'done'
                );
            },
            (_) => {
                this.notificationService.showNotification(
                'Hubo un error al intentar actualizar el producto',
                'error'
                );
            }
        );
    }

}