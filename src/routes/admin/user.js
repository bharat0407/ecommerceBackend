const express = require('express');
const {signup, signin} = require('../../controller/admin/admin');

const router = express.Router();

router.post('/admin/signin',signin);
router.post('/admin/signup', signup);
module.exports = router;
