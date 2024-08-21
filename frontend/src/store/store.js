import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import paginReducer from "./slices/paginSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        pagin: paginReducer
    }
})

export default store;