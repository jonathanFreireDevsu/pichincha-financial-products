import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { mockDeclarations } from '../utils/mock-declarations';
import { ProductsService } from './products.service';

describe('DataService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;
  let mockExample = {
      "id": "12311",
      "name": "TEST 1",
      "description": "Producto de prueba, generado para testear componentes ademas de otros implementos",
      "logo": "https://previews.123rf.com/images/magurok/magurok1408/magurok140800176/30819935-vector-tarjeta-de-cr%C3%A9dito-icon-negro.jpg",
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

  it('DataService', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data via GET', () => {
    const mockData: any[] = [mockExample];

    service.getItems().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should add data via POST', () => {
    const newItem: any = mockExample;

    service.addItem(newItem).subscribe((data) => {
      expect(data).toEqual(newItem);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newItem);
  });

  it('should update data via PUT', () => {
    const updatedItem: any = mockExample;

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
});