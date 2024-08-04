import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

// Acción asíncrona para ejecutar el backtesting
export const runBacktest = createAsyncThunk('backtesting/runBacktest', async (backtestData) => {
    const response = await axios.get(`${config.apiURL}/strateger/backtesting/stochastic-ta-v1`, {
        params: {
            symbol: backtestData.symbol,
            intervals: backtestData.interval,
            start_date: backtestData.startDate,
            end_date: backtestData.endDate,
            initial_balance: backtestData.initialBalance,
            enable_long: backtestData.enable_long,
            enable_short: backtestData.enable_short,
        },
    });
    return response.data;
});

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

// Selectores
export const selectBacktestingResult = (state) => state.backtesting.result;
export const selectBacktestingStatus = (state) => state.backtesting.status;
export const selectBacktestingError = (state) => state.backtesting.error;

export default backtestingSlice.reducer;
