import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../utils/mock-declarations';
import { Product } from '../models/product.model';
import { ProductStateService } from './product-state.service';

describe('Products service', () => {
  let service: ProductStateService;
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

    service = TestBed.inject(ProductStateService);
  });

  it('setSelectedProduct should set selectedProduct', () => {
    const testProduct = mockExample;
    service.setSelectedProduct(testProduct);
    expect(service.selectedProduct).toEqual(testProduct);
  });
  
  it('should return the currently selected product', () => {
    const testProduct = mockExample;
    service.setSelectedProduct(testProduct);
    const selectedProduct = service.getSelectedProduct();
    expect(selectedProduct).toEqual(testProduct);
  });

  it('should return undefined if no product is selected', () => {
    service.clearSelectedProduct();
    const selectedProduct = service.getSelectedProduct();
    expect(selectedProduct).toBeUndefined();
  });
  
  it('should clear the selectedProduct', () => {
    const testProduct = mockExample;
    service.setSelectedProduct(testProduct);
    service.clearSelectedProduct();
    expect(service.selectedProduct).toBeUndefined();
  });
});