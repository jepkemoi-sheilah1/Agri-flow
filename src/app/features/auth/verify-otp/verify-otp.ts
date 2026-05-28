import { Component, OnInit, OnDestroy,inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  otpForm!: FormGroup;
  isLoading = false;
  isResending = false;
  errorMessage = '';
  successMessage = '';

  // Resend cooldown timer
  cooldown = 0;
  private cooldownInterval?: ReturnType<typeof setInterval>;

  // Email/phone passed from registration (via query param or navigation state)
  userEmail = '';

  
    private formBuilder = inject(FormBuilder);
    private authService =  inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute)
  


  ngOnInit(): void {
    // Grab email from query params: /verify?email=user@example.com
    this.userEmail = this.route.snapshot.queryParamMap.get('email') ?? '';

    this.otpForm = this.formBuilder.group({
      otp: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^\d{6}$/),   // digits only
        ],
      ],
    });
  }

  get f() {
    return this.otpForm.controls;
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      email: this.userEmail,
      otp: this.otpForm.value.otp,
    };

    this.authService.verifyOtp(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          queryParams: { verified: 'true' },   // optional success flag for login page
        });
      },
      error: (err: { error?: { message?: string }; message?: string }) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message ?? err?.message ?? 'Invalid OTP. Please try again.';
      },
    });
  }

  resendOtp(): void {
    if (this.cooldown > 0 || !this.userEmail) return;

    this.isResending = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.resendOtp({ email: this.userEmail }).subscribe({
      next: () => {
        this.isResending = false;
        this.successMessage = 'A new OTP has been sent.';
        this.startCooldown(60); // 60-second cooldown
      },
      error: (err: { error?: { message?: string }; message?: string }) => {
        this.isResending = false;
        this.errorMessage = err?.error?.message ?? 'Could not resend OTP.';
      },
    });
  }

  private startCooldown(seconds: number): void {
    this.cooldown = seconds;
    this.cooldownInterval = setInterval(() => {
      this.cooldown--;
      if (this.cooldown <= 0) {
        clearInterval(this.cooldownInterval);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.cooldownInterval);
  }
}