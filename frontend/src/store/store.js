import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import paginReducer from "./slices/paginSlice";
import cartReducer from "./slices/cartSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        pagin: paginReducer,
        cart: cartReducer,
    }
})

export default store;