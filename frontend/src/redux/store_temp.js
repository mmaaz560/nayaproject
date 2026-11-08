import { configureStore } from "@reduxjs/toolkit";
import postReducer from './postSlice'
// import userReducer from '../redux/user/usersSlice'

export const store = configureStore({
    reducer: {
        post: postReducer,

    },
});