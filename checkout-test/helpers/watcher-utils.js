const getStellarBalances = (publicKey) => {
    return server.loadAccount(publicKey)
        .then(account => account.balances)
        .catch(err => console.log(err))
}


// 1. create transaction operations
// could be optimized if: 
    // given selected asset from balances instead of looking it up
    // TODO: figure out how to logically group paths / payments / transactions
    // TODO: Allow for multiple asset balances update them locally after each transaction is made to keep track
        // How to determine which assets the user is willing ti buy with?

// helper for below
const createPathPayment = (sender, receiver, pathFoundResult, buffer = 0.015) => {
    const { 
        source_asset_type,
        source_asset_code,
        source_asset_issuer,
        source_amount,
        destination_asset_type,
        destination_asset_code,
        destination_asset_issuer,
        destination_amount,
        path
    } = pathFoundResult;

    const sendAsset = (source_asset_type === 'native') ?
        new StellarSdk.Asset.native() : 
        new StellarSdk.Asset(source_asset_code, source_asset_issuer);
    const destAsset = (destination_asset_type === 'native') ?
        new StellarSdk.Asset.native() :
        new StellarSdk.Asset(destination_asset_code, destination_asset_issuer);
    const _path = (path.length === 0) ? path : path.map(asset => {
        if (asset.asset_type === 'native') return nativeAsset;
        else return new StellarSdk.Asset(asset.asset_code, asset.asset_issuer);
    });
    const paddedAmtWithBuffer = ((1 + buffer) * parseFloat(source_amount)).toFixed(7);
    const res = {
        source: sender,
        sendAsset: sendAsset,
        sendMax: new String(paddedAmtWithBuffer),
        destination: receiver,
        destAsset: destAsset,
        destAmount: new String(destination_amount),
        path: _path,
    };
    return StellarSdk.Operation.pathPayment(res);
}          
        
const createTransactionOps = (myCartItems, myBalances, selectedAsset, pmtBuffer) => {
    const promises = myCartItems.map(cartItem => {
        const { 
            seller: curSellerPubKey,
            acceptedAsset: {
                    asset_code: cartItemAsset_Code,
                    balance: cartItemAsset_Price,
                    asset_issuer: cartItemAsset_Issuer
            }
        } = cartItem;
        const adj_cartItemAsset_Price = cartItemAsset_Price.toFixed(7);
        const { 
            code: selectedAssetCode, 
            issuer: selectedAssetIssuer
        } = selectedAsset;
        
        let balanceForAsset;
        if (selectedAssetIssuer) {
            balanceForAsset = myBalances.find(bal => (
                bal.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)
            ).balance;
        } else {
            balanceForAsset = myBalances.find(bal => (bal.asset_type === 'native')).balance;
        }
        
        // TODO: If seller has multiple accepted assets, see if any of them match your selected asset        
        // const sellerAcceptedAsset = acceptedAssets.find(asset => 
        //      (asset.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)))
        // if (sellerAcceptedAsset)
        
        // TODO: Check for stellar lumens min thresh IF Lumens
        if (cartItemAsset_Code === selectedAssetCode && cartItemAsset_Issuer === selectedAssetIssuer) { // check if you have the asset
            if (balanceForAsset > adj_cartItemAsset_Price) //check if you have enough
                return Promise.resolve(StellarSdk.Operation.payment({ 
                    destination: curSellerPubKey,
                    asset: selectedAsset, 
                    amount: adj_cartItemAsset_Price
                }));
            else throw new Error('insufficient funds or cannot find a path between yours and the desired assets');
        }
        // TODO: need to use LRU PATH CACHE
        else { // user doesnt have the asset so we try to find a path
            const destAsset = new StellarSdk.Asset(cartItemAsset_Code, cartItemAsset_Issuer);
            // TODO: test added check of not going over balance
            const cheapestPath = pathsMicroService.pathLookUp(
                pagePubKey, curSellerPubKey, selectedAsset, balanceForAsset, destAsset, adj_cartItemAsset_Price
            );
            return cheapestPath.then(foundPath => {
                if (!foundPath) return new Error('insufficient funds or cannot find a path between yours and the desired assets');
                // TODO: Not sure how to handle this from a user experience perspective
                else {
                    return Promise.resolve(
                        createPathPayment(pagePubKey, curSellerPubKey, foundPath)
                    );
                }
            });
        }
    });
    return Promise.all(promises);
}
    

/*
const createTransactionOps = (publicKey, selectedAsset, pmtBuffer) => {
    const starterPromises = [];
    starterPromises.push(getStellarBalances(publicKey));
    // starterPromises.push(psql query Promise);
    // let myBalances = [], myCartItems = [];
    return Promise.all(starterPromises)
        .then(res => {
            const myBalances = res[0];
            
            // TODO: may need to map cart items into cart item objects
            const myCartItems = res[1];

            const promises = myCartItems.map(cartItem => {
                const { 
                    seller: curSellerPubKey,
                    acceptedAsset: {
                        asset_code: cartItemAsset_Code,
                        balance: cartItemAsset_Price,
                        asset_issuer: cartItemAsset_Issuer
                    }
                } = cartItem;
                const adj_cartItemAsset_Price = cartItemAsset_Price.toFixed(7);
                
                // TODO: MAKE SURE IS SDK ASSET TYPE
                const { 
                    code: selectedAssetCode, 
                    issuer: selectedAssetIssuer
                } = selectedAsset;
                
                let balanceForAsset;
                if (selectedAssetIssuer) {
                    balanceForAsset = myBalances.find(bal => (
                        bal.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)
                    ).balance;
                } else {
                    balanceForAsset = myBalances.find(bal => (bal.asset_type === 'native')).balance;
                }
                
                // TODO: V2: If seller has multiple accepted assets, see if any of them match your selected asset        
                // const sellerAcceptedAsset = acceptedAssets.find(asset => 
                //      (asset.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)))
                // if (sellerAcceptedAsset)
                
                // TODO: Check for stellar lumens min thresh IF Lumens
                if (cartItemAsset_Code === selectedAssetCode && cartItemAsset_Issuer === selectedAssetIssuer) { // check if you have the asset
                    if (balanceForAsset > adj_cartItemAsset_Price) //check if you have enough
                        return Promise.resolve(StellarSdk.Operation.payment({ 
                            destination: curSellerPubKey,
                            asset: selectedAsset, 
                            amount: adj_cartItemAsset_Price
                        }));
                    else throw new Error('insufficient funds or cannot find a path between yours and the desired assets');
                }
                else { // user doesnt have the asset so we try to find a path
                    const destAsset = new StellarSdk.Asset(cartItemAsset_Code, cartItemAsset_Issuer);
                    // TODO: test added check of not going over balance
                    const cheapestPath = pathsMicroService.pathLookUp(
                        pagePubKey, curSellerPubKey, selectedAsset, balanceForAsset, destAsset, adj_cartItemAsset_Price
                    );
                    return cheapestPath.then(foundPath => {
                        // TODO: Not sure how to handle this from a user experience perspective
                        if (!foundPath) return new Error('insufficient funds or cannot find a path between yours and the desired assets');
                        else {
                            return Promise.resolve(
                                createPathPayment(pagePubKey, curSellerPubKey, foundPath)
                            );
                        }
                    });
                }
            });
            return Promise.all(promises);
        });
}
*/

// 2. creates transaction and returns transaction bytes
// -------------------------------------------------------------------- //
// desc: create transaction given arbirary amount of arbitrary types of operations and then submits it
// inputs: senderPub: string, senderPriv: string, operations = operations: operation | Array<operation>
// returns: transaction bytes
// -------------------------------------------------------------------- //
const getBase64fromTransaction = (transaction) => {
    return transaction.toEnvelope().toXDR().toString("base64");
}

const createTransaction = (senderPub, operations) => {
    return server.loadAccount(senderPub)
        .then(function(account) {
            let builder;
            if (!Array.isArray(operations))
                builder = new StellarSdk.TransactionBuilder(account)
                    .addOperation(operations);
            else  {
                builder = new StellarSdk.TransactionBuilder(account);
                builder.operations = operations;
            }
            const transaction = builder.build();
            return getBase64fromTransaction(transaction);
        })
        .then(transactionResult => transactionResult)
        // .catch(err => console.error(err))
        .catch(err => console.error(JSON.stringify(err.response.data.extras.result_codes)))
}


module.exports = {
    createTransactionOps,
    createTransaction      
}