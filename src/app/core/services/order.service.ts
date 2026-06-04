import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import { CheckoutRequest, OrderResponse } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private http = inject(HttpClient);

    checkout(data: CheckoutRequest): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(
            `${environment.orderApiUrl}${Endpoints.order.checkout}`,
            data
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
        );
    }

    getBusinessOrders(businessId: string): Observable<OrderResponse[]> {
        return this.http.get<OrderResponse[]>(
            `${environment.orderApiUrl}${Endpoints.order.businessOrders(businessId)}`
        );
    }

    updateStatus(id: string, status: string): Observable<OrderResponse> {
        return this.http.patch<OrderResponse>(
            `${environment.orderApiUrl}${Endpoints.order.updateStatus(id)}`,
            { status }
        );
    }
}