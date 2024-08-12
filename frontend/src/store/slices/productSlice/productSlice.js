import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    totalProducts: 0,
    products: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        storeData: (state, action) => {
            state.totalProducts = action.payload.totalProducts
            state.products = action.payload.products
        }
    }
});

export const { storeData } = productSlice.actions
export default productSlice.reducer;