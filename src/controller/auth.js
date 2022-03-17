const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    // if (
    //     isEmpty(email) ||
    //     isEmpty(password) ||
    //     isEmpty(firstName) ||
    //     isEmpty(lastName)
    // ) {
    //     return res.status(400).json({
    //         message:
    //             'Insufficient data provided. Please provide email, password and firstName',
    //     });
    // }


    User.findOne({ email: email }).exec((error, user) => {
        if (user) {
            return res.status(400).json({
                message: 'user already exist'
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
}

function isEmpty(val) {
    return !val || val.length < 1;
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(( user) => {
            // if (error) {
            //     return res.status(400).json({ message: "somethin went wrong", error })
            // }
            //if (user) {
                console.log(user.auhtenticate, user);
                console.log( user instanceof User);
                if (user.auhtenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, password, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, password, role, fullName }
                    });
                } else {
                    return res.status(400).json({ message: "Invaid password" });
                }
            //}
        }).catch((error) => {
            console.log(error);
        });
}

 

