import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category, CreateProductRequest } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private http = inject(HttpClient);

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(
            `${environment.productApiUrl}${Endpoints.product.categories}`
        );
    }

    createProduct(data: CreateProductRequest): Observable<Product> {
        return this.http.post<Product>(
            `${environment.productApiUrl}${Endpoints.product.create}`,
            data
        );
    }

    uploadProductImage(productId: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(
            `${environment.productApiUrl}${Endpoints.product.uploadImage(productId)}`,
            formData
        );
    }

    getProductFeed(): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.feed}`
        );
    }

    getMyProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.myProducts}`
        );
    }

    getPendingBusinesses(): Observable<any[]> {
        return this.http.get<any[]>(
            `${environment.productApiUrl}${Endpoints.product.pendingBusinesses}`
        );
    }

    filterByCategory(categoryId: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.filterByCategory}`,
            { params: { categoryId } }
        );
    }

    searchProducts(keyword: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.search}`,
            { params: { keyword } }
        );
    }
}