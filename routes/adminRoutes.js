// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getLoginForm);

router.post('/', adminController.login);

module.exports = router;

