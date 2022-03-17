const express = require('express');
const {
  requiresign,
  adminMiddleware,
} = require('../../comman-middleware/comm-midd');
const {
  addCategory,
  getcategories,
  getCategories,
} = require('../../controller/category/category');
const router = express.Router();

// router.post('/category/create',requiresign,adminMiddleware, addCategory);
router.post('/category/create', requiresign, adminMiddleware, addCategory);
router.get('/category/getCategory', getCategories);
module.exports = router;
