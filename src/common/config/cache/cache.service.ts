import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";
@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { };

    async getValue(keyName: string): Promise<any> {
        try {
            return await this.cacheManager.get(keyName);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async setValue(keyName: string, keyValue: any, ttl: number): Promise<any> {
        try {
            return await this.cacheManager.set(keyName, keyValue, { ttl: ttl })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async setValueWithOutTtl(keyName: string, keyValue: any): Promise<any> {
        try {
            return await this.cacheManager.set(keyName, keyValue)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}