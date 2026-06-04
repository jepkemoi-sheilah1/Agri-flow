export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    unit: string;
    categoryId: string;
    images?: string[];
}

export interface CreateProductRequest {
    productName: string;
    description: string;
    price: number;
    quantity: number;
    unit: string;
    categoryId: string;
}