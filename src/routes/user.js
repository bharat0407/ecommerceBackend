const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('../models/user');
const router = express.Router();

router.post('/signin',(req,res)=>{

    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user)return res.status(400).json({
            message:"user already exist"
        });
        const{
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username:Math.random().toString()
        });
        _user.save((error,data)=>{
            if(error) return res.status(400).json({message:"something went wrong"});
            if(data){
               return res. status(200).json({
                   message:"user registerd successfully"
               }) 
            }
        });
    });
});
router.post('/signup',(req,res)=>{


});

module.exports = router;