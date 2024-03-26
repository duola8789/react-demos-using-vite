import React from 'react';

import { ComRegister, RouteConfig } from '@/config/types';
import { GithubOutlined } from '@ant-design/icons';
import Home from '@/pages/home';
import NotFount from '@/pages/404';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const AiToolbox = React.lazy(() => import('@/pages/netease/ai-toolbox'));
const WaterFall = React.lazy(() => import('@/pages/netease/waterfall'));
const TextRoll = React.lazy(() => import('@/pages/netease/text-roll'));

export const FULL_ROUTE_CONFIG: ComRegister[] = [
  { label: '首页', key: '/', hideInMenu: true, component: Home },
  {
    label: '业务Demo',
    icon: <GithubOutlined />,
    key: '/demos',
    children: [
      { label: '瀑布流', key: '/waterfall', component: WaterFall },
      { label: 'AiToolbox', key: '/ai-toolbox', component: AiToolbox },
      { label: '文字滚动', key: '/text-roll', component: TextRoll }
    ]
  },
  { label: '404', key: '*', hideInMenu: true, component: NotFount }
];

export const ROUTES_CONFIG: RouteConfig[] = FULL_ROUTE_CONFIG.reduce((total, current) => {
  let route: RouteConfig[] = [];
  if (current.children) {
    route = current.children.map(child => ({
      path: `${current.key}${child.key}`,
      component: _params => <child.component />
    }));
  }
  if (current.component) {
    route.push({
      path: current.key,
      component: _params => (current.component ? <current.component /> : <></>)
    });
  }
  return total.concat(route);
}, [] as RouteConfig[]);

export const MENU_CONFIG: ComRegister[] = FULL_ROUTE_CONFIG.filter(v => !v.hideInMenu).map(v => ({
  ...v,
  children: Array.isArray(v.children)
    ? v.children.map(child => ({
        ...child,
        key: `${v.key}${child.key}`
      }))
    : []
}));
