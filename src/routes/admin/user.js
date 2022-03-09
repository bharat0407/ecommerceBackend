const express = require('express');
const {signup, signin, requiresign} = require('../../controller/admin/auth');

const router = express.Router();

router.post('admin/signin',signin);
router.post('admin/signup', signup);
router.post('/profile',requiresign, (req,res)=>{
      res.status(200).json({user:"profile"});
})
module.exports = router;
