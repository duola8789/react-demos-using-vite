import React from 'react';

export interface ComRegister {
  label: string;
  key: string;
  icon?: React.ReactNode;
  component: React.ReactElement;
  hideInMenu?: boolean;
  children?: ComRegister[];
}

export interface RouteConfig {
  path: string;
  component: React.FC;
}

export interface IRouteItem {
  path: string;
  element: React.ReactElement;
  errorElement?: React.ReactElement;
  children?: IRouteItem[];
}
