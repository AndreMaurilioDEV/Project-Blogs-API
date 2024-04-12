const categoryService = require('../services/category.service');
const jwt = require('jsonwebtoken');

const emptyValues = (value) => {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  } 

const createCategoryController = async (req, res) => {
    if (emptyValues(req.body.name)) {
        return res.status(400).json({message: '"name" is required'});
    }
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json(category);
};

const getCategoriesController = async (_req, res) => {
    try {
        const categories = await categoryService.getCategories();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    createCategoryController,
    getCategoriesController
};