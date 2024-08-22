'use client';

import Link from 'next/link';

import { IconButton } from '@/components/ui/Button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { MenuIcon } from 'lucide-react';

import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { routes } from './routes';

import type { HTMLAttributes } from 'react';

export function MobileMenu(props: HTMLAttributes<HTMLDivElement>): JSX.Element {
  const pathname = usePathname();

  return (
    <div {...props}>
      <Sheet>
        <SheetTrigger asChild>
          <IconButton icon={MenuIcon} />
        </SheetTrigger>

        <SheetContent side='left' className='w-[300px]'>
          <SheetHeader>
            <SheetTitle>
              <Link href='/'>
                <SheetClose>{siteConfig.name}</SheetClose>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div className='mt-10 flex flex-col gap-7'>
            {routes.map((item) => (
              <Link
                href={item.path}
                className={cn(
                  'text-sm transition-colors',
                  pathname === item.path ? 'text-foreground' : 'text-foreground/70',
                )}
                key={item.path}
              >
                <SheetClose className='flex flex-row gap-2'>
                  {item.icon && <item.icon className='h-5 w-5' />}
                  <p>{item.title}</p>
                </SheetClose>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
