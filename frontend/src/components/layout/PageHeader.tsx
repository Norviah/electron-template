import Link from 'next/link';

import { ThemeSelector } from '@/components/ThemeSelector';
import { Logo } from '@/components/icons';
import { MobileMenu } from './MobileMenu';
import { NavItems } from './NavItems';

import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export type PageHeaderContainerProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export function PageHeaderContainer({
  className,
  ...props
}: PageHeaderContainerProps): JSX.Element {
  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-blur:bg-background/60',
        className,
      )}
    >
      {props.children}
    </header>
  );
}

export function PageHeader({
  className,
  ...props
}: Omit<PageHeaderContainerProps, 'children'>): JSX.Element {
  return (
    <PageHeaderContainer
      className={cn('container flex items-center justify-between py-4', className)}
      {...props}
    >
      <MobileMenu className='md:hidden' />

      <div className='hidden md:flex md:flex-row md:items-center md:gap-10'>
        <div className='flex flex-1'>
          <Link href='/' className='flex flex-row items-center gap-2 font-bold'>
            <Logo />
            <p>{siteConfig.name}</p>
          </Link>
        </div>

        <NavItems />
      </div>

      <div className='flex items-center gap-3 lg:flex-1 lg:justify-end'>
        <ThemeSelector />
      </div>
    </PageHeaderContainer>
  );
}
