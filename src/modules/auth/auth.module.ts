import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUser, AuthSchema } from './auth.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../common/strategy';

@Module({
  imports: [JwtModule.register({}), ConfigModule,MongooseModule.forFeature([{name: AuthUser.name, schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
