import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  WalletResponse,
  WalletTransactionResponse,
  PayoutResponse
} from '../models/payment.model';

export interface WithdrawalRequest {
  amount: number;
  phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class WalletService {
  private http = inject(HttpClient);

  getMyWallet(): Observable<WalletResponse> {
    return this.http.get<WalletResponse>(
      `${environment.paymentApiUrl}/api/wallet`
    );
  }

  withdraw(data: WithdrawalRequest): Observable<any> {
    return this.http.post<any>(
      `${environment.paymentApiUrl}/api/wallet/withdraw`, data
    );
  }

  getMyTransactions(): Observable<WalletTransactionResponse[]> {
    return this.http.get<WalletTransactionResponse[]>(
      `${environment.paymentApiUrl}/api/wallet/transactions`
    );
  }

  getMyPayouts(): Observable<PayoutResponse[]> {
    return this.http.get<PayoutResponse[]>(
      `${environment.paymentApiUrl}/api/wallet/payouts`
    );
  }
}