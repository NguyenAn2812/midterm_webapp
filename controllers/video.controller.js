const Video = require('../models/Video');

// POST /api/videos

const uploadVideo = async (req, res) => {
  const { title, description } = req.body;
  const videoPath = req.file ? `/uploads/videos/${req.file.filename}` : null;

  if (!videoPath) {
    return res.status(400).json({ message: 'Chưa gửi file video' });
  }

  try {
    const newVideo = new Video({
      title,
      description,
      videoUrl: videoPath,
      uploadedBy: req.user.id
    });

    const saved = await newVideo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Upload thất bại', error: err.message });
  }
};
// GET /api/videos/id
const getVideoById = async (req, res) => {
    try {
      // Tăng view trước khi trả về
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      ).populate('uploadedBy', 'username email');
  
      if (!video) return res.status(404).json({ message: 'Not found' });
  
      res.json(video);
    } catch (err) {
      res.status(500).json({ message: 'Lỗi', error: err.message });
    }
  };
// PATCH /api/videos/:id/like
const toggleLike = async (req, res) => {
    const userId = req.user.id;
    const videoId = req.params.id;
  
    try {
      const video = await Video.findById(videoId);
  
      if (!video) return res.status(404).json({ message: 'Video not found' });
  
      const hasLiked = video.likedBy.includes(userId);
  
      if (hasLiked) {
        // Nếu đã like → unlike
        video.likedBy.pull(userId);
        video.likes -= 1;
      } else {
        // Nếu chưa like → thêm like
        video.likedBy.push(userId);
        video.likes += 1;
      }
  
      await video.save();
  
      res.json({
        message: hasLiked ? 'Unliked' : 'Liked',
        likes: video.likes
      });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi xử lý like', error: err.message });
    }
  };
  
// GET /api/videos
const getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find()
        .populate('uploadedBy', 'username email')
        .sort({ createdAt: -1 }); "lasted"
  
      res.json(videos);
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách video', error: err.message });
    }
  };
const getMyVideos = async (req, res) => {
    try {
        const videos = await Video.find({ uploadedBy: req.user.id })
        .sort({ createdAt: -1 });

        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy video cá nhân', error: err.message });
    }
};
  module.exports = {
    uploadVideo,
    getVideoById,
    getAllVideos,
    toggleLike,
    getMyVideos
  };