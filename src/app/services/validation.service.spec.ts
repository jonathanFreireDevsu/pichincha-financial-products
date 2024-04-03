import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { mockDeclarations } from '../utils/mockDeclarations';
import { ValidationService } from './validation.service';

describe('DataService', () => {
  let service: ValidationService;
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

    service = TestBed.inject(ValidationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('DataService', () => {
    expect(service).toBeTruthy();
  });

  it('should validate data via GET', () => {
    const idToValidate = '1';
    const verificationResponse = true;

    service.verifyId(idToValidate).subscribe((data) => {
      expect(data).toEqual(verificationResponse);
    });
    const url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification';
    const req = httpTestingController.expectOne(`${url}?id=${idToValidate}`);
    expect(req.request.method).toBe('GET');
    req.flush(verificationResponse);
  });
});