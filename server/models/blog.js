import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    commentText: {type: String, required: true},
}, {timestamps: true})

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    comments : [commentSchema],
    numberOfComments:{
        type: Number,
        required: true,
        default: 0,
    },
    blogIsNew:{
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;