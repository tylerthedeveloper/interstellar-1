const TEMP_pathsDict = {
    MOBI: {
        'REPO': {
            destinationAmount: 5,
            path: [ 
                    { 
                        asset_type: 'credit_alphanum4',
                        asset_code: 'STM',
                        asset_issuer: 'GCMS2VO5ANJCESJBZVC3INFSETS3K4UWMU47W7KSQ2BYASEQAN4NUSTM' 
                    },
                    { 
                        asset_type: 'credit_alphanum4',
                        asset_code: 'XCN',
                        asset_issuer: 'GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNY' 
                    } 
            ]
        },
    },
    REPO: {
        'MOBI': {
            destinationAmount: 3,
            path: [
                {
                    "asset_type": "native"
                }
            ]
        },
    }
}

module.exports = TEMP_pathsDict;

// Samer Hassouneh
