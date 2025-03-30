const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/videos', require('./routes/video.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/uploads', express.static('uploads'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
