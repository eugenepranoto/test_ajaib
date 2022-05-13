/* eslint-disable no-undef */
export const baseUrl = 'https://randomuser.me/api';
export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(baseUrl + path, {
    ...config
  });

  return await fetch(request)
    .then((response) => response.json())
    .then((data: T) => data)
    .catch((error) => error);
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'get', ...config };
  return await http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = { method: 'post', body: JSON.stringify(body), ...config };
  return await http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = { method: 'put', body: JSON.stringify(body), ...config };
  return await http<U>(path, init);
}

export async function _delete<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'delete', ...config };
  return await http<T>(path, init);
}
