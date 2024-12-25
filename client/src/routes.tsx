import type { ComponentType, JSX } from 'react';

import { Home, Ico, Nft, Notifications, Earn } from './pages';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Home },
  { path: '/ico', Component: Ico },
  { path: '/nft', Component: Nft },
  { path: '/notifications', Component: Notifications },
  { path: '/earn', Component: Earn },
];