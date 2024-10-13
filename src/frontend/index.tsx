import ReactDOM from 'react-dom/client';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ToastProvider } from './components/ToastProvider';

import { queryClient, t, trpcClient } from '@shared/trpc/config';
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
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <t.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </t.Provider>
      </ThemeProvider>

      <ToastProvider />
    </StrictMode>,
  );
}
