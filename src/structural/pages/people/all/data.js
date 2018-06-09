// @flow

export type product = {
    name: string,
    description: string,
    numberOfSales: number,
    rating: number
}

export const people: Array<product> = [
    {
        name: "Person 1",
        description: "This is a product.",
        numberOfSales: 10,
        rating: 4
    },
    {
        name: "Person 2",
        description: "This is a product.",
        numberOfSales: 20,
        rating: 4.5
    },
    {
        name: "Person 3",
        description: "This is a product.",
        numberOfSales: 30,
        rating: 3
    },
    {
        name: "Person 4",
        description: "This is a product.",
        numberOfSales: 40,
        rating: 2.5
    },
    {
        name: "Person 5",
        description: "This is a product.",
        numberOfSales: 50,
        rating: 4.5
    },
];

