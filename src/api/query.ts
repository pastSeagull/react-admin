import type { TUser } from '@/types';

import { useQuery } from '@tanstack/react-query';

import { getInfo, mockFetchUserInfo } from '.';

export function useCurrentUserInfo() {
  return useQuery<TUser, any>(['current-user'], () => {
    return mockFetchUserInfo();
  });
}

export const useGetInfo = () =>  useQuery<any, any>(['get-info'], () => getInfo());
