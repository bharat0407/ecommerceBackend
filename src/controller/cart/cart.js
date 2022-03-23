const req = require('express/lib/request');
const res = require('express/lib/response');
const cart = require('../../models/cart');
const Cart = require('../../models/cart');
const user = require('../../models/user');


exports.addToCart =(req,res)=>{

    Cart.findOne({user:req.user._id})
    .then((cart)=>{
         if(cart){
        Cart.findOneAndUpdate({user:req.user._id},{
            "$push":{
                   cardItems:req.body.cardItems
                }
            
        }).then((_cart)=>{
              return res.status(200).json({cart:_cart});
        }).catch((error)=>{
            console.log(error);
        });
         }else{
          const cart = new Cart({
              user:req.user._id,
              cardItems:[req.body.cardItems]
          });

          cart.save((error,cart)=>{
              if(error)return res.status(400).json({error});
              if(cart){
                  res.status(200).json({cart})
              }
          });
         }
    });
}