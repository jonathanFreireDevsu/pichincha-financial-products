import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

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