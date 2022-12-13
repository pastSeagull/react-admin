import { useQuery } from '@tanstack/react-query';

import { getInfo } from '.';

export const useGetInfo = () =>  useQuery<any, any>(['get-info'], () => getInfo());
