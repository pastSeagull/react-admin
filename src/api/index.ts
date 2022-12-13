import type { TUser } from '@/types';

import { request } from '@/utils/request';

export function getUser() {
  return request<TUser>({
    url: '/user',
  });
}

export const login = (data: { username: string; password: string }) =>
  request<any>({ url: '/login', method: 'post', data });

export const getInfo = () => request<any>({ url: '/getInfo', method: 'get' });

export const logout = () => request<any>({ url: '/logout', method: 'get' });
