import ReactDOM from 'react-dom/client';

import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { StrictMode } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeSelector } from './components/ThemeSelector';

import './base.css';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{' '}
        <Link to='/about' className='[&.active]:font-bold text-primary'>
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className='p-2'>
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return (
      <div className='p-2'>
        <div className='space-y-2'>
          <ThemeSelector />

          {/* const ipcHandle = (): void => window.electron.ipcRenderer.send('ping') */}

          <button
            className='bg-card p-3'
            type='button'
            onClick={() => {
              window.electron.ipcRenderer.send('ping');
            }}
          >
            ping
          </button>
        </div>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

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
