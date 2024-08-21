import { useAllProducts } from '@/hooks/general/useAllProducts';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    currentPage: 1,
    totalProducts: 0,
    noOfProducts: 0,
    productLimit: 6,
    totalPage: 0,
    products: null
};

const paginSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        storeTotalProducts: (state, action) => {
            state.totalProducts = action.payload
        },
        storeProductLimit: (state, action) => {
            state.productLimit = action.payload
        },
        storeProducts: (state, action) => {
            state.products = action.payload
        },
        storePage: (state, action) => {
            state.page = action.payload
        },
        nextPage: (state, action) => {
            useAllProducts({ page: state.page + 1 })
        }
    }
});

export const { storeTotalProducts, storeProductLimit, storeProducts, nextPage, storePage } = paginSlice.actions;
export default paginSlice.reducer;