import {ProductCategory} from "GQLTypes";
import { generateTypeGuards, OnlyForce } from "TypeUtil";

export interface IPresentableCategory extends OnlyForce<ProductCategory, "id" | "name" | "description"> {}

export const IPresentableCategoryTypeGuards = generateTypeGuards<IPresentableCategory>(["id", "name", "description"]);
