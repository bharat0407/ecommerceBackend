const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/signin', (req, res) => {});
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  if (
    isEmpty(email) ||
    isEmpty(password) ||
    isEmpty(firstName) ||
    isEmpty(lastName)
  ) {
    return res.status(400).json({
      message:
        'Insufficient data provided. Please provide email, password and firstName',
    });
  }

  User.findOne({ email: email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: 'user already exist',
      });
    }

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: email,
    });
    _user.save((error, data) => {
      if (error) {
        console.error('Error during user creation: ', error);
        return res.status(400).json({ message: 'something went wrong' });
      }
      if (data) {
        return res.status(200).json({
          message: 'user registerd successfully',
        });
      }
    });
  });
});

function isEmpty(val) {
  return !val || val.length < 1;
}

module.exports = router;
