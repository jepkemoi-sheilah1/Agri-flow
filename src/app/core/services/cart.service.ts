import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import { AddToCartRequest, CartResponse } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    private http = inject(HttpClient);

    getCart(): Observable<CartResponse> {
        return this.http.get<CartResponse>(
            `${environment.orderApiUrl}${Endpoints.cart.get}`
        );
    }

    addToCart(data: AddToCartRequest): Observable<CartResponse> {
        return this.http.post<CartResponse>(
            `${environment.orderApiUrl}${Endpoints.cart.add}`,
            data
        );
    }

    removeItem(itemId: string): Observable<any> {
        return this.http.delete(
            `${environment.orderApiUrl}${Endpoints.cart.removeItem(itemId)}`
        );
    }

    clearCart(): Observable<any> {
        return this.http.delete(
            `${environment.orderApiUrl}${Endpoints.cart.clear}`
        );
    }
}