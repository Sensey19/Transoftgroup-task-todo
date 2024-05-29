export const useApi = (url: string, params?: any): any => {
  const config = useRuntimeConfig();
  const token = useCookie('token');
  const refreshToken = useCookie('refreshToken');

  const opts: any = {
    key: url,
    baseURL: config.public.baseURL,
    onRequest({ options }: any): void {
      options.headers = options.headers || {};
      if (token.value) {
        options.headers.Authorization = `JWT ${token.value}`;
      }
    },
    onResponseError({ response }: any): void {
      if (response._data?.message) {
        console.dir(response._data.message);
      } else {
        console.dir(response._data);
      }

      if (response.status === 401 && refreshToken.value) {
        // code for when the token has expired
      }
    },
    ...params
  };

  return useFetch(url, opts);
};
