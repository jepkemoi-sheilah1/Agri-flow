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
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }

  get menuItems() {
    const role = this.user?.role as string;
    const businessId = this.user?.businessId;

   if (role === Role.FARMER && businessId) {
  return [
    { label: 'Home',        icon: 'home',         route: '/seller' },
    { label: 'My Products', icon: 'inventory_2',  route: '/seller/my-products' },
    { label: 'Add Product', icon: 'add_box',      route: '/seller/create-product' },
    { label: 'Orders',      icon: 'receipt_long', route: '/seller/orders' },
    { label: 'Wallet',      icon: 'account_balance_wallet', route: '/seller/wallet' },
    { label: 'Profile',     icon: 'person',       route: '/buyer/profile' },
  ];
}

    if (role === Role.ADMIN) {
      return [
        { label: 'Dashboard',          icon: 'dashboard',       route: '/admin' },
        { label: 'Pending Businesses', icon: 'pending_actions', route: '/admin/businesses' },
      ];
    }

    if (role === Role.SUPER_ADMIN) {
      return [
        { label: 'Dashboard',          icon: 'dashboard',       route: '/super-admin' },
        { label: 'Business Approvals', icon: 'pending_actions', route: '/super-admin/businesses' },
      ];
    }

    // FARMER without businessId → buyer menu
    return [
      { label: 'Home',            icon: 'home',          route: '/buyer' },
      { label: 'Browse Products', icon: 'storefront',    route: '/buyer/feed' },
      { label: 'Cart',            icon: 'shopping_cart', route: '/buyer/cart' },
      { label: 'My Orders',       icon: 'shopping_bag',  route: '/buyer/orders' },
      { label: 'Profile',         icon: 'person',        route: '/buyer/profile' },
      { label: 'Start Selling',   icon: 'agriculture',   route: '/seller/business-register' },
    ];
  }

  get bottomNavItems() {
    return this.menuItems.slice(0, 5);
  }
}