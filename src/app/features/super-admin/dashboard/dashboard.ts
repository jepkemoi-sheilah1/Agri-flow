import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardLayout } from '../../../shared/components/dashboard-layout/dashboard-layout';
import { AuthService } from '../../../core/auth/auth.service';
import { BusinessService } from '../../../core/services/business.service';
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
    DashboardLayout,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private businessService = inject(BusinessService);
  private cdr = inject(ChangeDetectorRef);

  user = this.authService.getUser();
  pendingBusinesses: BusinessResponse[] = [];
  verifiedBusinesses: BusinessResponse[] = [];
  isLoading = false;

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
  }
}