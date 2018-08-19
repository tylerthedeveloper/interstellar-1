import { stellarAsset, IPathInfo } from "./pathfinder";

export class LocalCache {

    private cache: any;

    constructor(cache: any) {
        this.cache = cache;
    }

    public savePathsToCache(destinationAsset: stellarAsset, bucket: number, bestPaths: IPathInfo[]): any {
        // this.cache.add()
    }

    public lookupInCache(destinationAsset: stellarAsset): any {
        // return this.cache.get(destinationAsset)
    }
    
    private removeFromCache(destinationAsset: stellarAsset): void {
        // this.cache.remove(destinationAsset)
    }
    

}