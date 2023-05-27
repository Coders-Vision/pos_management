import { Cart } from "@models/cart.model";

export interface Order {
  orderId: string;
  date?: string;
  cart: Cart;
  paid: number;
  change: number;
}

export interface Orders {
  orders: Order[];
}
