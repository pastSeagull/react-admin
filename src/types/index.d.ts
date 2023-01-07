export type TUser = {
  id: number;
  name: string;
  logo?: string;
};

export type TUniversal<T> = {
  code: number;
  data?: T;
  msg: string;
}

export interface TRouter {
  component: string;
  hidden: boolean;
  key: string;
  label: string;
  name: string;
  redirect: string;
  children?: TRouter[];
}
