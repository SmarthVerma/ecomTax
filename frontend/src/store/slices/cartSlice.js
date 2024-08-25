import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Async thunks
export const fetchCartItems = createAsyncThunk(
    "fetchCartItems",
    async (_, { getState }) => {
        const url = `/api/v1/products/cart/items`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching cart items');
            throw error;
        }
    }
);

export const addCartItem = createAsyncThunk(
    "addCartItem",
    async ({ productId, amount }, { dispatch }) => {
        const input = { amount };
        const url = `/api/v1/products/cart/add/${productId}`;
        try {
            const response = await axios.post(url, input);
            dispatch(fetchCartItems()); // Fetch updated cart after adding item
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding to cart');
            throw error;
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    "deleteCartItem",
    async ({ productId }, { dispatch }) => {
        const url = `/api/v1/products/cart/delete/${productId}`;
        try {
            const response = await axios.delete(url);
            dispatch(fetchCartItems()); // Fetch updated cart after deleting item
            return response.data.data;
        } catch (error) {
            console.log('this is the error in slice ', error)
            toast.error(error.response?.data?.message || 'Error deleting from cart');
            throw error;
        }
    }
);

// Initial state
const initialState = {
    isLoading: false,
    isError: false,
    cartData: null,
    totalItems: 0,
};

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartData = action.payload.cartData;
                state.totalItems = action.payload.totalItems;
                state.isError = false;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                toast.error('Error fetching cart items');
                state.isError = true;
            })
    }
});

export default cartSlice.reducer;

