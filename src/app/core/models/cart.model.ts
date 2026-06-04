export interface AddToCartRequest {
    productId: string;
    quantity: number;
}

export interface CartItemResponse {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    unit: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface CartResponse {
    id: string;
    userId: string;
    status: string;
    items: CartItemResponse[];
    totalAmount: number;
    createdAt: Date;
}