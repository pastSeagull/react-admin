import type { TRouter, TUniversal } from "@/types";

import type { TUserInfo } from "@/types/user";

import { useQuery } from '@tanstack/react-query';

import { getInfo, getRouters } from '.';

export const useGetInfo = () =>  useQuery<TUserInfo>(['get-info'], () => getInfo());

export const useGetRouters = () => useQuery<TUniversal<TRouter>>(['get-router'], () => getRouters());
