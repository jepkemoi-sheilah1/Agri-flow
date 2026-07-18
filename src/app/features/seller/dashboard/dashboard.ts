import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { AuthService } from '../../../core/auth/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { BusinessService } from '../../../core/services/business.service';
import { SellerOrderResponse } from '../../../core/models/order.model';
import { ProductResponse } from '../../../core/models/product.model';
import { BusinessResponse } from '../../../core/models/kyc.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    DashboardLayout,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private businessService = inject(BusinessService);
  private cdr = inject(ChangeDetectorRef);

  user = this.authService.getUser();
  business: BusinessResponse | null = null;
  recentOrders: SellerOrderResponse[] = [];
  myProducts: ProductResponse[] = [];
  totalOrders = 0;
  totalProducts = 0;
  isLoading = false;

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;

    this.businessService.getMyBusiness().subscribe({
      next: (biz) => {
        this.business = biz;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

    this.orderService.getSellerOrders().subscribe({
      next: (orders) => {
        this.totalOrders = orders.length;
        this.recentOrders = orders.slice(0, 5);
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.productService.getMyProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.myProducts = products.slice(0, 4);
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      PENDING:    'badge-pending',
      CONFIRMED:  'badge-confirmed',
      PROCESSING: 'badge-processing',
      SHIPPED:    'badge-shipped',
      DELIVERED:  'badge-delivered',
      CANCELLED:  'badge-cancelled',
    };
    return map[status?.toUpperCase()] ?? 'badge-default';
  }

  getApprovalClass(status: string): string {
    const map: Record<string, string> = {
      PENDING:  'approval-pending',
      APPROVED: 'approval-approved',
      REJECTED: 'approval-rejected',
    };
    return map[status?.toUpperCase()] ?? 'approval-pending';
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}