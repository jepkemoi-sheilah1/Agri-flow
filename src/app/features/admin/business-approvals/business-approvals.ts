import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { ProductService } from '../../../core/services/product.service';
import { environment } from '../../../../environments/environment';
import { Endpoints } from '../../../core/config/endpoints';

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
  private productService = inject(ProductService);
  private http = inject(HttpClient);

  businesses: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadPendingBusinesses();
  }

  loadPendingBusinesses(): void {
    this.isLoading = true;
    this.productService.getPendingBusinesses().subscribe({
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
    this.http.patch(
      `${environment.authApiUrl}${Endpoints.business.approveBusinesses(businessId)}`,
      {}
    ).subscribe({
      next: () => {
        this.successMessage = 'Business approved successfully.';
        this.loadPendingBusinesses();
      },
      error: () => this.errorMessage = 'Failed to approve business.'
    });
  }

  reject(businessId: string): void {
    this.http.patch(
      `${environment.authApiUrl}${Endpoints.business.rejectBusiness(businessId)}`,
      {}
    ).subscribe({
      next: () => {
        this.successMessage = 'Business rejected.';
        this.loadPendingBusinesses();
      },
      error: () => this.errorMessage = 'Failed to reject business.'
    });
  }
}