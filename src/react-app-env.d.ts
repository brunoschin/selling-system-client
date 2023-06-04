/// <reference types="react-scripts" />

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
}

type Cart = {
    product: Product;
    quantity: number;
}