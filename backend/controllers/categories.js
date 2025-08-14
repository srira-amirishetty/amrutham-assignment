const Category = require("../models/specialization")

//get all categories 
exports.GetCategories  =  async (req, res) => {
  console.log("trigger")
  const categories = await Category.find()
  res.json(categories);
};

//create a new category route
exports.CreateCategory =  async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
};