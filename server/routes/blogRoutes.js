import express from "express";
import Blog from '../models/blog.js';

const blogRoutes = express.Router();

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
}

blogRoutes.route('/').get(getBlogs);

export default blogRoutes;