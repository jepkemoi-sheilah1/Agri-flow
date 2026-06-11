import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { OrderService } from '../../../core/services/order.service';
import { PaymentResponse } from '../../../core/models/payment.model';
import { OrderResponse } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
})
export class OrderConfirmation implements OnInit {
  private router = inject(Router);
  private orderService = inject(OrderService);

  orderId: string = '';
  orderNumber: string = '';
  payment: PaymentResponse | null = null;

  isLoading = false;
  errorMessage = '';
  order: OrderResponse | null = null;

  ngOnInit(): void {
    const state = history.state;
    this.orderId = state?.orderId ?? '';
    this.orderNumber = state?.orderNumber ?? '';
    this.payment = state?.payment ?? null;

    if (!this.orderId) {
      this.router.navigate(['/buyer']);
      return;
    }

    this.loadOrder();
  }

  loadOrder(): void {
    this.isLoading = true;
    this.orderService.getOrder(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Could not load order details.';
      }
    });
  }

  get totalItems(): number {
    return this.order?.items?.length ?? 0;
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

  
}
