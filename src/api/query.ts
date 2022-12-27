import { useQuery } from '@tanstack/react-query';

import { getInfo, getRouters } from '.';

export const useGetInfo = () =>  useQuery<any, any>(['get-info'], () => getInfo());

export const useGetRouters = () => useQuery<any, any>(['get-router'], () => getRouters());
