import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router, RouteComponentProps } from '@reach/router';
import App from './app';

import '@/styles/reset.css';
import '@/styles/common.css';

const AppInRouter = (_props: RouteComponentProps) => <App />;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router style={{ height: '100%' }}>
    <AppInRouter default />
  </Router>
);
