import express from "express";
import Blog from '../models/blog.js';

const blogRoutes = express.Router();

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
}

const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Blog not found.');
    }
};

blogRoutes.route('/').get(getBlogs);
blogRoutes.route('/:id').get(getBlog);

export default blogRoutes;