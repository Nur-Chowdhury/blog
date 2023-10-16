import axios from 'axios';
import { setError, setLoading, userLogin } from '../slices/user.js';

export const login = (name, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const {data} = await axios.post('/api/users/login', {name, password}, config);
        dispatch(userLogin(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
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

