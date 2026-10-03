import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart-service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  links = [
    {
      title: 'Products',
      url: '/home',
    },
    {
      title: 'Pain Guides',
      url: '#',
    },
    {
      title: 'Community',
      url: '#',
    },
    {
      title: 'Resources',
      url: '#',
    },
    {
      title: 'Contact',
      url: '#',
    },
  ];
  cartTotalAmount$: Observable<number> | null = null;
  constructor(
    public authService: AuthService,
    public cartService: CartService,
  ) {}

  ngOnInit() {
    this.cartTotalAmount$ = this.cartService.cart.pipe(
      map((cart) => cart.reduce((sum, current) => sum + current.amount, 0)),
    );
  }
}
