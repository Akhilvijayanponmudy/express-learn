const express = require('express');
const router = express.Router();
const { getItemById,updateItem,deleteItem } = require('../controllers/itemController');

// Route to get a single contact by ID
router.get('/:id', getItemById);
router.post('/:id/update', updateItem);
// router.delete('/:id/delete', deleteItem);
router.post('/:id/delete', deleteItem);

module.exports = router;
