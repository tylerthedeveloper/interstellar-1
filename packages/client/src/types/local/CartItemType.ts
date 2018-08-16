import { Cart } from "GQLTypes";
import { IPresentableProduct, IPresentableProductTypeGuards } from "Types/local/PresentableProductType";
import {generateTypeGuards, OnlyForce } from "TypeUtil";

export interface ICartItem extends  OnlyForce<Cart, "quantity"> {
    product: IPresentableProduct;
}

export const ICartItemTypeGuards = generateTypeGuards<ICartItem>(["quantity"]);

// reuse presentable product type guards
const oldIs = ICartItemTypeGuards.is;
ICartItemTypeGuards.is = (obj): obj is ICartItem =>
    oldIs(obj) && IPresentableProductTypeGuards.is(obj.product);
