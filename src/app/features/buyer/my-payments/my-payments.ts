import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { PaymentService } from '../../../core/services/payment.service';
import { PaymentResponse } from '../../../core/models/payment.model';

@Component({
  selector: 'app-my-payments',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLink,
    DashboardLayout,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './my-payments.html',
  styleUrl: './my-payments.css',
})
export class MyPayments implements OnInit {
  private paymentService = inject(PaymentService);
  private cdr = inject(ChangeDetectorRef);

  payments: PaymentResponse[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.paymentService.getMyPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load payments.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      COMPLETED: 'badge-completed',
      PENDING:   'badge-pending',
      FAILED:    'badge-failed',
      CANCELLED: 'badge-cancelled',
    };
    return map[status?.toUpperCase()] ?? 'badge-default';
  }
}