import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUser, AuthSchema } from './auth.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule,JwtModule.register({}),MongooseModule.forFeature([{name: AuthUser.name, schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
