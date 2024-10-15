import { cn } from '@frontend/lib/utils';
import { Link as BaseLink } from '@tanstack/react-router';

import type { LinkProps as BaseLinkProps } from '@tanstack/react-router';
import type { RequireExactlyOne } from 'type-fest';

type LinkProps = RequireExactlyOne<
  {
    to: NonNullable<BaseLinkProps['to']> | `http${'s' | ''}://${string}`;
    className?: string;
    text: React.ReactNode;
    children: React.ReactNode;
  } & Omit<BaseLinkProps, 'to'>,
  'children' | 'text'
>;

/**
 * A versatile link component for internal and external navigation.
 *
 * @example
 *
 * ```tsx
 * <div>
 *   Eiusmod officia ex veniam cillum magna commodo esse ex
 *   <Link to="/about" text="excepteur" /> do cupidatat aute.
 * </div>
 * ```
 *⠀
 * ```tsx
 * <Link to="https://google.com">
 *   <img ... />
 * </Link>
 * ```
 */
export function Link({ className, text, children, to, ...props }: LinkProps): JSX.Element {
  let Component: 'a' | typeof BaseLink;

  if (to.startsWith('/')) {
    Component = BaseLink;
  } else {
    Component = 'a';
  }

  const render = text ?? children;

  return (
    <Component
      to={Component === 'a' ? undefined : (to as BaseLinkProps['to'])}
      href={Component === 'a' ? to : undefined}
      className={cn(
        typeof render === 'string' &&
          'text-foreground-light underline underline-offset-4 transition-colors hover:text-foreground',
        className,
      )}
      target={to.startsWith('http') ? 'noreferrer' : undefined}
      {...props}
    >
      {render}
    </Component>
  );
}
