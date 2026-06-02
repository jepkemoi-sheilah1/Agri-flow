// business-register.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/auth/auth.service';
import { Navbar } from '../../../shared/components/navbar/navbar';


@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterLink,
    Navbar
  ],
  templateUrl: './business-register.html',
  styleUrl: './business-register.css'
})
export class BusinessRegister {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private businessService = inject(AuthService);
  

  isLoading = false;
  errorMessage = '';

  form: FormGroup = this.fb.group({
    businessName:  ['', Validators.required],
    businessEmail: ['', [Validators.required, Validators.email]],
    businessPhone: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.businessService.registerBusiness(this.form.value) .subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/seller']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Registration failed. Please try again.';
      }
    });
  }

  // convenience getters for cleaner template access
  get businessName() { return this.form.get('businessName'); }
  get businessEmail() { return this.form.get('businessEmail'); }
  get businessPhone() { return this.form.get('businessPhone'); }
}