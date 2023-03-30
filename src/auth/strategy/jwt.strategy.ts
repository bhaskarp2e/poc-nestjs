import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserToken } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: UserToken) {
    // const user =
    //   await this.prisma.user.findUnique({
    //     where: {
    //       id: payload.sub,
    //     },
    //   });
    console.log("checkValidateUser",payload)
      const user = await this.authService.validUser(payload);

      return user;
  }
}
