const { Category } = require('../models/');

const createCategory = async ({name}) => {
    const categoryCreate = await Category.create({name});
    return categoryCreate;
};

const getCategories = async () => {
    try {
        const categories =  await Category.findAll();
        console.log(categories);
        return categories;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createCategory,
    getCategories
};