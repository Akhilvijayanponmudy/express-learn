const express = require('express');
const router = express.Router();
const User = require('../models/userRegistration');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('registration');
})
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
    } catch (error) {
        console.log(error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
    res.send('success');
})
module.exports = router;