import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
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
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);

  order: SellerOrderResponse | null = null;
  isLoading = false;
  errorMessage = '';
  isUpdating = false;

  readonly fulfillmentStatuses = [
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(id);
    } else {
      this.router.navigate(['/seller/orders']);
    }
  }

  loadOrder(id: string): void {
    this.isLoading = true;
    this.orderService.getSellerOrderDetail(id).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load order details.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateStatus(status: string): void {
    if (!this.order) return;
    this.isUpdating = true;
    this.orderService.updateFulfillmentStatus(this.order.fulfillmentId, { status }).subscribe({
      next: (updated) => {
        this.order = updated;
        this.isUpdating = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isUpdating = false;
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

  goBack(): void {
    this.router.navigate(['/seller/orders']);
  }
}