import axios from 'axios';
import { setError, setLoading, subsReg } from '../slices/subs';

export const sub = (email) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.post('/api/sub/subs', {email}, config);
        dispatch(subsReg(data));
    } catch (error) {
        dispatch(
            setError(
              error.response && error.response.data.message 
              ? error.response.data.message 
              : error.message 
              ? error.message
              : "An Unexpected Error Has Occured. Please try again later."
          )
        )
    }
}