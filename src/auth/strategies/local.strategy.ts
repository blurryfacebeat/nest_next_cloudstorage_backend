import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { WRONG_LOGIN_OR_PASSWORD } from '../exceptions/messages';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this._authService.findAndValidateUser(email, password);

    if (!user) throw new UnauthorizedException(WRONG_LOGIN_OR_PASSWORD);

    return user;
  }
}
