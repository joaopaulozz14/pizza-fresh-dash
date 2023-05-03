import { OrderItemType } from "../OrderItemType";

export interface Order {
  userId: string;
  tableNumber: number;
  products: OrderItemType[];
}
