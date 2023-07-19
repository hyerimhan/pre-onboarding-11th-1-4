import axios from 'axios';
// import axios, { AxiosError } from 'axios';
// import { getCacheStorage, setCacheStorage } from 'utils/cacheStorage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const GETSEARCH = async (params?: string) => {
  const response = await instance.get(`/sick?q=${params}`);
  return response;
};

// interface ErrorResponse {
//   message: string;
// }

// export const GETSEARCH = async (searchValue?: string) => {
//   if (searchValue === '') [];
//   const cacheName = `cache_${searchValue}`;
//   const url = `${process.env.REACT_APP_BASE_URL}/sick?q=${searchValue}`;

//   const cachedData = await getCacheStorage(cacheName, url);

//   if (cachedData) await cachedData.json();

//   try {
//     const { data } = await instance.get('/sick', {
//       params: { q: searchValue },
//     });
//     console.info('calling api');
//     setCacheStorage(cacheName, url, data);
//     return data;
//   } catch (error) {
//     const axiosError = error as AxiosError<ErrorResponse>;
//     alert(axiosError.response?.data.message || '알 수 없는 오류가 발생했습니다.');
//     return [];
//   }
// };

export default GETSEARCH;
