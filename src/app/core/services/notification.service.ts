import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';

export interface NotificationResponse {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);

  getMyNotifications(): Observable<NotificationResponse[]> {
    return this.http.get<NotificationResponse[]>(
      `${environment.authApiUrl}${Endpoints.notification.myNotifications}`
    );
  }

  registerDeviceToken(fcmToken: string, deviceType: string): Observable<any> {
    return this.http.post(
      `${environment.authApiUrl}${Endpoints.notification.registerDevice}`,
      { fcmToken, deviceType }
    );
  }

  removeDeviceToken(fcmToken: string): Observable<any> {
    return this.http.delete(
      `${environment.authApiUrl}${Endpoints.notification.removeDevice}`,
      { params: { fcmToken } }
    );
  }
}