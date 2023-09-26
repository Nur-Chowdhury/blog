import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
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
    },
})

export const {setLoading, setError, setBlogs, setBlog} = blogSlice.actions;
export default blogSlice.reducer;

export const blogsSelector = (state) => state.blogs;
