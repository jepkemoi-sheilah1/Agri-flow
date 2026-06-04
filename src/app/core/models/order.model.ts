export interface CheckoutRequest {
    deliveryAddress: string;
    deliveryNotes?: string;
}

export interface OrderItemResponse {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface ShipmentResponse {
    id: string;
    status: string;
    trackingNumber: string;
    carrier: string;
    estimatedDelivery: Date;
    deliveredAt?: Date;
}

export interface OrderResponse {
    id: string;
    userId: string;
    businessId: string;
    orderNumber: string;
    status: string;
    totalAmount: number;
    deliveryAddress: string;
    deliveryNotes?: string;
    items: OrderItemResponse[];
    shipment: ShipmentResponse;
    createdAt: Date;
    updatedAt: Date;
}