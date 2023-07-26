import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseBackendUrl: string = environment.baseBackendUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const url: string = `${this.baseBackendUrl}/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body);
  }
}
