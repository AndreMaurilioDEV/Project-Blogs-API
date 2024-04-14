const blogService = require('../services/blogs.service');

const createBlogController = async (req, res) => {
  /* if (emptyValues(req.body.name)) {
        return res.status(400).json({message: '"name" is required'});
    } */
  const blog = await blogService.createBlog(req.body);
  return res.status(201).json(blog);
};

module.exports = {
  createBlogController,
};
