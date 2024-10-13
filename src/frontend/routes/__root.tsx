import { Link } from '@frontend/components/Link';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    // <>
    //   <div className='p-2 flex gap-2'>
    //     <Link to='/' className='[&.active]:font-bold'>
    //       Home
    //     </Link>{' '}
    //     <Link to='/about' className='[&.active]:font-bold'>
    //       About
    //     </Link>
    //     <Link to='/demo' className='[&.active]:font-bold'>
    //       Demo
    //     </Link>
    //   </div>
    //   <hr />
    //   <div className='container'>
    //     <Outlet />
    //   </div>
    //   <TanStackRouterDevtools />
    // </>

    <div className='container space-y-10 py-5 text-foreground-light'>
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
  ),
});
