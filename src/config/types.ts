import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface ComRegister {
  label: string;
  key: string;
  icon?: React.ReactNode;
  component?: React.ElementType;
  hideInMenu?: boolean;
  children?: ComRegisterChild[];
}

export interface ComRegisterChild {
  label: string;
  key: string;
  component: React.ElementType;
}

export interface RouteConfig {
  path: string;
  component: React.FC<RouteComponentProps>;
}
