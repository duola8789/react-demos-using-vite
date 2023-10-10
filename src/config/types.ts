import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface ComRegister {
  name: string;
  path: string;
  icon?: React.ReactNode;
  component?: React.ElementType;
  hideInMenu?: boolean;
  children?: ComRegisterChild[];
}

export interface ComRegisterChild {
  name: string;
  path: string;
  component: React.ElementType;
}

export interface RouteConfig {
  path: string;
  component: React.FC<RouteComponentProps>;
}
