import { Product } from "./product.model"

export type Item = Product & { price: number, qty: number }
export interface Cart {
    items: Item[],
    itemCount: number,
    total: number
}