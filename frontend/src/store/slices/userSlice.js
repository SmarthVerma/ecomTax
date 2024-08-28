// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async () => {
        const response = await axios.get('/api/v1/user/profile');
        return response.data.data;
    }
);

// Initial state for the user slice
const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;