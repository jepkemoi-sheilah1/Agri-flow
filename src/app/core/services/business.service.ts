import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../config/endpoints';
import { BusinessResponse } from '../models/kyc.model';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private http = inject(HttpClient);

  registerBusiness(data: { businessName: string; businessEmail: string; businessPhone: string }): Observable<BusinessResponse> {
    return this.http.post<BusinessResponse>(Endpoints.auth.businessRegister, data);
  }

  getMyBusiness(): Observable<BusinessResponse> {
    return this.http.get<BusinessResponse>(Endpoints.business.myBusiness);
  }

  getPublicProfile(businessId: string): Observable<BusinessResponse> {
    return this.http.get<BusinessResponse>(Endpoints.business.publicProfile(businessId));
  }

  getPendingBusinesses(): Observable<BusinessResponse[]> {
    return this.http.get<BusinessResponse[]>(Endpoints.business.pending);
  }

  approveBusiness(id: string): Observable<BusinessResponse> {
    return this.http.patch<BusinessResponse>(Endpoints.business.approveBusinesses(id), {});
  }

  rejectBusiness(id: string): Observable<BusinessResponse> {
    return this.http.patch<BusinessResponse>(Endpoints.business.rejectBusiness(id), {});
  }
}
