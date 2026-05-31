import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/enums/role.enum';
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
            `${environment.authApiUrl}${Endpoints.auth.login}`,
            credentials
        ).pipe(
            tap(response => {
                localStorage.setItem(this.tokenKey, response.data.token);
                localStorage.setItem(this.refreshTokenKey, response.data.refreshToken);
            })
        );
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            `${environment.authApiUrl}${Endpoints.auth.register}`,
            data
        );
    }

    verifyOtp(payload: { email: string; otp: string }): Observable<any> {
        return this.http.post(
            `${environment.authApiUrl}${Endpoints.auth.verifyOtp}`,
            payload
        );
    }

    resendOtp(payload: { email: string }): Observable<any> {
        return this.http.post(
            `${environment.authApiUrl}${Endpoints.auth.resendOtp}`,
            payload
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

    getProfile(): Observable<User> {
        return this.http.get<User>(
            `${environment.authApiUrl}${Endpoints.auth.me}`
        );
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    getUser(): User | null {
        if (!this.isLoggedIn()) return null;
        const token = this.getToken()!;
        const payload = atob(token.split('.')[1]);
        return JSON.parse(payload) as User;
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getUserRoles(): Role[] {
        return this.getUser()?.roles ?? [];
    }

    hasRole(role: Role): boolean {
        return this.getUserRoles().includes(role);
    }
}