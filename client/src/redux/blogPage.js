import { combineReducers, configureStore } from '@reduxjs/toolkit';
import admin from './slices/admin';
import blogs from './slices/blogs';
import subs from './slices/subs';
import user from './slices/user';

const reducer = combineReducers({
    blogs,
    user,
    subs,
    admin,
});

export default configureStore({
    reducer,
});