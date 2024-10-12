import ReactDOM from 'react-dom/client';

import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { ThemeProvider } from './components/ThemeProvider';

import { routeTree } from './routeTree.gen';

import './globals.css';

export const router = createRouter({
  routeTree,
  history: createMemoryHistory({
    initialEntries: ['/'],
  }),
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
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
}
