const res = require("express/lib/response");
const req = require("express/lib/request");
const { default: slugify } = require("slugify");
const Category = require('../../models/category');

function createcategoris(categories,parentId =null){
        let category; 
        categoryList =[];  
    if(parentId == null){
      category = categories.fillter((cate)=>{
          cate.parentId ==undefined;
      });
      }
      else{
        category = categories.fillter((cate)=>{
            cate.parentId == parentId
        });

      }
      for(let cate of category){
          categroyList.push({
              _id:cate._id,
              name:cate.name,
              slug:cate.slug,
              children:createcategoris(categories,cate._id)
          });
      }
      return categoryList;
    };


exports.addCategory = (req,res)=>{
    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const cat  =new Category(categoryObj);
    cat.save((error,category)=>{
        if(error)return res.status(400).json({error});
        if(category){
            return res.status(200).json({category});
        }
    });
}
 
 exports.getCategories = (req,res)=>{
     Category.find({})
     .exec((error,categories)=>{
         if(error)return res.status(400).json({error});
         if(categories){
             categroyList = createcategoris(categories);
             res.status(200).json({categroyList})
         }
     });
 }