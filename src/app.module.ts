import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  // imports: [AuthModule, MongooseModule.forRoot('mongodb://localhost:27017/nest')],
  imports: [AuthModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')],

  
})

export class AppModule {}
