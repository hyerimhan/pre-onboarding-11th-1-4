import { ISearch } from 'interface/search';

/** cache 저장된 시간 가져오기  */
export const getIsCacheExpired = (cacheResponse: Response) => {
  const cachedDate = cacheResponse.headers.get('fetch-date');

  if (!cachedDate) return;

  const fetchDate = new Date(cachedDate).getTime();
  const today = new Date().getTime();

  return today - fetchDate > 1000 * 60 * 1;
};

/** 저장된 cache 가져오기 */
export const getCacheStorage = async (cacheName: string, url: string) => {
  try {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
      if (!getIsCacheExpired(cachedResponse)) cachedResponse;
      await cacheStorage.delete(url);
      return null;
    }
    return null;
  } catch (error) {
    console.error('Error while getting data from cache:', error);
    return false;
  }
};

/** cache & 캐시 현재시간 저장 */
export const setCacheStorage = async (cacheName: string, url: string, data: ISearch[]) => {
  const cacheStorage = await caches.open(cacheName);
  const response = new Response(JSON.stringify(data));

  const cloneResponse = response.clone();
  const newBody = await cloneResponse.blob();
  const newHeaders = new Headers(cloneResponse.headers);
  newHeaders.append('fetch-date', new Date().toISOString());

  const newResponse = new Response(newBody, {
    status: cloneResponse.status,
    statusText: cloneResponse.statusText,
    headers: newHeaders,
  });

  if (url) cacheStorage.put(url, newResponse);
};
