import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
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

  //registerBusiness(data: { businessName: string; businessEmail: string; businessPhone: string }): Observable<any> {
   // return this.http.post(
      //`${environment.authApiUrl}${Endpoints.auth.businessRegister}`, data
   // );
 // }

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

  requestPasswordReset(payload: { email: string }): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.notification.sendOtp}`,
      payload
    );
  }

  resetPassword(payload: { email: string; newPassword: string; confirmPassword: string; resetToken: string }): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.auth.resetPassword}`,
      payload
    );
  }

 logout(): Observable<any> {
  const refreshToken = this.getRefreshToken();
  return this.http.post(
    `${environment.authApiUrl}${Endpoints.auth.logout}`,
    { refreshToken }
  ).pipe(
    tap(() => {
      this.clearTokens();
      this.snackBar.open('Signed out successfully', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    }),
    // Ensure tokens are cleared and the user is routed even if logout fails
    catchError((err: any) => {
      this.clearTokens();
      const msg = err?.error?.message ?? 'Logout failed — you were signed out locally';
      this.snackBar.open(msg, 'Close', { duration: 4000 });
      this.router.navigate(['/login']);
      return throwError(() => err);
    })
  );
}

  getProfile(): Observable<any> {
    return this.http.get<any>(
      `${environment.authApiUrl}${Endpoints.auth.me}`
    );
  }

  clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(
      `${environment.authApiUrl}${Endpoints.auth.refresh}`,
      { refreshToken }
    ).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.accessToken);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
      })
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
    const payload = token.split('.')[1];
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4), '=');
    const decodedPayload = atob(paddedPayload);
    return JSON.parse(decodedPayload);
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

    const rawRole = user.role ?? user.roles ?? user.authorities ?? [];
    const roles = Array.isArray(rawRole) ? rawRole : [rawRole];

    return roles
      .filter(Boolean)
      .map((role: string) => role.toString().toUpperCase())
      .filter((role: string, index: number, self: string[]) => self.indexOf(role) === index);
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role.toUpperCase());
  }
}