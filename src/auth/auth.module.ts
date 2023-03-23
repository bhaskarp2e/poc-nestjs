import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUser, AuthSchema } from './auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: AuthUser.name, schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
