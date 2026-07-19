import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { ProductService } from '../../../core/services/product.service';
import { ProductResponse } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { RatingService } from '../../../core/services/rating.service';
import { AddToCartRequest } from '../../../core/models/cart.model';

@Component({
  selector: 'app-product-feed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-feed.html',
  styleUrl: './product-feed.css',
})
export class ProductFeed implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService);
  private ratingService = inject(RatingService);
isAddingToCart: { [productId: string]: boolean } = {};

  products: ProductResponse[] = [];
  filteredProducts: ProductResponse[] = [];
  isLoading = false;
  errorMessage = '';
  searchKeyword = '';
  // rating UI state
  ratingOpen: { [productId: string]: boolean } = {};
  ratingValue: { [productId: string]: number } = {};
  ratingComment: { [productId: string]: string } = {};
  isSubmittingRating: { [productId: string]: boolean } = {};

  ngOnInit(): void {
    this.loadFeed();
  }

  toggleRatingForm(productId: string): void {
    this.ratingOpen[productId] = !this.ratingOpen[productId];
    if (this.ratingOpen[productId]) {
      this.ratingValue[productId] = 5;
      this.ratingComment[productId] = '';
    }
  }

  submitRating(productId: string): void {
    const rating = this.ratingValue[productId] ?? 5;
    const comment = this.ratingComment[productId] ?? '';
    this.isSubmittingRating[productId] = true;

    this.ratingService.submitProductRating({ productId, rating: String(rating), comment }).subscribe({
      next: () => {
        // refresh product summary
        this.ratingService.getProductRatingSummary(productId).subscribe({
          next: (summary) => {
            const p = this.products.find(x => x.id === productId);
            if (p) {
              p.productRatingSummary = {
                productId: productId,
                averageRating: summary.averageRating,
                totalRatings: summary.totalRatings,
              };
            }
            this.isSubmittingRating[productId] = false;
            this.ratingOpen[productId] = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.isSubmittingRating[productId] = false;
            this.ratingOpen[productId] = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.isSubmittingRating[productId] = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadFeed(): void {
    this.isLoading = true;
    this.productService.getProductFeed().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Feed error:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    if (!this.searchKeyword.trim()) {
      this.filteredProducts = this.products;
      return;
    }
    this.productService.searchProducts(this.searchKeyword).subscribe({
      next: (products) => this.filteredProducts = products,
      error: () => this.filteredProducts = []
    });
  }

  clearSearch(): void {
    this.searchKeyword = '';
    this.filteredProducts = this.products;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  roundRating(value: number): number {
    return Math.round(value);
  }

  addToCart(productId: string): void {
    this.isAddingToCart[productId] = true;
    const payload: AddToCartRequest = { productId, quantity: 1 };
    this.cartService.addToCart(payload).subscribe({
      next: () => {
        this.isAddingToCart[productId] = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isAddingToCart[productId] = false;
        this.cdr.detectChanges();
      }
    });
  }
}
