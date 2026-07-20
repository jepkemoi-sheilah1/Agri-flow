import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { AuthService } from '../../../core/auth/auth.service';
import { BusinessService } from '../../../core/services/business.service';
import { StaffService, AssignmentResponse, RoleResponse } from '../../../core/services/staff.service';
import { BusinessResponse } from '../../../core/models/kyc.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTabsModule,
    MatChipsModule,
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

  // Business data
  pendingBusinesses: BusinessResponse[] = [];
  verifiedBusinesses: BusinessResponse[] = [];

  // Staff data
  unassignedApprovals: AssignmentResponse[] = [];
  roles: RoleResponse[] = [];

  // UI state
  isLoading = false;
  approvingId: string | null = null;
  rejectingId: string | null = null;
  assigningId: string | null = null;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
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

    this.staffService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
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
        this.loadDashboard();
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
        this.loadDashboard();
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