import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService) {}

  async findAndValidateUser(email: string, password: string) {
    const user = await this._usersService.findByEmail(email);

    if (user?.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
