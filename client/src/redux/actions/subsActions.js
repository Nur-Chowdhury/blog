import axios from 'axios';
import { setError, setLoading, subsReg } from '../slices/subs';
 
export const subscribe = (email) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post('/api/subscribe', {email}, config);
      dispatch(subsReg(data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
    }
  };