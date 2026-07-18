export interface StkPushRequest {
  orderId: string;
  phoneNumber: string;
  amount: number;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  userId: string;
  phoneNumber: string;
  amount: number;
  status: string;
  mpesaCheckoutRequestId: string;
  mpesaReceiptNumber: string;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletResponse {
  id: string;
  userId: string;
  balance: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransactionResponse {
  id: string;
  walletId: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
}

export interface PayoutResponse {
  id: string;
  walletId: string;
  amount: number;
  phoneNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawRequest {
  amount: number;
  phoneNumber: string;
}