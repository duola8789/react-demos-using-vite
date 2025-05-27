import React from 'react';
import { RouteObject, Outlet } from 'react-router';
import { ComRegister } from '@/config/types';
import { GithubOutlined } from '@ant-design/icons';
import Home from '@/pages/home';
import NotFount from '@/pages/404';
const App = React.lazy(() => import('@/app'));
const AiToolbox = React.lazy(() => import('@/pages/netease/ai-toolbox'));
const WaterFall = React.lazy(() => import('@/pages/netease/waterfall'));
const TextRoll = React.lazy(() => import('@/pages/netease/text-roll'));
const Tailwind = React.lazy(() => import('@/pages/others/tailwind'));

export const ROUTE_CONFIG: ComRegister[] = [
  { label: '首页', key: '/', hideInMenu: true, component: <Home /> },
  {
    label: '业务Demo',
    icon: <GithubOutlined />,
    key: '/netease',
    component: <Outlet />,
    children: [
      { label: '瀑布流', key: '/netease/waterfall', component: <WaterFall /> },
      { label: 'AiToolbox', key: '/netease/ai-toolbox', component: <AiToolbox /> },
      { label: '文字滚动', key: '/netease/text-roll', component: <TextRoll /> }
    ]
  },
  {
    label: '其他Demo',
    icon: <GithubOutlined />,
    key: '/others',
    component: <Outlet />,
    children: [{ label: 'TailwindCSS', key: '/others/tailwind', component: <Tailwind /> }]
  },
  { label: '404', key: '*', hideInMenu: true, component: <NotFount /> }
];

export const FULL_ROUTE_CONFIG: ComRegister[] = [
  {
    key: '/',
    component: <App />,
    label: '',
    children: ROUTE_CONFIG
  }
];

export const MENU_CONFIG: ComRegister[] = ROUTE_CONFIG.filter(v => !v.hideInMenu).map(v => ({
  ...v,
  children: Array.isArray(v.children)
    ? v.children.map(child => ({
        ...child,
        key: child.key
      }))
    : []
}));

const _renderRoutes = (routes: ComRegister[]): RouteObject[] =>
  routes.map(route => {
    const fullPath = route.key;
    const children = route.children && route.children.length > 0 ? _renderRoutes(route.children) : undefined;
    return {
      path: fullPath,
      element: route.component,
      children
    };
  });

export const routes = _renderRoutes(FULL_ROUTE_CONFIG);
