import { Injectable } from '@angular/core';
import { IProduct } from './../types';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000/peppers';
  products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url).pipe(
      catchError((err) => {
        console.log('Ошибка при загрузке данных: ', err.message);
        return of([]);
      }),
    );
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`).pipe(
      catchError((err) => {
        console.log('Ошибка при загрузке продукта: ', err.message);
        return of();
      }),
    );
  }

  setProducts(data: IProduct[]) {
    this.products = data;
  }
}
