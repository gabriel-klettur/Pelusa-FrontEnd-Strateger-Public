import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

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