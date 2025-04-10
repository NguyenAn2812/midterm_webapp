const express = require('express');
const router = express.Router();
const { postComment, getComments } = require('../controllers/comment.controller');
const verifyToken = require('../middleware/auth.middleware');

router.post('/:videoId', verifyToken, postComment);

router.get('/:videoId', getComments);

module.exports = router;
