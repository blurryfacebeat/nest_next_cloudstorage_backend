import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'nn@cloudstorage.ru',
  })
  email: string;

  @ApiProperty({
    default: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    default: '12345678',
  })
  password: string;
}
