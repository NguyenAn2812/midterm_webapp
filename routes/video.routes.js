const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  toggleLike,
  getMyVideos
} = require('../controllers/video.controller');

// Upload file video (FormData)
router.post('/', verifyToken, upload.single('video'), uploadVideo);

router.get('/my', verifyToken, getMyVideos);
router.get('/', getAllVideos);
router.get('/:id', getVideoById);
router.patch('/:id/like', verifyToken, toggleLike);

module.exports = router;
