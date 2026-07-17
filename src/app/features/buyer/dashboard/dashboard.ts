import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { AuthService } from '../../../core/auth/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { BusinessService } from '../../../core/services/business.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductResponse } from '../../../core/models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    DashboardLayout,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private businessService = inject(BusinessService);
  private cartService = inject(CartService);
  private cdr = inject(ChangeDetectorRef);

  user = this.authService.getUser();

  totalProducts = 0;
  totalOrders = 0;
  totalSellers = 0;
  cartItemCount = 0;
  recentProducts: ProductResponse[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Load product feed
    this.productService.getProductFeed().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.recentProducts = products.slice(0, 4);
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    // Load my orders
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.totalOrders = orders.length;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    // Load verified sellers
    this.businessService.getVerifiedBusinesses().subscribe({
      next: (businesses) => {
        this.totalSellers = businesses.length;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

    // Load cart count
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItemCount = cart?.items?.length ?? 0;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}