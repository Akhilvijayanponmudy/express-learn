
const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/contactController');

// const { authenticateToken } = require('../controllers/loginController');

// console.log('contact page : ' + authenticateToken);


const verifyToken = require('../controllers/verifyToken')


router.get('/', verifyToken, (req, res) => {
    res.render('contact');
});

router.post('/', submitForm); // Use the submitForm function for handling form submission\

module.exports = router;