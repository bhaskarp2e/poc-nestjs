import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthSchema } from '../auth/auth.schema';
import { AuthMid } from '../auth/middleware/auth.middleware';

@Module({
  imports: [ConfigModule,MongooseModule.forFeature([{name: AuthUser.name, schema: AuthSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMid).forRoutes('user');
      }
}
