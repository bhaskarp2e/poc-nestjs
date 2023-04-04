import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigurationModule } from '../config.module';
import { ConfigurationService } from '../config.service';
import * as redisStore from "cache-manager-redis-store";
import { CacheService } from './cache.service';
@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigurationModule],
            useFactory: async (config: ConfigurationService) => ({
                isGlobal: true,
                store: redisStore,
                host: config.get('REDIS_CACHE_HOST'),
                port: config.get('REDIS_PORT'),
                auth_pass: config.get('REDIS_AUTHENTICATION')
            }),
            inject: [ConfigurationService],
        })
    ],
    providers: [CacheService,CacheModule],
    exports: [CacheService,CacheModule]
})

export class CachingModule {}