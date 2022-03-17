const res = require('express/lib/response');
const req = require('express/lib/request');
const { default: slugify } = require('slugify');
const Category = require('../../models/category');

function createcategoris(categories, parentId = null) {
  let category; // singular ya plural
  let categoryList = [];
  console.log(categories, parentId);
  if (parentId === null) {
    category = categories.filter((cate) => {
      return cate.parentId == undefined;
    });
  } else {
    category = categories.filter((cate) => {
      return cate.parentId == parentId;
    }); // array -> plural ya singular?
  }
  console.log('category: ', category);
  for (let cate of category) {
    const children = createcategoris(categories, cate._id);
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children,
    });
  }
  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(200).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({})
    .then((categories) => {
      const categoryList = createcategoris(categories);
      res.status(200).json({ categoryList });
    })
    .catch((error) => {
      console.log('Error: ', error);
      return res.status(400).json(error);
    });
};
