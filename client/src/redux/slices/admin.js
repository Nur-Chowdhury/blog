import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    error: null,
    userList: null,
    userRemoval: false,
    removedUser:null,
    subList: null,
    subRemoval: false,
    removedSubscriber: null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        },
        getUsers: (state, {payload}) => {
            state.userList = payload;
            state.error = null;
            state.loading = false;
        },
        userDelete: (state, {payload}) => {
            state.userRemoval = true;
            state.error = null;
            state.loading = false;
            state.removedUser = payload
        },
        resetError: (state) => {
            state.error = null;
            state.loading = false;
            state.userRemoval = false;
        },
        getSubs: (state, {payload}) => {
            state.subList = payload;
            state.error = null;
            state.loading = false;
        },
        subDelete: (state, {payload}) => {
            state.subRemoval = true;
            state.error = null;
            state.loading = false;
            state.removedSubscriber = payload
        },
    }
});

export const {setLoading, setError, subDelete, getUsers, userDelete, getSubs, resetError} = adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;