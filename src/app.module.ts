import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  // imports: [AuthModule, MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  imports: [ ConfigModule.forRoot({}), AuthModule, UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')],

  
})

export class AppModule {}
