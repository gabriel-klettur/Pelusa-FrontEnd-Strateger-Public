
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';
import { adjustDates } from './utils';
import { formatDataFetching } from './utils';


  export const fetchCandlestickChartData = createAsyncThunk(
    'candlestickChart/fetchCandlestickChartData',
    async ({ interval = '5m', startDate, endDate, ticker = 'BTC-USDT' }, { rejectWithValue }) => {
      try {        
        
        //! ----------------- Adjust Dates -----------------
        const { interval: adjustedInterval, expandedStartDate, expandedEndDate } = adjustDates(
          interval,
          startDate,
          endDate
        );
  
        //! ----------------- API CALL ----------------- 
        const response = await axios.get(`${config.apiURL}/bingx/main/get-k-line-data`, {
          params: {
            symbol: ticker,
            interval: adjustedInterval,
            limit: "1440",
            start_date: expandedStartDate.toISOString().slice(0, 19).replace('T', ' '),
            end_date: expandedEndDate.toISOString().slice(0, 19).replace('T', ' ')
          }
        });
        
        //! ----------------- Format Data -----------------
        const formatedResponse = formatDataFetching({response});

        return formatedResponse;

      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );