import { Seller } from "GQLTypes";
import { generateTypeGuards, OnlyForce } from "TypeUtil";

export interface IPresentableSeller extends OnlyForce<Seller, "id" | "username"> {}
export const IPresentableSellerTypeGuards = generateTypeGuards<IPresentableSeller>(["id", "username"]);
