import { Injectable } from '@angular/core';
import { IOrder, IShipping } from './../types';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url = 'http://localhost:3000/orders';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.url).pipe(
      catchError((err) => {
        console.log('Ошибка при загрузке заказов: ', err.message);
        return of([]);
      }),
    );
  }

  getOrdersByUserId(): Observable<IOrder[]> {
    const userId = this.authService.currentUserId;
    if (!userId) throw new Error('Login required');
    return this.http
      .get<IOrder[]>(`${this.url}`, {
        params: { userId },
      })
      .pipe(
        catchError((err) => {
          console.log('Ошибка при загрузке заказов: ', err.message);
          return of();
        }),
      );
  }

  postOrder(total: number, typePay: string, shipping: IShipping) {
    const userId = this.authService.currentUserId;
    if (!userId) throw new Error('Login required');
    const date = new Date();
    return this.http
      .post<IOrder>(`${this.url}`, {
        date: date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        orderNumber: this.generateOrderNumber(),
        status: 'Created',
        userId,
        typePay,
        shipping,
        total: +total.toFixed(2),
      })
      .pipe(
        catchError((err) => {
          console.log('Ошибка при создании заказа: ', err.message);
          return throwError(() => new Error('Create order failed!'));
        }),
      );
  }

  generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');

    return timestamp.slice(-9) + random;
  }
}
