import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { BusinessService } from '../../../core/services/business.service';
import { BusinessResponse } from '../../../core/models/kyc.model';

@Component({
  selector: 'app-business-approvals',
  standalone: true,
  imports: [
    DashboardLayout,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './business-approvals.html',
  styleUrl: './business-approvals.css',
})
export class BusinessApprovals implements OnInit {
  private businessService = inject(BusinessService);

  businesses: BusinessResponse[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadPendingBusinesses();
  }

  loadPendingBusinesses(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.businessService.getPendingBusinesses().subscribe({
      next: (data) => {
        this.businesses = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load pending businesses.';
        this.isLoading = false;
      }
    });
  }

  approve(businessId: string): void {
    this.businessService.approveBusiness(businessId).subscribe({
      next: () => {
        this.successMessage = 'Business approved successfully.';
        this.loadPendingBusinesses();
      },
      error: () => {
        this.errorMessage = 'Failed to approve business.';
      }
    });
  }

  reject(businessId: string): void {
    this.businessService.rejectBusiness(businessId).subscribe({
      next: () => {
        this.successMessage = 'Business rejected.';
        this.loadPendingBusinesses();
      },
      error: () => {
        this.errorMessage = 'Failed to reject business.';
      }
    });
  }
}
