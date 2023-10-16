import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
  blogUpdate: false,
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
        resetError: (state) => {
            state.error = null;
            state.reviewSend = false;
            state.productUpdate = false;
            state.reviewRemoval = false;
        },
    },
}) 

export const {setLoading, setError, resetError, setBlogs, setBlog, setBlogUpdateFlag} = blogSlice.actions;
export default blogSlice.reducer;

export const blogsSelector = (state) => state.blogs;
