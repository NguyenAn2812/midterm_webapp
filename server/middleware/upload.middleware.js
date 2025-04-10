const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.mp4' || ext === '.webm' || ext === '.mov') {
        cb(null, true);
    } else {
        cb(new Error('Only supports .mp4, .webm, .mov video formats'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
