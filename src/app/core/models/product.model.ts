export interface Category {
  id: string;
  name: string;
}

export interface ProductRatingSummary {
  productId: string;
  averageRating: number | null;
  totalRatings: number | null;
}

export interface ProductResponse {
  id: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  categoryId: string;
  categoryName: string;
  businessId: string;
  businessName: string;
  stockStatus: string;
  images: string[];
  productRatingSummary: ProductRatingSummary;
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