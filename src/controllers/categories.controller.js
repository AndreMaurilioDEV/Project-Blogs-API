const categoryService = require('../services/category.service');
const jwt = require('jsonwebtoken');

const emptyValues = (value) => {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  } 

const createCategoryController = async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    if (req.body.name === undefined) {
        return res.status(400).json({message: '"name" is required'});
    }
    return res.status(201).json(category);
};

module.exports = {
    createCategoryController
}