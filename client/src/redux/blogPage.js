import { combineReducers, configureStore } from '@reduxjs/toolkit';
import admin from './slices/admin';
import blogs from './slices/blogs';

const reducer = combineReducers({
    blogs,
    admin,
});

export default configureStore({
    reducer,
});