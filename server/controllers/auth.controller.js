const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');

// POST /api/auth/register
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already registered' });

        const hashed = await hashPassword(password);
        const newUser = await User.create({ username, email, password: hashed });

        res.status(201).json({
        message: 'User registered',
        user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = generateToken(user);
        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
// GET /api/users/me
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('username email avatar');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};

// PUT /api/users/me
const updateMe = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.username) updateData.username = req.body.username;
        if (req.body.password) updateData.password = await hashPassword(req.body.password);
        if (req.file) updateData.avatar = "/uploads/avatars/" + req.file.filename;

        const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true })
            .select('username email avatar');
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Update failed', error: err.message });
    }
};

module.exports = { 
    register,
    login,
    getMe,
    updateMe
};

