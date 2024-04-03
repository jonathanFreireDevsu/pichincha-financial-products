import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { mockDeclarations } from '../utils/mock-declarations';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';

describe('Product state service', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;
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

    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Product state', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data via GET', () => {
    const mockData: Product[] = [mockExample];

    service.getItems().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should add data via POST', () => {
    const newItem: Product = mockExample;

    service.addItem(newItem).subscribe((data) => {
      expect(data).toEqual(newItem);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newItem);
  });

  it('should update data via PUT', () => {
    const updatedItem: Product = mockExample;

    service.updateItem(updatedItem).subscribe((data) => {
      expect(data).toEqual(updatedItem);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedItem);
  });

  it('should delete data via DELETE', () => {
    const idToDelete = '1';

    service.deleteItem(idToDelete).subscribe();

    const req = httpTestingController.expectOne(`${service['apiUrl']}?id=${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should validate data via GET', () => {
    const idToValidate = '1';
    const verificationResponse = true;

    service.verifyId(idToValidate).subscribe((data) => {
      expect(data).toEqual(verificationResponse);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/verification?id=${idToValidate}`);
    expect(req.request.method).toBe('GET');
    req.flush(verificationResponse);
  });
});