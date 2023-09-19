import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    comment: {type: String, required: true},
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
    },
    blogIsNew:{
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;