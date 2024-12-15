import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { config } from '../../config';

const BASE_URL = `${config.apiURL}/strateger/strategies`

const getStrategies = async (skip = 0, limit = 10) => {
  const response = await axios.get(`${BASE_URL}/list`, { params: { skip, limit } });
  return response.data;
};

const getStrategy = async (strategyId) => {
  const response = await axios.get(`${BASE_URL}/get/${strategyId}`);
  return response.data;
};

const createStrategy = async (strategy) => {
  const response = await axios.post(`${BASE_URL}/insert`, strategy);    
  return response.data;
};

const updateStrategy = async (strategyId, strategy) => {
  const response = await axios.put(`${BASE_URL}/update/${strategyId}`, strategy);
  return response.data;
};

const deleteStrategy = async (strategyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${strategyId}`);
    if (response.status === 200) {
      return strategyId;
    } else {
      throw new Error('Failed to delete the strategy');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const fetchStrategies = createAsyncThunk('strategies/fetchStrategies', async ({ skip, limit }) => {
  return await getStrategies(skip, limit);
});

export const fetchStrategy = createAsyncThunk('strategies/fetchStrategy', async (strategyId) => {
  return await getStrategy(strategyId);
});

export const saveStrategy = createAsyncThunk('strategies/saveStrategy', async (strategy) => {
  if (strategy.id) {
    return await updateStrategy(strategy.id, strategy);
  } else {
    return await createStrategy(strategy);
  }
});

export const removeStrategy = createAsyncThunk('strategies/removeStrategy', async (strategyId, { rejectWithValue }) => {
  try {
    return await deleteStrategy(strategyId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});