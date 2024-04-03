import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private authorId = environment.authorId;
  private headers = new HttpHeaders().set('authorId', this.authorId);
  
  constructor(private http: HttpClient) { }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.headers });
  }

  addItem(item: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, item, { headers: this.headers });
  }

  updateItem(item: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}`, item, { headers: this.headers });
  }

  deleteItem(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { headers: this.headers, responseType: 'text' });
  }

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification?id=${id}`, { headers: this.headers });
  }
}
