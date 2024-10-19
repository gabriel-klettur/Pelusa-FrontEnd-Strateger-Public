import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import config from '../../config';

const BASE_URL = `${config.apiURL}/strateger/diary`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${BASE_URL}/upload_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.file_url;
  } catch (error) {
    console.error("Error uploading file:", error.response || error.message);
    throw error;
  }
};

export const uploadImages = createAsyncThunk('diary/uploadImages', async (files) => {
  const uploadPromises = files.map(file => uploadFile(file));
  return await Promise.all(uploadPromises);
});

export const fetchDiaryEntries = createAsyncThunk('diary/fetchDiaryEntries', async ({ skip, limit }) => {
  const response = await axios.get(`${BASE_URL}/list`, { params: { skip, limit } });
  return response.data;
});

export const saveDiaryEntry = createAsyncThunk('diary/saveDiaryEntry', async (entry) => {
  console.log('saveDiaryEntry called with:', entry);
  if (entry.id && entry.id !== '') {
    const response = await axios.put(`${BASE_URL}/update/${entry.id}`, entry);
    return response.data;
  } else {
    const response = await axios.post(`${BASE_URL}/insert`, entry);
    return response.data;
  }
});

export const removeDiaryEntry = createAsyncThunk('diary/removeDiaryEntry', async (entryId, { rejectWithValue }) => {
  console.log('removeDiaryEntry called with id:', entryId);
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${entryId}`);
    if (response.status === 200) {
      return entryId;
    } else {
      throw new Error('Failed to delete the diary entry');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});