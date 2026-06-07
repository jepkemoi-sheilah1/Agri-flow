import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { CartService } from '../../../core/services/cart.service';
import { CartResponse } from '../../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);

  cart: CartResponse | null = null;
  isLoading = false;
  errorMessage = '';
  isCheckingOut = false;

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

  removeItem(itemId: string): void {
    this.cartService.removeItem(itemId).subscribe({
      next: () => this.loadCart(),
      error: () => this.errorMessage = 'Failed to remove item.'
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cart = null;
        this.loadCart();
      },
      error: () => this.errorMessage = 'Failed to clear cart.'
    });
  }

  get totalItems(): number {
    return this.cart?.items?.length ?? 0;
  }

  get totalAmount(): number {
    return this.cart?.totalAmount ?? 0;
  }
}