import axios from 'axios';
import { commented, resetError, setBlog, setBlogs, setBlogsByCategory, setCatagories, setError, setLoading } from '../slices/blogs.js';

export const getBlogs = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axios.get("/api/blogs");
        dispatch(setBlogs(data));
    } catch (error) {
        dispatch(
          setError(
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
            ? error.message
            : "An Unexpected Error Has Occured. Please try again later."
        )
      );
    }
};


export const getBlog = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
      const {data} = await axios.get(`/api/blogs/${id}`);
      dispatch(setBlog(data));
  } catch (error) {
      dispatch(
          setError(
              error.response && error.response.data.message 
              ?error.response.data.message
              : error.message 
              ?error.message
              : 'An unexpected error has occered, Please try again later'
          )
      );
  }
}

//getCategories
export const getCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {data} = await axios.get('api/blogs/categories');
    dispatch(setCatagories(data));
  } catch (error) {
    dispatch(
      setError(
          error.response && error.response.data.message 
          ?error.response.data.message
          : error.message 
          ?error.message
          : 'An unexpected error has occered, Please try again later'
      )
    );
  }
}

//getBlogsByCategory
export const getBlogsByCategory = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
      const { data } = await axios.get(`api/blogs/?category=${category}`);
      //console.log(data);
      dispatch(setBlogsByCategory(data));
  } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message 
          ? error.message
          : "An Unexpected Error Has Occured. Please try again later."
      )
    );
  }
};

//comment
export const createBlogCommnet = (blogId, name, email, commentText) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        if(name===""){
            name="Anonymous";
        }
        console.log(name);
        console.log(email);
        console.log(blogId);
        const { data } = await axios.post(`/api/blogs/comments/${blogId}`, { name, email, commentText });
        dispatch(commented());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
    }
  };
  

export const resetBlogError = () => async (dispatch) => {
    dispatch(resetError());
};
