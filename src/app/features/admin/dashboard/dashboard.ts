import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { AuthService } from '../../../core/auth/auth.service';
import { BusinessService } from '../../../core/services/business.service';
import { StaffService, AssignmentResponse } from '../../../core/services/staff.service';
import { BusinessResponse } from '../../../core/models/kyc.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTabsModule,
    RouterLink,
    DashboardLayout,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private businessService = inject(BusinessService);
  private staffService = inject(StaffService);
  private cdr = inject(ChangeDetectorRef);

  user = this.authService.getUser();

  pendingBusinesses: BusinessResponse[] = [];
  verifiedBusinesses: BusinessResponse[] = [];
  unassignedApprovals: AssignmentResponse[] = [];

  isLoading = false;
  approvingId: string | null = null;
  rejectingId: string | null = null;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;

    this.businessService.getPendingBusinesses().subscribe({
      next: (data) => {
        this.pendingBusinesses = data;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.businessService.getVerifiedBusinesses().subscribe({
      next: (data) => {
        this.verifiedBusinesses = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

    this.staffService.getUnassignedApprovals().subscribe({
      next: (data) => {
        this.unassignedApprovals = data;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  approveBusiness(id: string): void {
    this.approvingId = id;
    this.businessService.approveBusiness(id).subscribe({
      next: () => {
        this.approvingId = null;
        this.successMessage = 'Business approved successfully';
        this.loadStats();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.approvingId = null;
        this.errorMessage = 'Failed to approve business';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  rejectBusiness(id: string): void {
    this.rejectingId = id;
    this.businessService.rejectBusiness(id).subscribe({
      next: () => {
        this.rejectingId = null;
        this.successMessage = 'Business rejected';
        this.loadStats();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.rejectingId = null;
        this.errorMessage = 'Failed to reject business';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  get totalBusinesses(): number {
    return this.pendingBusinesses.length + this.verifiedBusinesses.length;
  }
}