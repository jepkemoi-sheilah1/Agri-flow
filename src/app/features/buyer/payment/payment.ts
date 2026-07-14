import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { PaymentService } from '../../../core/services/payment.service';
import { OrderService } from '../../../core/services/order.service';
import { PaymentResponse } from '../../../core/models/payment.model';
import { OrderResponse } from '../../../core/models/order.model';

type PaymentStage = 'form' | 'pending' | 'success' | 'failed';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    ReactiveFormsModule,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private paymentService = inject(PaymentService);
  private orderService = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);

  orderId: string = '';
  totalAmount: number = 0;
  orderNumber: string = '';

  stage: PaymentStage = 'form';
  isSubmitting = false;
  isLoadingOrder = false;
  errorMessage = '';
  order: OrderResponse | null = null;
  latestPayment: PaymentResponse | null = null;

  private pollSubscription: Subscription | null = null;
  private readonly POLL_INTERVAL_MS = 5000;
  private readonly MAX_POLL_ATTEMPTS = 24;
  private pollAttempts = 0;

  paymentForm: FormGroup = this.fb.group({
    phoneNumber: ['', [Validators.required, Validators.pattern(/^2547\d{8}$/)]]
  });

  ngOnInit(): void {
    const state = history.state;
    this.orderId = state?.orderId ?? '';
    this.totalAmount = state?.totalAmount ?? 0;
    this.orderNumber = state?.orderNumber ?? '';

    if (!this.orderId) {
      this.router.navigate(['/buyer/cart']);
      return;
    }

    this.loadOrder();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  loadOrder(): void {
    this.isLoadingOrder = true;
    this.orderService.getOrder(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.totalAmount = order.totalAmount;
        this.isLoadingOrder = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoadingOrder = false;
        this.errorMessage = 'Could not load order details. Please go back and try again.';
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = {
      orderId: this.orderId,
      phoneNumber: this.paymentForm.value.phoneNumber,
      amount: this.totalAmount,
    };

    this.paymentService.initiateStkPush(payload).subscribe({
      next: (payment) => {
        this.latestPayment = payment;
        this.isSubmitting = false;
        this.stage = 'pending';
        this.cdr.detectChanges();
        this.startPolling();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message ?? 'Failed to initiate payment. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  startPolling(): void {
    this.pollAttempts = 0;

    this.pollSubscription = interval(this.POLL_INTERVAL_MS).pipe(
      switchMap(() => this.paymentService.getPaymentsByOrder(this.orderId)),
      takeWhile(() => this.pollAttempts < this.MAX_POLL_ATTEMPTS && this.stage === 'pending', true)
    ).subscribe({
      next: (payments) => {
        this.pollAttempts++;
        if (!payments || payments.length === 0) return;

        const latest = payments[payments.length - 1];
        this.latestPayment = latest;

        if (latest.status === 'COMPLETED') {
          this.stopPolling();
          this.stage = 'success';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/buyer/order-confirmation'], {
              state: { orderId: this.orderId, orderNumber: this.orderNumber, payment: latest }
            });
          }, 1500);
        } else if (latest.status === 'FAILED' || latest.status === 'CANCELLED') {
          this.stopPolling();
          this.stage = 'failed';
          this.errorMessage = latest.failureReason ?? 'Payment was not completed. Please try again.';
          this.cdr.detectChanges();
        } else if (this.pollAttempts >= this.MAX_POLL_ATTEMPTS) {
          this.stopPolling();
          this.stage = 'failed';
          this.errorMessage = 'Payment timed out. Please check your M-Pesa and try again.';
          this.cdr.detectChanges();
        }
      },
      error: () => {
        this.stopPolling();
        this.stage = 'failed';
        this.errorMessage = 'Could not verify payment status. Please contact support.';
        this.cdr.detectChanges();
      }
    });
  }

  stopPolling(): void {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
      this.pollSubscription = null;
    }
  }

  onRetry(): void {
    this.stage = 'form';
    this.errorMessage = '';
    this.latestPayment = null;
    this.pollAttempts = 0;
  }

  get isPending(): boolean { return this.stage === 'pending'; }
  get isSuccess(): boolean { return this.stage === 'success'; }
  get isFailed(): boolean  { return this.stage === 'failed'; }
  get isForm(): boolean    { return this.stage === 'form'; }
}