import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Forgot password?</h2>
          <p>Enter your account email and we’ll send a reset token to help you recover access.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Email address</mat-label>
            <input matInput formControlName="email" placeholder="you@farm.com" />
          </mat-form-field>

          <div class="actions">
            <button mat-flat-button color="primary" type="submit" [disabled]="isLoading || form.invalid">
              <ng-container *ngIf="!isLoading">Send reset token</ng-container>
              <mat-spinner *ngIf="isLoading" diameter="18"></mat-spinner>
            </button>
          </div>
        </form>

        <div class="help-text">
          <p>If you don’t see the email in your inbox, check your spam folder or try again.</p>
          <a routerLink="/login">Back to login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`.auth-page { min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; background: linear-gradient(180deg, #eaf2e6, #fafcf9); }
  .auth-card { width: 100%; max-width: 460px; background: #ffffff; border-radius: 28px; box-shadow: 0 36px 80px rgba(27, 67, 25, 0.14); padding: 2.6rem; border: 1px solid rgba(58, 122, 51, 0.16); }
  .auth-header h2 { margin: 0 0 0.55rem; font-size: 2.1rem; font-weight: 800; color: #123d0f; }
  .auth-header p { margin: 0 0 1.5rem; color: #2f5532; line-height: 1.75; font-size: 1rem; }
  .full { width: 100%; }
  .mat-form-field { width: 100%; }
  .mat-form-field .mat-form-field-flex { background: #ffffff; border-radius: 18px; }
  .mat-form-field .mat-form-field-outline { color: rgba(27, 90, 31, 0.9); border-width: 1.4px; }
  .mat-form-field.mat-focused .mat-form-field-outline { color: #153c11; border-width: 1.8px; }
  .mat-form-field.mat-focused .mat-form-field-label { color: #153c11 !important; }
  .mat-form-field-label { color: #1f4b17 !important; font-weight: 700; }
  input.mat-input-element { color: #0f2610; font-weight: 600; }
  .mat-form-field-appearance-outline .mat-form-field-outline-thick { border-color: rgba(27, 90, 31, 0.9); }
  .actions { margin-top: 1.5rem; display: flex; justify-content: center; }
  .actions button { width: 100%; height: 54px; font-weight: 700; letter-spacing: 0.04em; background-color: #183f11 !important; color: #ffffff !important; display: inline-flex; justify-content: center; align-items: center; text-transform: uppercase; font-size: 0.95rem; border-radius: 16px; box-shadow: 0 12px 24px rgba(28, 65, 24, 0.16); }
  .actions button:hover { background-color: #214714 !important; }
  .actions button:disabled { background-color: rgba(24, 63, 17, 0.52) !important; color: rgba(255,255,255,0.8) !important; }
  .help-text { margin-top: 1.5rem; font-size: 0.95rem; color: #2f5130; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; }
  .help-text p { margin: 0; max-width: 72%; }
  .help-text a { color: #183f11; text-decoration: none; font-weight: 700; }
  .help-text a:hover { text-decoration: underline; }
  .mat-error { color: #b71c1c; font-weight: 600; }
  .mat-form-field-invalid .mat-form-field-outline { color: #b71c1c !important; }
  .mat-form-field-invalid.mat-focused .mat-form-field-outline { color: #b71c1c !important; }
  .mat-form-field-invalid .mat-form-field-label { color: #b71c1c !important; }
`]
})
export class RequestReset {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isLoading = false;

  onSubmit(): void {
    if (this.form.invalid) return;
    const email = String(this.form.get('email')?.value ?? '');
    this.isLoading = true;
    this.auth.requestPasswordReset({ email }).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('A reset link has been sent to your email.', 'Close', { duration: 4000 });
        this.router.navigate(['/verify-otp'], { queryParams: { email } });
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Unable to send reset link. Please try again.', 'Close', { duration: 4000 });
      }
    });
  }
}
