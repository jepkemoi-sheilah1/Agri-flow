import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { Role } from './core/models/enums/role.enum';

export const routes: Routes = [

  // landing page — public
  {
    path: '',
    loadComponent: () => import('./public/landing/landing.component')
      .then(m => m.LandingComponent)
  },

  // public auth
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'verify-otp',
    loadComponent: () => import('./features/auth/verify-otp/verify-otp')
      .then(m => m.VerifyOtpComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/auth/unauthorized/unauthorized')
      .then(m => m.Unauthorized)
  },

  // buyer
  {
    path: 'buyer',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.FARMER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/buyer/dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  {
    path: 'buyer/feed',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.FARMER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/buyer/product-feed/product-feed')
      .then(m => m.ProductFeed)
  },
  {
    path: 'buyer/cart',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.FARMER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/buyer/cart/cart')
      .then(m => m.Cart)
  },
  {
    path: 'buyer/checkout',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.FARMER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/buyer/checkout/checkout')
      .then(m => m.Checkout)
  },
  {
    path: 'buyer/orders',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/orders/orders')
      .then(m => m.Orders)
  },
  {
    path: 'buyer/orders/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/order-detail/order-detail')
      .then(m => m.OrderDetail)
  },
  {
    path: 'buyer/payment',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/payment/payment')
      .then(m => m.Payment)
  },
  {
    path: 'buyer/order-confirmation',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/order-confirmation/order-confirmation')
      .then(m => m.OrderConfirmation)
  },
  {
    path: 'buyer/profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/profile/profile')
      .then(m => m.Profile)
  },

  // seller
  {
    path: 'seller',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/seller/dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  {
    path: 'seller/create-product',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/seller/create-product/create-product')
      .then(m => m.CreateProduct)
  },
  {
    path: 'seller/business-register',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/seller/business-register/business-register')
      .then(m => m.BusinessRegister)
  },
  {
    path: 'seller/my-products',
    canActivate: [authGuard],
    loadComponent: () => import('./features/seller/my-products/my-products')
      .then(m => m.MyProducts)
  },
  {
    path: 'seller/orders',
    canActivate: [authGuard],
    loadComponent: () => import('./features/seller/business-orders/business-orders')
      .then(m => m.BusinessOrders)
  },

  // admin
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/admin/dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  {
    path: 'admin/businesses',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/admin/business-approvals/business-approvals')
      .then(m => m.BusinessApprovals)
  },

  // super admin
  {
    path: 'super-admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/super-admin/dashboard/dashboard')
      .then(m => m.Dashboard)
  },

  // fallback
  {
    path: '**',
    redirectTo: ''
  }
];