import { createSlice } from '@reduxjs/toolkit';

import { runBacktest } from './backtestingThunks';

const backtestingSlice = createSlice({
    name: 'backtesting',
    initialState: {
        result: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(runBacktest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(runBacktest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            })
            .addCase(runBacktest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default backtestingSlice.reducer;
