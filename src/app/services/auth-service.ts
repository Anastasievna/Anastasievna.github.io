import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { IUser, IUserDetails } from './../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserId: string | null = sessionStorage.getItem('user-id');
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .get<IUser[]>(`${this.url}/users`, {
        params: { email, password },
      })
      .pipe(
        map((users) => {
          console.log(users);
          if (!users.length) {
            throw new Error('Login failed!');
          }
          return users[0];
        }),
        tap((user) => {
          this.currentUserId = user.id;
          sessionStorage.setItem('user-id', user.id);
        }),
        catchError((err) => {
          console.log('Неверный email или пароль: ', err.message);
          return throwError(() => new Error('Login failed!'));
        }),
      );
  }

  register(email: string, password: string) {
    return this.http
      .get<IUser[]>(`${this.url}/users`, {
        params: { email },
      })
      .pipe(
        switchMap((users) => {
          if (users.length) {
            throw new Error('User with this email exists!');
          }
          return this.http
            .post<IUser>(`${this.url}/users`, {
              email,
              password,
            })
            .pipe(
              switchMap((user) => {
                const userDetails = {
                  userId: user.id,
                  name: '',
                  phone: '',
                  city: '',
                  address: '',
                };
                return this.http
                  .post<IUserDetails>(`${this.url}/users-details`, userDetails)
                  .pipe(map(() => user));
              }),
            );
        }),
        tap((user) => {
          this.currentUserId = user.id;
          sessionStorage.setItem('user-id', user.id);
        }),
        catchError((err) => {
          console.log('Пользователь не был создан: ', err.message);
          return throwError(() => new Error('Create user failed!'));
        }),
      );
  }

  logout() {
    this.currentUserId = null;
    sessionStorage.removeItem('user-id');
  }
}
