// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');


router.post('/register', register);

router.post('/login', login);

router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working!' });
});

module.exports = router;
