const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { requiresign, adminMiddleware } = require('../../comman-middleware/comm-midd');
const{createProduct} = require('../../controller/product/product');
//const { addCategory, getcategories, getCategories } = require('../../controller/category/category');
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortId.generate() + '-'+ file.originalname )
    }
  })
const upload = multer({storage});

const router = express.Router();
   
router.post('/product/create',requiresign,adminMiddleware,upload.array('productPicture'),createProduct);
//router.get('/category/getCategory',getCategories);
module.exports = router;