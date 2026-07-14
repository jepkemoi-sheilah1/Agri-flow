import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { ProductService } from '../../../core/services/product.service';
import { ProductResponse } from '../../../core/models/product.model';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  templateUrl: './my-products.html',
  styleUrl: './my-products.css',
})
export class MyProducts implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  products: ProductResponse[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load your products.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToCreate(): void {
    this.router.navigate(['/seller/create-product']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/seller/products', id, 'edit']);
  }

  markOutOfStock(id: string): void {
    this.productService.markOutOfStock(id).subscribe({
      next: () => {
        this.snackBar.open('Product marked as out of stock.', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: () => {
        this.snackBar.open('Failed to update product.', 'Close', { duration: 3000 });
      }
    });
  }

  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open('Product deleted.', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: () => {
        this.snackBar.open('Failed to delete product.', 'Close', { duration: 3000 });
      }
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  getStockClass(status: string): string {
    return status === 'IN_STOCK' ? 'chip-in-stock' : 'chip-out-of-stock';
  }
}