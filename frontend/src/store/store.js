import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice/productSlice'

const store = configureStore({
    reducer: {
        product: productReducer
    }
})

export default store;