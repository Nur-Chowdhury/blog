import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  adminInfo: JSON.parse(localStorage.getItem('adminInfo')) ??null,
};

export const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading= true;
        },
        adminLogin: (state, {payload}) => {
            state.adminInfo = payload;
            state.loading = false;
            state.error = null;
        },
        adminLogout: (state) => {
            state.loading = false;
            state.error = null;
            state.adminInfo = null;
        },
        setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        },
    },
})

export const {setLoading, setError, adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
