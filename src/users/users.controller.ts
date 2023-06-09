import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
