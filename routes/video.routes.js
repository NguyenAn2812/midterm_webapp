const express = require('express');
const router = express.Router();
const {
  uploadVideo,
  getVideoById,
  getAllVideos,
  toggleLike,
  getMyVideos
} = require('../controllers/video.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/my', verifyToken, getMyVideos);

// Upload video
router.post('/', verifyToken, uploadVideo);

// Lấy danh sách tất cả video
router.get('/', getAllVideos);

router.patch('/:id/like', verifyToken, toggleLike);

// Xem chi tiết video
router.get('/:id', getVideoById);


module.exports = router;
