import {ProductCategory} from "GQLTypes";
import {OnlyForce} from "TypeUtil";

export interface PresentableCategory extends OnlyForce<ProductCategory, 'id' | 'name' | 'description'>{}

export function isPresentableCategory(category: Partial<ProductCategory> | null | undefined): category is PresentableCategory {
    return Boolean(category && category.id && category.name && category.description);
}

export function retainPresentableCategories(categories: (Partial<ProductCategory> | null)[]) : PresentableCategory[] {
    return categories.filter(isPresentableCategory);
}