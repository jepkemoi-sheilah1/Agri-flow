import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RatingRequest {
  businessId?: string;
  productId?: string;
  rating: string;
  comment: string;
}

export interface RatingResponse {
  id: string;
  userId: string;
  businessId?: string;
  productId?: string;
  rating: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface RatingSummary {
  businessId?: string;
  productId?: string;
  averageRating: number;
  totalRatings: number;
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  private http = inject(HttpClient);

  // Business ratings
  submitBusinessRating(data: RatingRequest): Observable<RatingResponse> {
    return this.http.post<RatingResponse>(
      `${environment.authApiUrl}/api/businesses/ratings`, data
    );
  }

  getBusinessRatings(businessId: string): Observable<RatingResponse[]> {
    return this.http.get<RatingResponse[]>(
      `${environment.authApiUrl}/api/businesses/ratings/business/${businessId}`
    );
  }

  getBusinessRatingSummary(businessId: string): Observable<RatingSummary> {
    return this.http.get<RatingSummary>(
      `${environment.authApiUrl}/api/businesses/ratings/business/${businessId}/summary`
    );
  }

  deleteBusinessRating(businessId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.authApiUrl}/api/businesses/ratings/business/${businessId}`
    );
  }

  // Product ratings
  submitProductRating(data: RatingRequest): Observable<RatingResponse> {
    return this.http.post<RatingResponse>(
      `${environment.productApiUrl}/api/products/ratings`, data
    );
  }

  getProductRatings(productId: string): Observable<RatingResponse[]> {
    return this.http.get<RatingResponse[]>(
      `${environment.productApiUrl}/api/products/ratings/product/${productId}`
    );
  }

  getProductRatingSummary(productId: string): Observable<RatingSummary> {
    return this.http.get<RatingSummary>(
      `${environment.productApiUrl}/api/products/ratings/product/${productId}/summary`
    );
  }

  deleteProductRating(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.productApiUrl}/api/products/ratings/product/${productId}`
    );
  }
}