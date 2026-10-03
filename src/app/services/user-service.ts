import { Injectable } from '@angular/core';
import { IUser, IUserDetails, IUserFullDetails } from './../types';
import { HttpClient } from '@angular/common/http';
import { catchError, combineLatestWith, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000';
  private currentUserDetailsId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getInfo(): Observable<IUserFullDetails> {
    const id = this.authService.currentUserId;
    if (!id) throw new Error('Login required');
    return this.http.get<IUser>(`${this.url}/users/${id}`).pipe(
      combineLatestWith(
        this.http.get<IUserDetails[]>(`${this.url}/users-details`, {
          params: { userId: id },
        }),
      ),
      map(([user, userInfo]) => ({
        email: user.email,
        ...userInfo[0],
      })),
      tap((user: IUserFullDetails) => {
        this.currentUserDetailsId = user.id;
      }),
    );
  }

  updateInfo(data: { name: string; phone: string; city: string; address: string }) {
    const id = this.authService.currentUserId;
    if (!id) throw new Error('Login required');
    return this.http
      .patch<IUserDetails>(`${this.url}/users-details/${this.currentUserDetailsId}`, data)
      .pipe(
        catchError((err) => {
          console.log('Информация о пользователе не была обновлена: ', err.message);
          return throwError(() => new Error('Update user info failed!'));
        }),
      );
  }
}
