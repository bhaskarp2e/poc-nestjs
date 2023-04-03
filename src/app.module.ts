import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { CachingModule } from './common/config/cache/cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
@Module({
  // imports: [AuthModule, MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  imports: [ConfigModule.forRoot({ isGlobal: true }), CachingModule, AuthModule, UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    BlogModule],


})

export class AppModule { }
