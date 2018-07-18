import {Product} from "GQLTypes";
import {generateTypeGuards, OnlyForce} from "TypeUtil";

export interface IPresentableProduct extends  OnlyForce<Product, "id" | "name" | "usdCost"> {}

export const IPresentableProductTypeGuards = generateTypeGuards<IPresentableProduct>(["id", "name", "usdCost"]);
