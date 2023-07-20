import axios, { AxiosError } from 'axios';
import { getCacheStorage, setCacheStorage } from 'utils/cacheStorage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const GETSEARCH = async (searchValue?: string) => {
  const cacheName = `cache_${searchValue}`;
  const URL = `${process.env.REACT_APP_BASE_URL}/sick?q=${searchValue}`;

  if (searchValue) {
    try {
      const cachedData = await getCacheStorage(cacheName, URL);
      if (cachedData) {
        return cachedData;
      }
      const { data } = await instance.get('/sick', {
        params: { q: searchValue },
      });
      await setCacheStorage(cacheName, URL, data);
      console.info('calling api');
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response;
      }
      console.error('Error while searching for keyword:', error);
      return { data: [] };
    }
  } else [];
};

export default GETSEARCH;
