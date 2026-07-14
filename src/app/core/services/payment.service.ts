import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import { StkPushRequest, PaymentResponse } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);

  initiateStkPush(payload: StkPushRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(
      `${environment.paymentApiUrl}${Endpoints.payment.stkPush}`, payload
    );
  }

  getMyPayments(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(
      `${environment.paymentApiUrl}${Endpoints.payment.myPayments}`
    );
  }

  getPaymentsByOrder(orderId: string): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(
      `${environment.paymentApiUrl}${Endpoints.payment.getByOrder(orderId)}`
    );
  }

  getPaymentStatus(checkoutRequestId: string): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(
      `${environment.paymentApiUrl}${Endpoints.payment.getStatus(checkoutRequestId)}`
    );
  }
}