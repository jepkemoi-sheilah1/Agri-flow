import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';

export interface RatingRequest {
  businessId?: string;
  productId?: string;
  rating: number;
  comment: string;
}

export interface RatingResponse {
  id: string;
  userId: string;
  businessId?: string;
  productId?: string;
  rating: number;
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
      `${environment.authApiUrl}${Endpoints.business.submitRating}`, data
    );
  }

  getBusinessRatings(businessId: string): Observable<RatingResponse[]> {
    return this.http.get<RatingResponse[]>(
      `${environment.authApiUrl}${Endpoints.business.ratingsByBusiness(businessId)}`
    );
  }

  getBusinessRatingSummary(businessId: string): Observable<RatingSummary> {
    return this.http.get<RatingSummary>(
      `${environment.authApiUrl}${Endpoints.business.ratingSummary(businessId)}`
    );
  }

  deleteBusinessRating(businessId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.authApiUrl}${Endpoints.business.deleteRating(businessId)}`
    );
  }

  // Product ratings
  submitProductRating(data: RatingRequest): Observable<RatingResponse> {
    return this.http.post<RatingResponse>(
      `${environment.productApiUrl}${Endpoints.product.submitRating}`, data
    );
  }

  getProductRatings(productId: string): Observable<RatingResponse[]> {
    return this.http.get<RatingResponse[]>(
      `${environment.productApiUrl}${Endpoints.product.ratingsByProduct(productId)}`
    );
  }

  getProductRatingSummary(productId: string): Observable<RatingSummary> {
    return this.http.get<RatingSummary>(
      `${environment.productApiUrl}${Endpoints.product.ratingSummary(productId)}`
    );
  }

  deleteProductRating(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.productApiUrl}${Endpoints.product.deleteRating(productId)}`
    );
  }
}