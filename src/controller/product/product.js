const { default: slugify } = require('slugify');
//const product = require('../../models/product');
const Product = require('../../models/product');


exports.createProduct = (req,res)=>{
   // console.log(req.file);
    //return res.status(200).json({file:req.files,body:req.body});
    const{name,slug,price,categroy,description,createdBy,quantity} = req.body;

    let productPicture = [];
    console.log(req.files);
    if(req.files.length>0){
        productPicture = req.files.map(file =>{
            return {img:file.filename}
        });
    }
    console.log(productPicture);

    const product = new Product({
        name:name,
        slug:slugify(name),
        price,
        categroy,
        quantity,
        productPicture,
        description,
        createdBy:req.user._id
    });
    console.log(product);
    product.save((error,data)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(data){
            return res.status(200).json({data})
        }
    });
};