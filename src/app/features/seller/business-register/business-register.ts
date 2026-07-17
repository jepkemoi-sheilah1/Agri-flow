import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { BusinessService } from '../../../core/services/business.service';

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
    DashboardLayout,
  ],
  templateUrl: './business-register.html',
  styleUrl: './business-register.css'
})
export class BusinessRegister {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private businessService = inject(BusinessService);
  private cdr = inject(ChangeDetectorRef);

  isLoading = false;
  isSuccess = false;
  errorMessage = '';

  form: FormGroup = this.fb.group({
    businessName:    ['', Validators.required],
    businessEmail:   ['', [Validators.required, Validators.email]],
    businessPhone:   ['', Validators.required],
    county:          ['', Validators.required],
    businessProfile: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.businessService.registerBusiness(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Registration failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/buyer']);
  }

  get businessName() { return this.form.get('businessName'); }
  get businessEmail() { return this.form.get('businessEmail'); }
  get businessPhone() { return this.form.get('businessPhone'); }
  get county() { return this.form.get('county'); }
}