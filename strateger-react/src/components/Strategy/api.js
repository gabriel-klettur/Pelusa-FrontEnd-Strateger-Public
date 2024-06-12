import axios from 'axios';

const BASE_URL = 'http://localhost:80/strateger';

export const getStrategies = async (skip = 0, limit = 10) => {
    const response = await axios.get(`${BASE_URL}/list`, { params: { skip, limit } });
    return response.data;
};

export const getStrategy = async (strategyId) => {
    const response = await axios.get(`${BASE_URL}/get/${strategyId}`);
    return response.data;
};

export const createStrategy = async (strategy) => {
    const response = await axios.post(`${BASE_URL}/insert`, strategy);
    return response.data;
};

export const updateStrategy = async (strategyId, strategy) => {
    const response = await axios.put(`${BASE_URL}/update/${strategyId}`, strategy);
    return response.data;
};

export const deleteStrategy = async (strategyId) => {
    const response = await axios.delete(`${BASE_URL}/delete/${strategyId}`);
    return response.data;
};
