import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private _repository: Repository<UserEntity>) {}

  async findByEmail(email: string) {
    return this._repository.findOneBy({
      email,
    });
  }

  async findById(id: number) {
    return this._repository.findOneBy({
      id,
    });
  }

  create(dto: CreateUserDto) {
    return this._repository.save(dto);
  }
}
