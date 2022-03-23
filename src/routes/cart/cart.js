const express = require('express');
const {
  requiresign,userMiddleware
} = require('../../comman-middleware/comm-midd');
const { addToCart } = require('../../controller/cart/cart');

const router = express.Router();

// router.post('/category/create',requiresign,adminMiddleware, addCategory);
router.post('/user/addtocart', requiresign, userMiddleware,addToCart);
module.exports = router;