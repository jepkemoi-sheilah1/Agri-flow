export interface CheckoutRequest {
  deliveryAddress: string;
  deliveryNotes?: string;
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  businessId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;
}

export interface FulfillmentResponse {
  id: string;
  orderId: string;
  businessId: string;
  businessName: string;
  status: string;
  notes: string;
  items: OrderItemResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  id: string;
  buyerId: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  deliveryNotes?: string;
  items: OrderItemResponse[];
  fulfillments: FulfillmentResponse[];
  createdAt: string;
  updatedAt: string;
}
export interface SellerOrderResponse {
  orderId: string;
  orderNumber: string;
  fulfillmentId: string;
  fulfillmentStatus: string;
  deliveryAddress: string;
  deliveryNotes?: string;
  sellerTotal: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItemResponse[];
}
export interface UpdateFulfillmentRequest {
  status: string;
  notes?: string;
}

export interface RestoreRequest {
  orderId: string;
}

export interface MonthlyRevenueDto {
  month: string;
  revenue: number;
}

export interface BusinessDashboardResponse {
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenueDto[];
}