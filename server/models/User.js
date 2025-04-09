const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  avatar: {
    type: String,
    default: "/uploads/avatars/default.png" // hoặc /images/default-avatar.png
  }
});

module.exports = mongoose.model('User', userSchema);
