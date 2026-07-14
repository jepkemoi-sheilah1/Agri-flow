import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProductResponse,
  Category,
  CreateProductRequest,
  UpdateProductRequest
} from '../models/product.model';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.productApiUrl}${Endpoints.category.getAll}`
    );
  }

  createProduct(data: CreateProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(
      `${environment.productApiUrl}${Endpoints.product.create}`, data
    );
  }

  getProductById(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${environment.productApiUrl}${Endpoints.product.getById(id)}`
    );
  }

  updateProduct(id: string, data: UpdateProductRequest): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(
      `${environment.productApiUrl}${Endpoints.product.update(id)}`, data
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.productApiUrl}${Endpoints.product.delete(id)}`
    );
  }

  markOutOfStock(id: string): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(
      `${environment.productApiUrl}${Endpoints.product.markOutOfStock(id)}`, {}
    );
  }

  uploadProductImage(productId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${environment.productApiUrl}${Endpoints.product.addImage(productId)}`, formData
    );
  }

  getProductFeed(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.productApiUrl}${Endpoints.product.feed}`
    );
  }

  getMyProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.productApiUrl}${Endpoints.product.myProducts}`
    );
  }

  getProductsByCategory(categoryId: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.productApiUrl}${Endpoints.product.byCategory(categoryId)}`
    );
  }

  getBusinessProducts(businessId: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.productApiUrl}${Endpoints.product.byBusiness(businessId)}`
    );
  }

  searchProducts(keyword: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.productApiUrl}${Endpoints.product.search}`,
      { params: { keyword } }
    );
  }
}