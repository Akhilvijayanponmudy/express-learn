const express = require('express');
const router = express.Router();
const {  listItems } = require('../controllers/contactController'); 

router.get('/', listItems);


module.exports = router;
