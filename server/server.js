const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


dotenv.config();
connectDB();

app.use(express.json());
// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/videos', require('./routes/video.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
