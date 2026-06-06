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

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get bottomNavItems() {
    return this.menuItems.slice(0, 5);
  }

  get menuItems() {
    const role = this.user?.roles?.[0] as string;

    if (role === Role.SELLER) {
      return [
        { label: 'Home',            icon: 'home',         route: '/seller' },
        { label: 'My Products',     icon: 'inventory_2',  route: '/seller/products' },
        { label: 'Create Product',  icon: 'add_box',      route: '/seller/create-product' },
        { label: 'Business Orders', icon: 'receipt_long', route: '/seller/orders' },
        { label: 'Profile',         icon: 'person',       route: '/seller/profile' },
      ];
    }

    if (role === Role.ADMIN) {
      return [
        { label: 'Dashboard',          icon: 'dashboard',       route: '/admin' },
        { label: 'Pending Businesses', icon: 'pending_actions', route: '/admin/businesses' },
        { label: 'Disputes',           icon: 'gavel',           route: '/admin/disputes' },
        { label: 'Users',              icon: 'people',          route: '/admin/users' },
      ];
    }

    if (role === Role.SUPER_ADMIN) {
      return [
        { label: 'Dashboard',        icon: 'dashboard',            route: '/super-admin' },
        { label: 'Businesses',       icon: 'business',             route: '/super-admin/businesses' },
        { label: 'Users',            icon: 'people',               route: '/super-admin/users' },
        { label: 'Disputes',         icon: 'gavel',                route: '/super-admin/disputes' },
        { label: 'Admin Management', icon: 'admin_panel_settings', route: '/super-admin/admins' },
        { label: 'Settings',         icon: 'settings',             route: '/super-admin/settings' },
      ];
    }

    return [
      { label: 'Home',           icon: 'home',         route: '/buyer' },
      { label: 'Browse Products',icon: 'storefront',   route: '/buyer/feed' },
      { label: 'My Orders',      icon: 'shopping_bag', route: '/buyer/orders' },
      { label: 'Start Selling',  icon: 'agriculture',  route: '/seller/register-business' },
      { label: 'Profile',        icon: 'person',       route: '/buyer/profile' },
    ];
  }
}