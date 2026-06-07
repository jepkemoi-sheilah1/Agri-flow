import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { CartResponse } from '../../../core/models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
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
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cart: CartResponse | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  checkoutForm: FormGroup = this.fb.group({
    deliveryAddress: ['', [Validators.required, Validators.minLength(5)]],
    deliveryNotes: ['']
  });

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load cart.';
        this.isLoading = false;
      }
    });
  }

  get totalAmount(): number {
    return this.cart?.totalAmount ?? 0;
  }

  get totalItems(): number {
    return this.cart?.items?.length ?? 0;
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.orderService.checkout(this.checkoutForm.value).subscribe({
      next: (order) => {
        this.isSubmitting = false;
        this.router.navigate(['/buyer/orders']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message ?? 'Checkout failed. Please try again.';
      }
    });
  }
}