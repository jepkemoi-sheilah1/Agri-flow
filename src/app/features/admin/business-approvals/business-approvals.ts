import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { ProductService } from '../../../core/services/product.service';

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
    // PATCH /api/businesses/{id}/approve
    // wire when backend confirms endpoint
    console.log('Approve:', businessId);
    this.successMessage = 'Business approved successfully.';
  }

  reject(businessId: string): void {
    // PATCH /api/businesses/{id}/reject
    // wire when backend confirms endpoint
    console.log('Reject:', businessId);
  }
}