import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchInfo = createAsyncThunk("fetchInfo", async () => {
    const url = "/api/v1/user/profile"
    console.log('Running createAsync',)
    try {
        const response = await axios.get(url);
        console.log('useFetched successful:', response.data);

        toast.success('Welcome ' + response.data.data.fullName)
        return response.data
    } catch (error) {
        toast.error(error.response.data.message)
        throw error
    }
})


const initialState = {
    authStatus: false,
    data: null,
    isLoading: false,
    isError: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchInfo.pending, (state, action) => {
            state.isLoading = true
            state.data = null
            state.authStatus = false
            state.isError = false
        }).addCase(fetchInfo.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.authStatus = true
            state.isError = false
        }).addCase(fetchInfo.rejected, (state, action) => {
            console.log('Error in slice', action.error.message)
            state.isLoading = false,
                state.data = null,
                state.authStatus = false
            state.isError = true;
        })
    }
});

export default userSlice.reducer;