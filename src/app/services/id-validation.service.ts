import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdValidationService {
  constructor(private http: HttpClient) { }

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=${id}`);
  }
}
