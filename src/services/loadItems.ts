import { Products } from "src/models/product.model";

export async function loadProducts() {
    const response = await fetch("data.json");
    const data: Products = await response.json();
    return data
}