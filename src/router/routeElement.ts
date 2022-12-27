import { lazy } from "react";

export const routeElement = [
  {
    path: 'user',
    element: lazy(() => import('@/views/UsersView'))
  }
];
