import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/products';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private authorId = environment.authorId;
  private headers = new HttpHeaders().set('authorId', this.authorId);
  
  constructor(private http: HttpClient) { }

  currentProduct : Product | undefined;

  setCurrentProduct(product: Product | undefined) {
    this.currentProduct = product;
  }

  getCurrentProduct() {
    return this.currentProduct;
  }

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  addItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item, { headers: this.headers });
  }

  updateItem(item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, item, { headers: this.headers });
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { headers: this.headers, responseType: 'text' });
  }
}
