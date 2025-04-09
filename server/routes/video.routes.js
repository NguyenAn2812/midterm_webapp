const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  toggleLike,
  getMyVideos,
  incrementView
} = require('../controllers/video.controller');

// Upload file video (FormData)
router.post('/', verifyToken, upload.single('video'), uploadVideo);

router.get('/my', verifyToken, getMyVideos);
router.get('/', getAllVideos);
router.get('/:id', getVideoById);
router.patch('/:id/like', verifyToken, toggleLike);
router.patch("/:id/view", incrementView);
const Video = require("../models/Video");

router.get("/user/:userId", async (req, res) => {
  try {
    const videos = await Video.find({ uploadedBy: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "username avatar");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
});

module.exports = router;
