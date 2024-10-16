import ReactDOM from 'react-dom/client';

import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ToastProvider } from './components/ToastProvider';

import { routeTree } from './routeTree.gen';

import './globals.css';

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element found');
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme='system' storageKey='theme'>
        <RouterProvider router={router} />
      </ThemeProvider>

      <ToastProvider />
    </StrictMode>,
  );
}
