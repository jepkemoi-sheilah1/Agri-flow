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
