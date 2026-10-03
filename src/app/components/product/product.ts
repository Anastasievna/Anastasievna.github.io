import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../types';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  @Input() product: IProduct | null = null;

  constructor(private router: Router) {}

  goToProductPage() {
    this.router.navigate(['/product', this.product?.id]);
  }
}
