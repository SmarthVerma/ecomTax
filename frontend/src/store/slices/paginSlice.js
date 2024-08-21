import { useAllProducts } from '@/hooks/general/useAllProducts';
import { productLimit } from '@/util/productLimit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';



const initialState = {
    page : 1,
    totalProducts: 0,
    productLimit: 6
};

const paginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeTotalProd: (state, action) => {
            state.totalProducts = action.payload
        },
        storeProductLimit: (state, action) => {
            console.log('reach here?')
            state.productLimit = action.payload
        }, 
        nextPage: (state, action) => {
            useAllProducts({page: state.page + 1})
        }
    }
});

export const { storeTotalProd, storeProductLimit, nextPage } = paginSlice.actions;
export default paginSlice.reducer;