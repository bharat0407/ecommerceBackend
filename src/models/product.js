const mongoose = require('mongoose');
 
 const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
         type:Number,
         required:true
    },
   description:{
       type:String,
       required:true
   },
   categroy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"category",
       required:true
   },
   offer:{
       type: Number
   },
   productPicture:[
       {
           img:{type:String}
       }
   ],
   reviews:[{
       
           userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
           review:String
   }  
   ],
   createdBy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user'
   },
   updatedAt:Date
   
 },{timestamps:true});

 module.exports = mongoose.model('product',productSchema);