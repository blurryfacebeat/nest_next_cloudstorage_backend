import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FILE_TYPE } from './files.types';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(FileEntity) private _repository: Repository<FileEntity>) {}

  findAll(userId: number, fileType: FILE_TYPE) {
    const qb = this._repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (fileType === FILE_TYPE.PHOTOS) qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });

    if (fileType === FILE_TYPE.TRASH) qb.andWhere('file.deletedAt IS NOT NULL');

    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this._repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this._repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return qb.softDelete().execute();
  }
}
