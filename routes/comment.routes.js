const express = require('express');
const router = express.Router();
const { postComment, getComments } = require('../controllers/comment.controller');
const verifyToken = require('../middleware/auth.middleware');

// Gửi bình luận
router.post('/:videoId', verifyToken, postComment);

// Lấy bình luận của video
router.get('/:videoId', getComments);

module.exports = router;
