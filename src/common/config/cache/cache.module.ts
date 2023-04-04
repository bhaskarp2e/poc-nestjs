import { CacheModule, Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigurationModule } from '../config.module';
import { ConfigurationService } from '../config.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: async (config: ConfigurationService) => ({
        store: redisStore,
        host: config.get('REDIS_CACHE_HOST'),
        port: config.get('REDIS_PORT'),
        auth_pass: config.get('REDIS_AUTHENTICATION'),
      }),
      inject: [ConfigurationService],
    }),
  ],
  exports: [CacheModule],
})
export class CachingModule {}
