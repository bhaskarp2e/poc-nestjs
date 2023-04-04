// import { CacheModule, Global, Module } from '@nestjs/common';
// import { ConfigurationModule } from '../config.module';
// import { ConfigurationService } from '../config.service';
// import { Cache } from 'cache-manager';
// import * as redisStore from 'cache-manager-redis-store';

// @Global()
// @Module({
//     imports: [
//       CacheModule.forRootAsync({
//         useFactory: () => ({
//           store: redisStore,
//           host: 'localhost',
//           port: 6379,
//         }),
//       }),
//     ],
//   })
// export class RedisCachingModule {}
