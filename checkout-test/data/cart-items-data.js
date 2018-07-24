const CartItem = {
    name: String,
    price: Number,
    description: String,
    rating: Number
}

const cartItems = [ // Array<CartItem>
    {
        name: "CartItem 1",
        fixedUSDAmount: 0,
        acceptedAsset: { 
            balance: 1, 
            asset_type: "alpha-numeric-4", 
            asset_code: "REPO",
            asset_issuer: 'GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B'
        },
        description: "This is a product.",
        rating: 2,
        seller: 'GBG5JTXIOQEP2W3XJGQPYCJ7633KLFPA4SS5MB7FVOHIOWBXKEH2ZWBJ'
    },
    // {
    //     name: "CartItem 2",
    //     fixedUSDAmount: 20,
    //     acceptedAsset: { 
    //         balance: 0, 
    //         asset_type: "alpha-numeric-4", 
    //         asset_code: "BTC",
    //         asset_issuer: 'GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH'
    //     },
    //     description: "This is a product.",
    //     rating: 2,
    //     seller: 'GBG5JTXIOQEP2W3XJGQPYCJ7633KLFPA4SS5MB7FVOHIOWBXKEH2ZWBJ'
    // },
    // {
    //     name: "CartItem 3",
    //     fixedUSDAmount: 0,
    //     acceptedAsset: { balance: 5, asset_type: "alpha-numeric-4", asset_code: "MOBI",
    //         asset_issuer: 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH' 
    //     },
    //     description: "This is a product.",
    //     rating: 2,
    //     seller: 'GBPL65LCOZ35N26TJEL6SIELSWX4KXJGCRDYWB6CEDOILGR6KKTRHJG3'
    // },
];

module.exports = cartItems;