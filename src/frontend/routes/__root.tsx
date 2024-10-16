import { BreakpointIndicator } from '@frontend/components/BreakpointIndicator';
import { Link } from '@frontend/components/Link';
import { TitleBar } from '@frontend/components/TitleBar';
import { ScrollArea, ScrollBar } from '@frontend/components/ui/ScrollArea';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className='flex h-screen flex-col text-foreground-light'>
      <TitleBar />

      <ScrollArea className='flex-grow'>
        <div className='space-y-5 px-10 py-5'>
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

          {window.location.hostname === 'localhost' && (
            <>
              <TanStackRouterDevtools position='bottom-right' />
              <BreakpointIndicator />
            </>
          )}
        </div>

        <ScrollBar orientation='vertical' className='w-2' />
      </ScrollArea>
    </div>
  ),
});
