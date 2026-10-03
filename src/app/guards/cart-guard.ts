import { CanActivateFn } from '@angular/router';
import { CartService } from './../services/cart-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const cartGuard: CanActivateFn = (route, state) => {
  const cart = inject(CartService);
  const router = inject(Router);
  return cart.cart.getValue().length > 0 ? true : router.createUrlTree(['/home']);
};
