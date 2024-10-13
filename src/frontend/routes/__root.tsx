import { Link } from '@frontend/components/Link';
import { TitleBar } from '@frontend/components/TitleBar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <TitleBar />

      <div className='container space-y-10 pt-14 py-5 text-foreground-light'>
        <div className='space-x-2'>
          <Link to='/' className='[&.active]:text-foreground'>
            Home
          </Link>

          <Link to='/about' className='[&.active]:text-foreground'>
            About
          </Link>

          <Link to='/demo' className='[&.active]:text-foreground'>
            Demo
          </Link>
        </div>

        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});
