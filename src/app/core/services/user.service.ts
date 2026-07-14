import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import { User, UpdateProfileRequest, ChangePasswordRequest } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getMyProfile(): Observable<User> {
    return this.http.get<User>(
      `${environment.authApiUrl}${Endpoints.auth.me}`
    );
  }

  updateProfile(userId: string, data: UpdateProfileRequest): Observable<User> {
    return this.http.put<User>(
      `${environment.authApiUrl}${Endpoints.user.updateProfile(userId)}`, data
    );
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(
      `${environment.authApiUrl}${Endpoints.user.changePassword}`, data
    );
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(
      `${environment.authApiUrl}${Endpoints.user.uploadImage}`, formData
    );
  }
}