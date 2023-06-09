import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(FileEntity) private _repository: Repository<FileEntity>) {}

  findAll() {
    return this._repository.find();
  }
}
