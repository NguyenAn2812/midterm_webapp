const Comment = require('../models/Comment');

// POST /api/comments/:videoId
const postComment = async (req, res) => {
  const { content } = req.body;
  const { videoId } = req.params;
  const userId = req.user.id;

  try {
    const newComment = await Comment.create({
      video: videoId,
      user: userId,
      content
    });

    // ✅ Populate thông tin user để gửi về frontend đầy đủ
    await newComment.populate("user", "username email avatar");

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi gửi bình luận", error: err.message });
  }
};


// GET /api/comments/:videoId
const getComments = async (req, res) => {
  const { videoId } = req.params;

  try {
    const comments = await Comment.find({ video: videoId })
      .populate('user', 'username email avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy bình luận', error: err.message });
  }
};

module.exports = {
  postComment,
  getComments
};
