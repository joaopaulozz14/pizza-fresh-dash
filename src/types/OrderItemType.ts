import { ProductResponse } from "./api/product";

export interface OrderItemType {
  product: ProductResponse;
  quantity: number;
  description?: string;
}
