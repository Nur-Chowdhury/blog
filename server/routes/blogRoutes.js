import express from "express";
import asyncHandler from 'express-async-handler';
import { admin, protectRoute } from "../middleware/authMiddleware.js";
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

//category
/*const getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category");
    const data = res.json(categories);
    console.log(data);
  } catch (error) {
    res.status(404);
    throw new Error('Categories not found!');
  }
};*/

// Route to fetch all unique category names
blogRoutes.get("/categories", async (req, res) => {
  try {
    const categoryNames = await Blog.distinct("category"); // Replace "category" with the name of your category field

    res.json(categoryNames);
  } catch (error) {
    console.error("Error fetching category names:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





//getBlogByCategory
const getBlogsByCategory = async (req, res) => {
  const searchedCategory = req.params.category;
  try {
    const blogs = await Blog.find({category: searchedCategory});
    res.json(blogs);
  } catch (error) {
    res.status(404);
    throw new Error('Blogs not found.');
  }
}

//comment
const createBlogComment = asyncHandler(async (req, res) => {
  const { name, email, commentText} = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const comment = {
      name,
      email,
      commentText,
    };

    blog.comments.push(comment);

    blog.numberOfComments = blog.comments.length;
    await blog.save();
    res.status(201).json({ message: 'Comment has been saved.' });
  } else {
    res.status(404);
    throw new Error('Blog not found.');
  }
});


//create a blog
const createNewBlog = asyncHandler(async (req, res) => {
  const { title, image, category, description, blogIsNew } = req.body;
  const newBlog = await Blog.create({
    title,
    image: '/images/' + image, 
    category,
    description,
    blogIsNew,
  });
  await newBlog.save();

  const blogs = await Blog.find({});

  if (newBlog) {
    res.json(blogs);
  } else {
    res.status(404);
    throw new Error('Blog could not be uploaded.');
  }
});

// delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

//update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, image, category, description, blogIsNew, id } = req.body;
  const blog = await Blog.findById(id);

  if (blog) {
    blog.title = title;
    blog.description = description;
    blog.image = '/images/' + image;
    blog.category = category;
    blog.blogIsNew = blogIsNew;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found.');
  }
});

blogRoutes.route('/').get(getBlogs);
blogRoutes.route('/:id').get(getBlog);
//blogRoutes.route('/').get(getCategories);
blogRoutes.route('/:category').get(getBlogsByCategory);
blogRoutes.route('/comments/:id').post(createBlogComment);
blogRoutes.route('/').put(protectRoute, admin, updateBlog);
blogRoutes.route('/:id').delete(protectRoute, admin, deleteBlog);
blogRoutes.route('/').post(protectRoute, admin, createNewBlog);
export default blogRoutes;