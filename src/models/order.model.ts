import { Cart } from "./cart.model";

export interface NewOrder {
    orderId: string,
    date?: Date
    cart: Cart
    paid: number
    change: number
}