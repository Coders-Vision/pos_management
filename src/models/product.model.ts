export interface Product {
    id: number,
    name: string,
    readonly itemPrice: number,
    image: string,
    options?: any
}

export interface Products {
    products: Product[],
}