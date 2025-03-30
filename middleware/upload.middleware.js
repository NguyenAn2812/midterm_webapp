const multer = require('multer');
const path = require('path');

// Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Chỉ cho phép file video
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.mp4' || ext === '.webm' || ext === '.mov') {
    cb(null, true);
  } else {
    cb(new Error('Chỉ hỗ trợ định dạng video .mp4, .webm, .mov'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
