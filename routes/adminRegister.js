const express = require('express');
const router = express.Router();
const adminRegController = require('../controllers/adminRegController');

router.get('/', adminRegController.getRegistrationForm);
router.post('/', adminRegController.register);

module.exports = router;
