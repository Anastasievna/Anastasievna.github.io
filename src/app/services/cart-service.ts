import { Injectable } from '@angular/core';
import { ICartProduct, IProduct } from './../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<ICartProduct[]>([]);

  addToCart(product: IProduct) {
    const index = this.cart.getValue().findIndex((item) => item.id === product.id);

    if (index === -1) {
      const cartProduct: ICartProduct = {
        ...product,
        amount: 1,
        totalPrice: product.price,
      };

      this.cart.next([...this.cart.getValue(), cartProduct]);
    }
  }

  increaseProduct(id: number) {
    const index = this.cart.getValue().findIndex((item) => item.id === id);
    const arr = this.cart.getValue();
    arr[index].amount++;
    arr[index].totalPrice = arr[index].amount * arr[index].price;
    this.cart.next(arr);
  }

  decreaseProduct(id: number) {
    const index = this.cart.getValue().findIndex((item) => item.id === id);
    const amount = this.cart.getValue()[index].amount;

    if (amount === 1) {
      this.cart.next(this.cart.getValue().filter((item) => item.id !== id));
    } else {
      const arr = this.cart.getValue();
      arr[index].amount--;
      arr[index].totalPrice = arr[index].amount * arr[index].price;
      this.cart.next(arr);
    }
  }

  removeFromCart(product: IProduct | ICartProduct) {
    this.cart.next(this.cart.getValue().filter((item) => item.id !== product.id));
  }

  removeAllFromCart() {
    this.cart.next([]);
  }
}
