import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.getUser();
  isSidebarOpen = false;

  // sidebar items based on role
  get menuItems() {
   const role = this.user?.roles?.[0] as string; 

    if (role === Role.ADMIN) {
      return [
        { label: 'Dashboard',            icon: 'dashboard',        route: '/admin' },
        { label: 'Pending Businesses',   icon: 'pending_actions',  route: '/admin/businesses' },
        { label: 'Disputes',             icon: 'gavel',            route: '/admin/disputes' },
        { label: 'Users',                icon: 'people',           route: '/admin/users' },
      ];
    }

    if (role === Role.SUPER_ADMIN) {
      return [
        { label: 'Dashboard',            icon: 'dashboard',        route: '/super-admin' },
        { label: 'Businesses',           icon: 'business',         route: '/super-admin/businesses' },
        { label: 'Users',                icon: 'people',           route: '/super-admin/users' },
        { label: 'Disputes',             icon: 'gavel',            route: '/super-admin/disputes' },
        { label: 'Admin Management',     icon: 'admin_panel_settings', route: '/super-admin/admins' },
        { label: 'Settings',             icon: 'settings',         route: '/super-admin/settings' },
      ];
    }

    // default — buyer menu
    return [
      { label: 'Home',                   icon: 'home',             route: '/buyer' },
      { label: 'Browse Products',        icon: 'storefront',       route: '/buyer/feed' },
      { label: 'My Orders',              icon: 'shopping_bag',     route: '/buyer/orders' },
      { label: 'Start Selling',          icon: 'agriculture',      route: '/seller/register-business' },
      { label: 'Profile',                icon: 'person',           route: '/buyer/profile' },
    ];
  }

  // bottom nav items (mobile) 
  get bottomNavItems() {
    return this.menuItems.slice(0, 4);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}