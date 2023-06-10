import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { REGISTRATION_ERROR } from './exceptions/messages';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService, private _jwtService: JwtService) {}

  async findAndValidateUser(email: string, password: string) {
    const user = await this._usersService.findByEmail(email);

    if (user?.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return (({ password, ...result }) => result)(user);
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this._usersService.create(dto);

      return {
        token: this._jwtService.sign({ id: userData.id }),
      };
    } catch (error) {
      throw new ForbiddenException(REGISTRATION_ERROR);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this._jwtService.sign({ id: user.id }),
    };
  }
}
