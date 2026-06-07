import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { Role } from './core/models/enums/role.enum';

export const routes: Routes = [

  // public routes
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

  // buyer routes
  {
    path: 'buyer',
   // canActivate: [authGuard, roleGuard],
    data: { roles: [Role.BUYER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/buyer/dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  {
    path: 'buyer/feed',
    //canActivate: [authGuard, roleGuard],
    data: { roles: [Role.BUYER, Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/buyer/product-feed/product-feed')
      .then(m => m.ProductFeed)
  },
// seller routes 
  {
  path: 'seller',
  canActivate: [authGuard, roleGuard],
  data: { roles: [Role.SELLER, Role.ADMIN, Role.SUPER_ADMIN] },
  loadComponent: () => import('./features/seller/dashboard/dashboard')
    .then(m => m.Dashboard)
},

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

  // admin routes
  {
    path: 'admin',
    //canActivate: [authGuard, roleGuard],
    data: { roles: [Role.ADMIN, Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/admin/dashboard/dashboard')
      .then(m => m.Dashboard)
  },

  // super admin routes
  {
    path: 'super-admin',
    //canActivate: [authGuard, roleGuard],
    data: { roles: [Role.SUPER_ADMIN] },
    loadComponent: () => import('./features/super-admin/dashboard/dashboard')
      .then(m => m.Dashboard)
  },

  // unauthorized
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/auth/unauthorized/unauthorized')
      .then(m => m.Unauthorized)
  },
  {
    path: 'create-product',
    loadComponent: () => import('./features/seller/create-product/create-product')
      .then(m => m.CreateProduct)
  },
  {
  path: 'admin/businesses',
  //canActivate: [authGuard, roleGuard],
  data: { roles: [Role.ADMIN, Role.SUPER_ADMIN] },
  loadComponent: () => import('./features/admin/business-approvals/business-approvals')
    .then(m => m.BusinessApprovals)
},

  // fallback
  {
    path: '**',
    redirectTo: 'login'
  }
];