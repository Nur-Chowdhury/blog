import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  subsInfo: null,
};

export const subsSlice = createSlice({
    name: 'Subscriber',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading= true;
        },
        subsReg: (state, {payload}) => {
            state.subsInfo = payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        },
    },
})

export const {setLoading, setError, subsReg } = subsSlice.actions;
export default subsSlice.reducer;

export const subsSelector = (state) => state.subs;
