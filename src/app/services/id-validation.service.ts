import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdValidationService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  private authorId = environment.authorId;
  private headers = new HttpHeaders().set('authorId', this.authorId);

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification?id=${id}`, { headers: this.headers });
  }
}
