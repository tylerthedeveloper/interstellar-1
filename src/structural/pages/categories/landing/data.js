// @flow

export type product = {
    name: string,
    price: number,
    description: string,
    rating: number
}

export const products: Array<product> = [
    {
        name: "Product 1",
        price: 20,
        description: "This is a product.",
        rating: 2
    },
    {
        name: "Product 2",
        price: 10,
        description: "This is a product.",
        rating: 5
    },
    {
        name: "Product 3",
        price: 2022,
        description: "This is a product.",
        rating: 4
    },
    {
        name: "Product 4",
        price: 25,
        description: "This is a product.",
        rating: 4.5
    },
    {
        name: "Product 5",
        price: 2,
        description: "This is a product.",
        rating: 3.5
    },
];

