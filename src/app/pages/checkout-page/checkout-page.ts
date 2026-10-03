import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { AsyncPipe } from '@angular/common';
import { PayMethod } from '../../components/pay-method/pay-method';
import { UserInfo } from '../../components/user-info/user-info';
import { OrdersService } from '../../services/orders-service';
import { Confirm, Notify } from 'notiflix';
import { Router } from '@angular/router';
import { IShipping } from '../../types';

@Component({
  selector: 'app-checkout-page',
  imports: [UserInfo, PayMethod],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  total: number = 0;
  payMethod = '';
  shipping: IShipping | null = null;
  shippingValid = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartService.cart
      .pipe(map((cart) => cart.reduce((sum, current) => sum + current.totalPrice, 0)))
      .subscribe((total) => (this.total = total));
  }

  getPayMethod(value: string) {
    this.payMethod = value;
  }

  shippingChange(event: { valid: boolean; value: IShipping }) {
    this.shippingValid = event.valid;
    this.shipping = event.value;
  }

  createOrder() {
    if (this.total && this.shippingValid) {
      Confirm.show('Confirm', 'Are you sure?', 'Yes', 'No', () => {
        this.ordersService.postOrder(this.total, this.payMethod, this.shipping!).subscribe({
          next: () => {
            Notify.success('Order created!');
            window.setTimeout(() => {
              this.cartService.removeAllFromCart();
              this.router.navigate(['/account/orders']);
              window.scrollTo(0, 0);
            }, 1000);
          },
          error: (err) => Notify.failure(err.message),
        });
      });
    }
  }
}
