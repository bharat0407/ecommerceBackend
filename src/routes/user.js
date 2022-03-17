const express = require('express');
const {signup, signin,} = require('../controller/auth');
const { validateSignupRequest, isRequestValidate, validateSigninRequest } = require('../validator/validate');

const router = express.Router();

router.post('/signin',validateSigninRequest,isRequestValidate ,signin);
router.post('/signup',validateSignupRequest,isRequestValidate, signup);
module.exports = router;
