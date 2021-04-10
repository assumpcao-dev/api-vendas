import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

//variable uploadFolder resolve the path where our images will be save.
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

//export the object that go work with multer storage: multer.diskStorage,
//passing by object
export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
