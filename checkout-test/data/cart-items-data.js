const CartItem = {
    name: String,
    price: Number,
    description: String,
    rating: Number
}

const cartItems = [ // Array<CartItem>
    {
        name: "CartItem 1",
        fixedUSDAmount: .1,
        acceptedAsset: { 
            balance: 0, 
            asset_type: "alpha-numeric-4", 
            asset_code: "CNY",
            asset_issuer: 'GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX'
        },
        description: "This is a product.",
        rating: 2,
        seller: 'GAJPGDMMXMOKFKKHOJC223MLEGRS3POIWXWTFWORLUKUXMABCPW3O5GY'
    },
    {
        name: "CartItem 2",
        fixedUSDAmount: .1,
        acceptedAsset: { 
            balance: 0, 
            asset_type: "alpha-numeric-4",
            asset_code: "MOBI",
            asset_issuer: 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH'
        },
        description: "This is also a product.",
        rating: 2,
        seller: 'GDS7EAM5W5H5SIN7UN6XCIVJKYOBDEGFSZHRAE2JDEXNC7LKYDLBRGLY'
    },
];

module.exports = cartItems;