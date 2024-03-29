import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseBackendUrl: string = environment.baseBackendUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const url: string = `${this.baseBackendUrl}/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('meanToken', resp.token!);
        }
      }),
      map((validResponse) => validResponse.ok),
      catchError((err) => of(false))
    );
  }

  validateToken(): Observable<boolean> {
    const url: string = `${this.baseBackendUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('meanToken') || ''
    );
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('meanToken', resp.token!);
        this._user = {
          uid: resp.uid!,
          name: resp.name!,
          email: resp.email!,
        };
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout(): void {
    // localStorage.removeItem('meanToken');
    localStorage.clear();
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<boolean | string> {
    const url: string = `${this.baseBackendUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('meanToken', resp.token!);
        }
      }),
      map((validResponse) => validResponse.ok),
      catchError((err) => of(err.error.msg))
    );
  }
}
