const express = require('express');
const router = express.Router();
const User = require('../models/userRegistration');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../controllers/verifyToken')


router.get('/', verifyToken, (req, res) => {
    res.render('userlogin');
});


router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ error: 'Password Error' });
        }
        const token = jwt.sign({ userId: user.id }, 'mysecretkey');
        // Send token as response
        res.cookie('token', token, { httpOnly: true });
        // res.json({ token });
        res.render('contact')
    } catch (error) {
        console.log(error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
});


module.exports = router;
