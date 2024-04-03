import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { mockDeclarations } from 'src/app/utils/mock-declarations';
import { Product } from 'src/app/models/product.model';
import { HomeService } from './home.service';
import { ProductsService } from 'src/app/services/products.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { of, throwError } from 'rxjs';

describe('Home service', () => {
  let service: HomeService;
  let productsServiceMock: any;
  let notificationServiceMock: any;
  
  let mockExample: Product = {
      "id": "12311",
      "name": "TEST 1",
      "description": "Producto de prueba",
      "logo": "https://www.google.com/images/img.png",
      "date_release": "2024-04-19T00:00:00.000+00:00",
      "date_revision": "2024-05-19T00:00:00.000+00:00"
    };

  beforeEach(() => {
    productsServiceMock = jasmine.createSpyObj('ProductsService', ['getItems']);
    notificationServiceMock = jasmine.createSpyObj('NotificationService', ['showNotification']);

    TestBed.configureTestingModule({
        providers: [
          HomeService,
          { provide: ProductsService, useValue: productsServiceMock },
          { provide: NotificationService, useValue: notificationServiceMock }
        ],
      });

    service = TestBed.inject(HomeService);
  });

  describe('setProducts', () => {
    it('set products and filteredProducts on successful data retrieval', () => {
      productsServiceMock.getItems.and.returnValue(of([mockExample]));
  
      service.setProducts();
  
      service.products.subscribe(products => {
        expect(products).toEqual([mockExample]);
      });
  
      service.filteredProducts.subscribe(filteredProducts => {
        expect(filteredProducts).toEqual([mockExample]);
      });
    });
  
    it('it should call notificationService on error', () => {
      productsServiceMock.getItems.and.returnValue(throwError(() => new Error('Error fetching products')));
      service.setProducts();
  
      expect(notificationServiceMock.showNotification).toHaveBeenCalledWith(
        'Hubo un error, no se pudo obtener la data', 'error'
      );
    });
  });

  describe('handleSearch', () => {
    it('filter list based on the search value', (done: DoneFn) => {
      service.products.next([mockExample]);
  
      service.handleSearch('1');
  
      service.filteredProducts.subscribe(filteredProducts => {
        expect(filteredProducts.length).toBe(1);
        expect(filteredProducts[0]).toEqual(mockExample);
        done();
      });
    });
  
    it('return all products when the search value is empty', (done: DoneFn) => {
      service.products.next([mockExample]);
  
      service.handleSearch('');
  
      service.filteredProducts.subscribe(filteredProducts => {
        expect(filteredProducts).toEqual([mockExample]);
        done();
      });
    });
  });
 
});