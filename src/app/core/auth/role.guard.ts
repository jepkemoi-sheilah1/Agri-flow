import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Role } from '../models/enums/role.enum';  

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get allowed roles from route data
  const allowedRoles = route.data['roles'] as Role[];

  // Check if user has any allowed role
  const hasAccess = allowedRoles.some(role =>
    authService.hasRole(role)
  );

  if (hasAccess) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};