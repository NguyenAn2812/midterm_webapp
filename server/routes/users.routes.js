const express = require('express');
const router = express.Router();
const { getMe, updateMe } = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/avatars/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

router.get('/me', verifyToken, getMe);

router.put('/me', verifyToken, upload.single('avatar'), updateMe);
const User = require("../models/User");

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("username email avatar");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
});
module.exports = router;
