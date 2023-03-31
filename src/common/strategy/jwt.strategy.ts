import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { AuthService } from '.././../modules/auth/auth.service';
import { UserToken } from '../../modules/auth/dto';

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
    
    // console.log("checkValidateUser",payload)
      const user = await this.authService.validUser(payload);

      return user;
  }
}
