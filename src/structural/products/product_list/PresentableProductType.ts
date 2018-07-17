import {Product} from 'GQLTypes';
import {OnlyForce} from "TypeUtil";

export function isPresentableProduct(product: Partial<Product> | null): product is PresentableProduct {
    return Boolean(product && product.id && product.name && product.usdCost);
}

export function retainPresentableProducts(products: (Partial<Product>|null)[]): PresentableProduct[] {
    return products.filter(isPresentableProduct);
}

export interface PresentableProduct extends  OnlyForce<Product, 'id' | 'name' | 'usdCost'>{}