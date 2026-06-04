import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category, CreateProductRequest } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints'; 



@Injectable({ providedIn: 'root' })
export class ProductService {
    private http = inject(HttpClient);

    // GET /api/categories
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(
            `${environment.productApiUrl}${Endpoints.product.categories}`
        );
    }

    // POST /api/products
    createProduct(data: CreateProductRequest): Observable<Product> {
        return this.http.post<Product>(
            `${environment.productApiUrl}${Endpoints.product.create}`,
            data
        );
    }

    // POST /api/products/{id}/images
    uploadProductImage(productId: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(
            `${environment.productApiUrl}${Endpoints.product.uploadImage(productId)}`,
            formData
        );
    }

    // GET /api/products/feed
    getProductFeed(): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.feed}`
        );
    }

    // GET /api/products/my
    getMyProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.myProducts}`
        );
    }

    // GET /api/businesses/pending
    getPendingBusinesses(): Observable<any[]> {
        return this.http.get<any[]>(
            `${environment.productApiUrl}${Endpoints.product.pendingBusinesses}`
        );
    }

    // GET /api/products/filter?categoryId=
    filterByCategory(categoryId: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.filterByCategory}`,
            { params: { categoryId } }
        );
    }

    // GET /api/products/search?keyword=
    searchProducts(keyword: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.productApiUrl}${Endpoints.product.search}`,
            { params: { keyword } }
        );
    }
}