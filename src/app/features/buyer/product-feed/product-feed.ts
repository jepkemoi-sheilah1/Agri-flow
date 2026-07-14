import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
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

@Component({
  selector: 'app-product-feed',
  standalone: true,
  imports: [
    RouterLink,
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

  products: ProductResponse[] = [];
  filteredProducts: ProductResponse[] = [];
  isLoading = false;
  errorMessage = '';
  searchKeyword = '';

  ngOnInit(): void {
    this.loadFeed();
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
}