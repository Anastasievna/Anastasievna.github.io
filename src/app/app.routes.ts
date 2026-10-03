import { Routes } from '@angular/router';
import { ProductPage } from './pages/product-page/product-page';
import { HomePage } from './pages/home-page/home-page';
import { authGuard } from './guards/auth-guard';
import { LoginPage } from './pages/login-page/login-page';
import { CartPage } from './pages/cart-page/cart-page';
import { AccountPage } from './pages/account-page/account-page';
import { cartGuard } from './guards/cart-guard';
import { CheckoutPage } from './pages/checkout-page/checkout-page';
import { UserInfo } from './components/user-info/user-info';
import { OrderList } from './components/order-list/order-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'cart', component: CartPage, canActivate: [cartGuard] },
  {
    path: 'checkout',
    component: CheckoutPage,
    canActivate: [authGuard, cartGuard],
    data: { title: 'Shipping Information' },
  },
  { path: 'login', component: LoginPage, data: { formType: 'login' } },
  { path: 'register', component: LoginPage, data: { formType: 'register' } },
  {
    path: 'account',
    component: AccountPage,
    canActivate: [authGuard],
    children: [
      { path: 'orders', component: OrderList },
      { path: 'info', component: UserInfo, data: { title: 'Personal Info', edit: true } },
    ],
  },
  { path: 'product/:id', component: ProductPage },
  { path: '**', redirectTo: 'home' },
];
