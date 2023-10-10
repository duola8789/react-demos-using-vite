import React from 'react';

import { ComRegister, RouteConfig } from '@/config/types';
import { GithubOutlined } from '@ant-design/icons';
import Home from '@/pages/Home';
import NotFount from '@/pages/404';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const DnD = React.lazy(() => import('@/pages/DnD'));
const WaterFall = React.lazy(() => import('@/pages/WaterFall'));

const FULL_ROUTE_CONFIG: ComRegister[] = [
  {
    name: '首页',
    path: '/',
    hideInMenu: true,
    component: Home
  },
  {
    name: '业务Demo',
    icon: <GithubOutlined />,
    path: '/demos',
    children: [
      {
        name: 'DnD',
        path: '/dnd',
        component: DnD
      },
      {
        name: '瀑布流',
        path: '/waterfall',
        component: WaterFall
      }
    ]
  },
  {
    name: '404',
    path: '*',
    hideInMenu: true,
    component: NotFount
  }
];

export const ROUTES_CONFIG: RouteConfig[] = FULL_ROUTE_CONFIG.reduce((total, current) => {
  let route: RouteConfig[] = [];
  if (current.children) {
    route = current.children.map(child => ({
      path: `${current.path}${child.path}`,
      component: _params => <child.component />
    }));
  }
  if (current.component) {
    route.push({
      path: current.path,
      component: _params => (current.component ? <current.component /> : <></>)
    });
  }
  return total.concat(route);
}, [] as RouteConfig[]);

export const MENU_CONFIG: Array<ItemType & { path: string }> = FULL_ROUTE_CONFIG.filter(v => !v.hideInMenu).map(v => {
  return {
    label: v.name,
    icon: v.icon,
    key: v.path,
    path: v.path,
    children: Array.isArray(v.children)
      ? v.children.map(child => ({
          label: child.name,
          key: `${v.path}${child.path}`
        }))
      : []
  };
});
