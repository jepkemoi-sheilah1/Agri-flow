import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { WalletService } from '../../../core/services/wallet.service';
import { WalletResponse, WalletTransactionResponse, PayoutResponse } from '../../../core/models/payment.model';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    ReactiveFormsModule,
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  templateUrl: './wallet.html',
  styleUrl: './wallet.css',
})
export class Wallet implements OnInit {
  private walletService = inject(WalletService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  wallet: WalletResponse | null = null;
  transactions: WalletTransactionResponse[] = [];
  payouts: PayoutResponse[] = [];
  isLoading = false;
  isWithdrawing = false;
  errorMessage = '';

  withdrawForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^2547\d{8}$/)]],
  });

  ngOnInit(): void {
    this.loadWallet();
  }

  loadWallet(): void {
    this.isLoading = true;

    this.walletService.getMyWallet().subscribe({
      next: (wallet) => {
        this.wallet = wallet;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load wallet.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

    this.walletService.getMyTransactions().subscribe({
      next: (txns) => {
        this.transactions = txns;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.walletService.getMyPayouts().subscribe({
      next: (payouts) => {
        this.payouts = payouts;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  onWithdraw(): void {
    if (this.withdrawForm.invalid) {
      this.withdrawForm.markAllAsTouched();
      return;
    }
    this.isWithdrawing = true;
    this.walletService.withdraw(this.withdrawForm.value).subscribe({
      next: () => {
        this.isWithdrawing = false;
        this.withdrawForm.reset();
        this.snackBar.open('Withdrawal request submitted!', 'Close', { duration: 3000 });
        this.loadWallet();
      },
      error: (err) => {
        this.isWithdrawing = false;
        this.snackBar.open(err?.error?.message ?? 'Withdrawal failed.', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      }
    });
  }

  getTransactionClass(type: string): string {
    return type === 'CREDIT' ? 'credit' : 'debit';
  }
}