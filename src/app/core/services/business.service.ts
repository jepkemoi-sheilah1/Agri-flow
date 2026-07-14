import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import { BusinessResponse, RegisterBusinessRequest } from '../models/kyc.model';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private http = inject(HttpClient);

  registerBusiness(data: RegisterBusinessRequest): Observable<BusinessResponse> {
    return this.http.post<BusinessResponse>(
      `${environment.authApiUrl}${Endpoints.auth.businessRegister}`, data
    );
  }

  getMyBusiness(): Observable<BusinessResponse> {
    return this.http.get<BusinessResponse>(
      `${environment.authApiUrl}${Endpoints.business.myBusiness}`
    );
  }

  getPublicProfile(businessId: string): Observable<BusinessResponse> {
    return this.http.get<BusinessResponse>(
      `${environment.authApiUrl}${Endpoints.business.publicProfile(businessId)}`
    );
  }

  getPendingBusinesses(): Observable<BusinessResponse[]> {
    return this.http.get<BusinessResponse[]>(
      `${environment.authApiUrl}${Endpoints.business.pending}`
    );
  }

  getVerifiedBusinesses(): Observable<BusinessResponse[]> {
    return this.http.get<BusinessResponse[]>(
      `${environment.authApiUrl}${Endpoints.business.verified}`
    );
  }

  approveBusiness(id: string): Observable<BusinessResponse> {
    return this.http.patch<BusinessResponse>(
      `${environment.authApiUrl}${Endpoints.business.approveBusiness(id)}`, {}
    );
  }

  rejectBusiness(id: string): Observable<BusinessResponse> {
    return this.http.patch<BusinessResponse>(
      `${environment.authApiUrl}${Endpoints.business.rejectBusiness(id)}`, {}
    );
  }
}