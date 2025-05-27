import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { routes } from '@/config';

import '@/styles/common.css';

const router = createBrowserRouter(routes);
const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLDivElement).render(<RouterProvider router={router} />);
