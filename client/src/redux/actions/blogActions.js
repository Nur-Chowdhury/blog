import axios from 'axios';
import { setBlog, setBlogs, setError, setLoading } from '../slices/blogs.js';

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
