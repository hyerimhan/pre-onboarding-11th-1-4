import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const GETSEARCH = async (params?: string) => {
  const response = await instance(`/sick?q=${params}`);
  return response;
};
