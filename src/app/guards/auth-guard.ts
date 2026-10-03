import { CanActivateFn } from '@angular/router';
import { AuthService } from './../services/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.currentUserId ? true : router.createUrlTree(['/login']);
};
