import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { OrderService } from '../../../core/services/order.service';
import { SellerOrderResponse } from '../../../core/models/order.model';

@Component({
  selector: 'app-business-orders',
  standalone: true,
  imports: [
    DatePipe,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './business-orders.html',
  styleUrl: './business-orders.css',
})
export class BusinessOrders implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  orders: SellerOrderResponse[] = [];
  isLoading = false;
  errorMessage = '';
  updatingOrderId: string | null = null;

  readonly fulfillmentStatuses = [
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.orderService.getSellerOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateStatus(orderId: string, status: string): void {
    this.updatingOrderId = orderId;
    this.orderService.updateFulfillmentStatus(orderId, { status }).subscribe({
      next: () => {
        this.updatingOrderId = null;
        this.loadOrders();
      },
      error: () => {
        this.updatingOrderId = null;
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
    };
    return map[status?.toUpperCase()] ?? 'badge-default';
  }
}