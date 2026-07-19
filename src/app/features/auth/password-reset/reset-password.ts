import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="auth-page">
      <h2>Create a new password</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full">
          <mat-label>Reset token</mat-label>
          <input matInput formControlName="resetToken" placeholder="Enter token" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full">
          <mat-label>New password</mat-label>
          <input matInput type="password" formControlName="newPassword" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full">
          <mat-label>Confirm password</mat-label>
          <input matInput type="password" formControlName="confirmPassword" />
        </mat-form-field>

        <div class="actions">
          <button mat-flat-button color="primary" type="submit" [disabled]="isLoading || form.invalid">
            <ng-container *ngIf="!isLoading">Reset password</ng-container>
            <mat-spinner *ngIf="isLoading" diameter="18"></mat-spinner>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`.auth-page { max-width: 480px; margin: 2rem auto; padding: 1rem; } .full { width: 100%; } .actions { margin-top: 1rem; }`]
})
export class ResetPassword {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    resetToken: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  isLoading = false;

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.form.patchValue({ resetToken: token });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    if (this.form.value.newPassword !== this.form.value.confirmPassword) return;

    const email = String(this.route.snapshot.queryParamMap.get('email') ?? '');
    const newPassword = String(this.form.get('newPassword')?.value ?? '');
    const confirmPassword = String(this.form.get('confirmPassword')?.value ?? '');
    const resetToken = String(this.form.get('resetToken')?.value ?? '');

    this.isLoading = true;
    this.auth.resetPassword({ email, newPassword, confirmPassword, resetToken }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], { queryParams: { reset: 'success' } });
      },
      error: () => { this.isLoading = false; }
    });
  }
}
