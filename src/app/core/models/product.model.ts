export interface Category {
  id: string;
  name: string;
}

export interface ProductResponse {
  id: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  categoryId: string;
  businessId: string;
  status: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  productName: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  categoryId: string;
}

export interface UpdateProductRequest {
  productName?: string;
  description?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  categoryId?: string;
}

export interface ProductRatingSummary {
  productId: string;
  averageRating: number;
  totalRatings: number;
}