const express = require('express');
const router = express.Router();
const category = require('../controllers/categories');

router.post('/create-category',category.CreateCategory);
router.get('/get-categories',category.GetCategories);

module.exports = router;