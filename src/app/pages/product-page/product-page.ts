import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICartProduct, IProduct } from '../../types';
import { ProductsService } from '../../services/products-service';
import { CartService } from '../../services/cart-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, KeyValuePipe, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-product-page',
  imports: [AsyncPipe, KeyValuePipe, CommonModule, RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  product$: Observable<IProduct> | null = null;
  productInCart$: Observable<number | null> | null = null;
  protected readonly Array = Array;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private cartService: CartService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    this.product$ = this.productsService.getProductById(id ?? '');
    this.productInCart$ = this.cartService.cart.pipe(
      map((cart) => cart.find((cart) => cart.id.toString() == (id ?? ''))?.amount || null),
    );
  }

  addProduct(product: IProduct) {
    this.cartService.addToCart(product);
  }

  increaseProduct(product: IProduct) {
    this.cartService.increaseProduct(product.id);
  }

  decreaseProduct(product: IProduct) {
    this.cartService.decreaseProduct(product.id);
  }
}
