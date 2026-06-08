import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../config/endpoints';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private http = inject(HttpClient);

  getMyBusiness(): Observable<any> {
    return this.http.get<any>(Endpoints.business.myBusiness);
  }

  getPublicProfile(businessId: string): Observable<any> {
    return this.http.get<any>(Endpoints.business.publicProfile(businessId));
  }

  getPendingBusinesses(): Observable<any[]> {
    return this.http.get<any[]>(Endpoints.business.pending);
  }
}
