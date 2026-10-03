import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { IProduct } from '../../types';
import { CartProduct } from '../../components/cart-product/cart-product';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CartProduct, AsyncPipe, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cartTotal$: Observable<number> | null = null;

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartTotal$ = this.cartService.cart.pipe(
      map((cart) => cart.reduce((sum, current) => sum + current.totalPrice, 0)),
      tap((value) => {
        if (!value) this.router.navigate(['/']);
      }),
    );
  }

  increaseProduct(id: number) {
    this.cartService.increaseProduct(id);
  }

  decreaseProduct(id: number) {
    this.cartService.decreaseProduct(id);
  }

  removeProduct(product: IProduct) {
    this.cartService.removeFromCart(product);
  }
}
