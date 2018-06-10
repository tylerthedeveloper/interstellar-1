import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql";
// todo: https://github.com/KyleAMathews/deepmerge
import cartItemQuery from "./cart-items-query";
import productCategoryQuery from "./product-category-query";
import productQuery from "./product-query";
import userQuery from "./user-query";

const queryList = [cartItemQuery,productCategoryQuery, productQuery, userQuery];

/* 
    const sum = queryList.reduce((acc, cur) => {
        return acc.concat(cur);
    }, []);

    queryList.map(query =>
    const fields = Object.keys(userQuery).map(key => {
    const _key = key;
    return Object.assign(userQuery[key])
    });
    console.log(fields);
    fields.forEach(field => Object.defineProperty(obj, field))
    const fields = Object.keys(productQuery).map(key => Object.assign(productQuery[key]));
    console.log(obj);
*/ 
const fields = () => ({
    ...cartItemQuery,
    ...productCategoryQuery,
    ...productQuery,
    ...userQuery
    // ...sum
});

export default new GraphQLObjectType({
    name: "RootQueryType",
    fields: fields
});