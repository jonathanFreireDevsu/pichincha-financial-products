import { Injectable } from '@angular/core';
import { Product } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  selectedProduct : Product | undefined;

  setSelectedProduct(product: Product | undefined) {
    this.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  clearSelectedProduct(): void {
    this.selectedProduct = undefined;
  }
}