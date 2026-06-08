import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../config/endpoints';
import { StkPushRequest, PaymentResponse } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);

  initiateStkPush(payload: StkPushRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(Endpoints.payment.stkPush, payload);
  }

  getMyPayments(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(Endpoints.payment.myPayments);
  }

  getPaymentsByOrder(orderId: string): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(Endpoints.payment.getByOrder(orderId));
  }
}
