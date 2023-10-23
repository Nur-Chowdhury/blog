import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
  blogUpdate: false,
  commentSend: false,
  categories: [],
  blogsByCategory: [],
}; 

export const blogSlice = createSlice({
    name: 'Blogs',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading= true;
        },
        setBlogs: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.blogs = payload;
        },
        setBlog: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.blog = payload;
        },
        setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        },
        setBlogUpdateFlag: (state) => {
            state.blogUpdate = true;
            state.loading = false;
        },
        commented: (state) => {
            state.loading = false;
            state.error = null;
            state.commentSend = true;
        },
        setCatagories: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.categories = payload;
        },
        setBlogsByCategory: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.blogsByCategory = payload;
        },
        resetError: (state) => {
            state.error = null;
            state.reviewSend = false;
            state.blogUpdate = false;
            state.reviewRemoval = false;
        },
    },
}) 

export const {setLoading, setBlogsByCategory, setCatagories, setError, resetError, setBlogs, setBlog, commented, setBlogUpdateFlag} = blogSlice.actions;
export default blogSlice.reducer;

export const blogsSelector = (state) => state.blogs;
