import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Async thunks
export const fetchCartItems = createAsyncThunk(
    "fetchCartItems",
    async (_, { getState, dispatch }) => {
        const state = getState();
        const url = `/api/v1/products/cart/items`;
        try {
            console.log('Fetching cart items');
            const userExist = state.user.data;
            if (userExist) {
                console.log('EXIST!!!!!!',)
                const response = await axios.get(url);
                return response.data.data;
            } else {
                const cartData = localStorage.getItem('cartData');
                if (cartData) {
                    return JSON.parse(cartData);
                } else {
                    return { cartData: [], totalItems: 0 };
                }
            }
        } catch (error) {
            console.log('Error fetching cart items', error);
            toast.error(error.response?.data?.message || 'Error fetching cart items');
            throw error;
        }
    }
);

export const addCartItem = createAsyncThunk(
    "addCartItem",
    async ({ productId, amount }, { dispatch, getState }) => {
        const input = { amount };
        const url = `/api/v1/products/cart/add/${productId}`;
        const state = getState();
        try {
            const userExist = state.user.data;

            if (userExist) {
                const response = await axios.post(url, input);
                dispatch(fetchCartItems()); // Fetch updated cart after adding item
                toast.success("Successfully added");
                return response.data.data;
            } else {
                const cartData = localStorage.getItem('cartData');
                let updatedCartData;

                if (cartData) {
                    const parsedCartData = JSON.parse(cartData);
                    const existingItemIndex = parsedCartData.cartData.findIndex(item => item.productId === productId);

                    if (existingItemIndex >= 0) {
                        parsedCartData.cartData[existingItemIndex].amount = amount;
                    } else {
                        parsedCartData.cartData.push({ productId, amount });
                    }

                    parsedCartData.totalItems = parsedCartData.cartData.length;
                    updatedCartData = parsedCartData;
                } else {
                    updatedCartData = {
                        cartData: [{ productId, amount }],
                        totalItems: 1
                    };
                }

                localStorage.setItem('cartData', JSON.stringify(updatedCartData));
                return updatedCartData;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding to cart');
            throw error;
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    "deleteCartItem",
    async ({ productId }, { dispatch, getState }) => {
        const state = getState();
        const url = `/api/v1/products/cart/delete/${productId}`;
        try {
            const userExist = state.user.data;
            if (userExist) {
                const response = await axios.delete(url);
                dispatch(fetchCartItems()); // Fetch updated cart after deleting item
                return response.data.data;
            } else {
                const cartData = localStorage.getItem('cartData');
                if (cartData) {
                    const parsedCartData = JSON.parse(cartData);
                    const updatedCartData = {
                        cartData: parsedCartData.cartData.filter(item => item.productId !== productId),
                        totalItems: parsedCartData.cartData.filter(item => item.productId !== productId).length
                    };

                    localStorage.setItem('cartData', JSON.stringify(updatedCartData));
                    return updatedCartData;
                } else {
                    return { cartData: [], totalItems: 0 };
                }
            }
        } catch (error) {
            console.log('Error deleting from cart', error);
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
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
                toast.error('Error fetching cart items');
                state.isError = true;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.cartData = action.payload.cartData;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cartData = action.payload.cartData;
                state.totalItems = action.payload.totalItems;
            });
    }
});

export default cartSlice.reducer;