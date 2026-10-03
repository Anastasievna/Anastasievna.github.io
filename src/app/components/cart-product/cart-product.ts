import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartProduct } from '../../types';

@Component({
  selector: 'app-cart-product',
  imports: [],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.css',
})
export class CartProduct {
  @Input() cartProduct: ICartProduct | null = null;
  @Output() remove = new EventEmitter<ICartProduct | null>();
  @Output() increase = new EventEmitter<number | null>();
  @Output() decrease = new EventEmitter<number | null>();

  increaseProduct() {
    this.increase.emit(this.cartProduct?.id);
  }

  decreaseProduct() {
    this.decrease.emit(this.cartProduct?.id);
  }

  removeProduct() {
    this.remove.emit(this.cartProduct);
  }
}
