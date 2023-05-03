export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductUpdate {
  product: Product;
  id: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  updatedAt?: string;
  createdAt?: string;
}
