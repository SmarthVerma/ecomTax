import { productLimit } from '@/util/productLimit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Async thunk to fetch products
export const storeProductData = createAsyncThunk(
    "storeProductData",
    async ({ keyword }, { getState }) => {

        const state = getState() // // Access the current Redux state here
        const page = state.pagin.currentPage
        const prodLimit = state.pagin.productLimit
        console.log({ prodLimit, page })
        const url = `/api/v1/products/all?keyword=${keyword || ''}&limit=${prodLimit}&page=${page}`;
        console.log({ url })
        try {
            const response = await axios.get(url);
            const data = response.data.data;
            console.log('Product Stored:', data);

            return data;
        } catch (error) {
            toast.error(error.response.data.message);
            throw error;
        }
    });

// Initial state
const initialState = {
    isLoading: true,
    isError: false,
    currentPage: 1,
    totalProducts: null,
    noOfProducts: null,
    productLimit: productLimit(),
    totalPage: null,
    productData: null
};

// Pagination slice
const paginSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        pageChange: (state, action) => {
            if (action.payload) state.currentPage = action.payload;
            console.log('this is the currentPage in slice', state.currentPage)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(storeProductData.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(storeProductData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalProducts = action.payload.totalProducts;
                state.productData = action.payload.products;
                state.noOfProducts = action.payload.noOfProducts;

                const noOfPages = Math.ceil(state.totalProducts / state.productLimit);
                state.totalPage = noOfPages; // no need of another reducer
            })
            .addCase(storeProductData.rejected, (state, action) => {
                console.log('Error in slice', action.error.message);
                state.isLoading = false;
                state.isError = true;
            });
    }
});

// *** Combination of paginSlice and AsynchThunk
export const fetchProductsForPage = ({ keyword, page },) => (dispatch, getState) => {
    console.log('is this working? yayy!!', { keyword, page })
    const state = getState()
    dispatch(pageChange(page))
    dispatch(storeProductData({ keyword }))
};

export const { pageChange } = paginSlice.actions;
export default paginSlice.reducer;