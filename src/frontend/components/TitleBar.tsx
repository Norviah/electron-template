import { cn } from '@frontend/lib/utils';
import { MinusIcon, SquareIcon, XIcon } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export function TitleBar(): JSX.Element {
  const buttons: (React.HTMLProps<HTMLDivElement> & {
    icon: LucideIcon;
    mutation: () => void;
  })[] = [
    {
      mutation: () => window.api.window.minimize(),
      icon: MinusIcon,
    },
    {
      mutation: () => window.api.window.maximize(),
      icon: SquareIcon,
    },
    {
      mutation: () => window.api.window.close(),
      icon: XIcon,
      className: 'hover:text-destructive-foreground hover:bg-destructive',
    },
  ];

  return (
    <div className='flex w-full justify-end' id='drag'>
      <div className='flex flex-row items-center gap-2 text-foreground-light' id='no-drag'>
        {buttons.map(({ className, mutation, icon: Icon, ...props }, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-row items-center gap-2 p-3 text-foreground-light hover:bg-muted',
              className,
            )}
            onClick={mutation}
            onKeyDown={mutation}
            {...props}
          >
            <Icon className='size-4' />
          </div>
        ))}
      </div>
    </div>
  );
}
