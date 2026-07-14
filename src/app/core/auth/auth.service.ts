import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenKey = 'agri-flow-token';
  private refreshTokenKey = 'agri-flow-refresh-token';

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.authApiUrl}${Endpoints.auth.login}`, credentials
    ).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.accessToken);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.authApiUrl}${Endpoints.auth.register}`, data
    );
  }

  registerBusiness(data: { businessName: string; businessEmail: string; businessPhone: string }): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.auth.businessRegister}`, data
    );
  }

  verifyOtp(payload: { email: string; otp: string }): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.notification.verifyOtp}`, payload
    );
  }

  resendOtp(payload: { email: string }): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.notification.sendOtp}`, payload
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.auth.logout}`,
      { refreshToken: this.getRefreshToken() }
    ).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        this.router.navigate(['/login']);
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(
      `${environment.authApiUrl}${Endpoints.auth.me}`
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getDecodedToken(): any {
    if (!this.isLoggedIn()) return null;
    const token = this.getToken()!;
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }

  getUser(): any {
    return this.getDecodedToken();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRoles(): string[] {
    const user = this.getUser();
    if (!user) return [];
    return user.role ? [user.role] : [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}