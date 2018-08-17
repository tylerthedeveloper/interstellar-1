
interface stellarAsset {
    code: string;
    issuerPublicKey: string;
}

interface IPathInfo {
    to: stellarAsset;
    from: stellarAsset;
    path: stellarAsset[];
    theshold: number;
    exchangeRate: number; // to / from
}

export class PathfinderInitializationError extends Error {}

export class Pathfinder {

    /**
     * This public key should correspond to an account that holds balances of each of
     * the assets that we support. It will be used as both the destination and source
     * account for all of the pathfinding algorithms. TODO fill it in
     */
    public static REFERENCE_ACCOUNT_PUBLIC_KEY = "";
    public supportedAssets: stellarAsset[];
    constructor() {

    }

    /****************************************
     * Initialization methods
     ****************************************/

    /**
     * Should perform the following actions:
     *
     * - loads the list of supported assets
     */
    public async init() {

        return Promise.all([
            this.getSupportedAssets().then(this.validateSupportedAssets),
        ]);

    }

    /**
     * Loads the list of supported assets from the postgres database
     */
    private async getSupportedAssets() {

        // TODO make the appropriate database calls
        const assets = [] as stellarAsset[];

        this.supportedAssets = assets;
        return assets;
    }

    /**
     * Ensures that the account belonging to REFERENCE_ACCOUNT_PUBLIC_KEY contains balances
     * of all of (but also ONLY) the indicated assets
     *
     * throws PathfinderInitializationError if incorrectly formatted
     */
    private async validateSupportedAssets(assets: [stellarAsset]) {

        // todo fill in the appropriate validation calls
    }

    /****************************************
     * Pathfinding Utilities
     ****************************************/
    public async getPath(params: {
        sourceAsset: stellarAsset,
        destinationAsset: stellarAsset,
        destinationAmount: number,
    }): Promise<IPathInfo> {
        const { sourceAsset, destinationAsset, destinationAmount } = params;

        // checks to make sure that both of the assets are supported in the database
        if (!this.supportsAsset(sourceAsset)) {
            throw new Error(`[getPath] Given an unsupported sourceAsset: ${sourceAsset}`);
        } else if (!this.supportsAsset(destinationAsset)) {
            throw new Error(`[getPath] Given an unsupported destinationAsset: ${destinationAsset}`);
             }

        // calculate the quanitized threshold amount
        const bucket = await this.getBucket(destinationAsset, destinationAmount);

        // check to see if the path info was cached
        const cachedInfo = await this.loadPathFromCache(sourceAsset, destinationAsset, bucket);
        if (cachedInfo) { return cachedInfo; }

        // get the best paths for the destination asset and amount
        const bestPaths = await this.getBestPaths(destinationAsset, destinationAmount);

        // cache the results - no need to await this

        // get the best path corresponding to the sourceAsset and return in
        const path = bestPaths[0];
        return path;
    }

    /***************************************************************************
     * Cache Logic
     ***************************************************************************/

    /**
     * Queries the cache and returns a promise for the path information; if no path information
     * exists, the promise resolves to null.
     */
    private async loadPathFromCache(
        sourceAsset: stellarAsset,
        destinationAsset: stellarAsset,
        threshold: number,
    ): Promise<IPathInfo | null> {

        // todo provide the retrieval logic
        return Promise.resolve(null);
    }

    /**
     * Saves the path info to the cache for each path in bestPaths
     *
     * Note: no need to make this a promise because we will never check up on it
     */
    private savePathsToCache(
        destinationAsset: stellarAsset,
        bucket: number,
        bestPaths: IPathInfo[],
    ) {
        const keyPrefix = `${destinationAsset.code}_${destinationAsset.issuerPublicKey}-${bucket}-`;

        bestPaths.forEach((pathInfo) => {
            const key = `${keyPrefix}${pathInfo.from.code}-${pathInfo.from.issuerPublicKey}`;
            const value = {
                exchangeRate: pathInfo.exchangeRate,
                path: pathInfo.path
            }

            //todo provide the saving mechanism
        });
    }

    /**
     * Computes the relevant bucket for the given destination asset and amount. This is
     * required because the paths between assets might be different at different amounts; however,
     * to enable caching we must quantize the destination amounts to constrain the maximum cache size
     * (e.g., caching every real numbered destination amount that we receive would result in way too
     * many cache entries and cache misses)
     *
     * For example, consider needing to convert eth to btc. The path for 1 btc might be
     *
     * eth - btc
     *
     * but for larger amounts like 100 btc it might be more complicated
     *
     * eth - intermediate 1 - intermediate 2 - intermediate 3 - btc
     *
     * //Todo need to decide and implement the quantization method
     */

    private getBucket(
        destinationAsset: stellarAsset,
        destinationAmount: number,
    ): number {
        return 10000;
    }

    /***************************************************************************
     * Stellar Interface
     ***************************************************************************/

    /**
     * Returns a list of the best paths from each of the supported assets to the given
     * destination asset and amount
     */
    private async getBestPaths(
        destinationAsset: stellarAsset,
        destinationAmount: number,
    ): Promise<IPathInfo[]> {

        // todo implement the pathfinding logic
        // be sure to use REFERENCE_ACCOUNT_PUBLIC_KEY as the destination and source accounts

        return Promise.resolve([]);
    }

    /***************************************************************************
     * Utilities
     ***************************************************************************/


    /**
     * Checks that we support the indicated asset
     */
    private supportsAsset(asset: stellarAsset) {
        return this.supportedAssets!.findIndex((supportedAsset) => {
            return asset.code === supportedAsset.code && asset.issuerPublicKey === supportedAsset.issuerPublicKey;
        }) !== -1;
    }

}
