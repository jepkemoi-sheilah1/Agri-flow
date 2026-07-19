import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import {
  CheckoutRequest,
  OrderResponse,
  SellerOrderResponse,
  UpdateFulfillmentRequest,
  RestoreRequest
} from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  checkout(data: CheckoutRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(
      `${environment.orderApiUrl}${Endpoints.order.checkout}`, data
    );
  }

  getOrder(id: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(
      `${environment.orderApiUrl}${Endpoints.order.getById(id)}`
    );
  }

  getMyOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(
      `${environment.orderApiUrl}${Endpoints.order.myOrders}`
    ).pipe(
      catchError((error) => {
        if (error?.status === 404 && error?.error?.message?.toLowerCase().includes('your order list is empty')) {
          return of([]);
        }
        return throwError(() => error);
      })
    );
  }

  getSellerOrders(): Observable<SellerOrderResponse[]> {
    return this.http.get<SellerOrderResponse[]>(
      `${environment.orderApiUrl}${Endpoints.order.sellerOrders}`
    );
  }

  getSellerOrderDetail(orderId: string): Observable<SellerOrderResponse> {
    return this.http.get<SellerOrderResponse>(
      `${environment.orderApiUrl}${Endpoints.order.sellerOrderDetail(orderId)}`
    );
  }

  updateFulfillmentStatus(orderId: string, data: UpdateFulfillmentRequest): Observable<SellerOrderResponse> {
    return this.http.patch<SellerOrderResponse>(
      `${environment.orderApiUrl}${Endpoints.order.updateFulfillmentStatus(orderId)}`, data
    );
  }

  restoreOrderToCart(data: RestoreRequest): Observable<any> {
    return this.http.post<any>(
      `${environment.orderApiUrl}${Endpoints.order.restore}`, data
    );
  }
}