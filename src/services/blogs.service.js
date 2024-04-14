const { BlogPost } = require('../models');

const createBlog = async ({ title, content, categoryIds }) => {
  const blogCreate = await BlogPost.create({ title, content, categoryIds });
  return blogCreate;
};

/* const get = async () => {
    const blogCreate = await BlogPost.findAll({
        include: [{
            model: Category,
            as: 'categories',
        }],
    });
    return blogCreate;
}; */

module.exports = {
  createBlog,
};