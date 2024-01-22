import multer from 'multer';
import path from 'path';

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (_, file, callback) => {
    const unoquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    const fileName = `${unoquePreffix}_${file.originalname}`;
    callback(null, fileName);
  }
});

const limits = {
  fileSize: 1024 * 1024 * 20
};

const upload = multer({
  storage,
  limits,
});

export default upload;