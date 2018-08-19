import { stellarAsset, IPathInfo } from "./pathfinder";

// local cache class implementation
export class LocalCache {

    // in-memory data
    private cache: { [index: string]: { exchangeRate: number, path: stellarAsset[] } };

    constructor(cache: any) {
        this.cache = cache;
    }

    /**
     * adds / updates cache with new best paths list going to the destination asset
     */
    public savePathsToCache(key: string, value: any, bucket: number, bestPaths: IPathInfo[]): any {
        // this.cache[key] = value
        // setTimeout(() => this.removeFromCache(key))
    }

    /**
     * returns if an item is in the cache
     */
    public lookupInCache(key: string): any | null {
        // return this.cache[key] 
    }
    
    /**
     * removes an asset from the cache
     */
    private removeFromCache(asset: stellarAsset): void {
        // this.cache[asset] = null;
    }

}
