import axios from 'axios';
import { adminLogin, setError, setLoading } from '../slices/admin';

export const login = (name, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.post('/api/admins/login', {name, password}, config);
        dispatch(adminLogin(data));
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