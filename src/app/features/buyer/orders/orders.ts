import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { OrderService } from '../../../core/services/order.service';
import { OrderResponse } from '../../../core/models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    DashboardLayout,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  orders: OrderResponse[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load orders. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
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
      REFUNDED:   'badge-refunded',
    };
    return map[status?.toUpperCase()] ?? 'badge-default';
  }

  goToDetail(id: string): void {
    this.router.navigate(['/buyer/orders', id]);
  }

  goToFeed(): void {
    this.router.navigate(['/buyer/feed']);
  }
}