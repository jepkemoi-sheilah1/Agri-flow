import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import { User } from '../models/user.model';

export interface UpdateProfileRequest {
  username: string;
  firstName: string;
  middleName?: string;
  surName: string;
  profilePicture?: string;
  phoneNumber: string;
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

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
      `${environment.authApiUrl}/api/users/${userId}/profile`, data
    );
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(
      `${environment.authApiUrl}/api/users/change-password`, data
    );
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(
      `${environment.authApiUrl}/api/users/upload-image`, formData
    );
  }
}