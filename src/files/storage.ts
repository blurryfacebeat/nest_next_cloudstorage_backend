import { diskStorage } from 'multer';

import { generateId } from '../util/generateId';

const normalizeFilename = (req, file, callback) => {
  const fileExtensionName = file.originalname.split('.').pop();

  callback(null, `${generateId()}.${fileExtensionName}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: normalizeFilename,
});
