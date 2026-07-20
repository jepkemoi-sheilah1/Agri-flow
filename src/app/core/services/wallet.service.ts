import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Endpoints } from '../config/endpoints';
import {
  WalletResponse,
  WalletTransactionResponse,
  PayoutResponse,
  WithdrawRequest
} from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private http = inject(HttpClient);

  getMyWallet(): Observable<WalletResponse> {
    return this.http.get<WalletResponse>(
      `${environment.paymentApiUrl}${Endpoints.wallet.get}`
    );
  }

  withdraw(data: WithdrawRequest): Observable<any> {
    return this.http.post<any>(
      `${environment.paymentApiUrl}${Endpoints.wallet.withdraw}`, data
    );
  }

  getMyTransactions(): Observable<WalletTransactionResponse[]> {
    return this.http.get<WalletTransactionResponse[]>(
      `${environment.paymentApiUrl}${Endpoints.wallet.transactions}`
    );
  }

  getMyPayouts(): Observable<PayoutResponse[]> {
    return this.http.get<PayoutResponse[]>(
      `${environment.paymentApiUrl}${Endpoints.wallet.payouts}`
    );
  }
}