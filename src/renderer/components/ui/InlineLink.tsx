import Link from 'next/link';

import { cn } from '@renderer/lib/utils';

import type { Route } from 'next';
import type { LinkProps } from 'next/link';

export type InlineLinkProps<Path extends string = string> = Omit<
  LinkProps<Route<Path>>,
  'href' | 'children'
> & {
  href: Route<Path> | string | undefined;
  text: string;
};

/**
 * A versatile link component that should be used within text for internal and
 * external navigation.
 *
 * @example
 * @template Path The target path for internal navigation.
 *
 * ```tsx
 * Eiusmod officia ex veniam cillum magna commodo esse ex
 * <InlineLink href="/about">excepteur</InlineLink> do cupidatat aute.
 * ```
 */
export function InlineLink<Path extends string = string>({
  className: newClassName,
  href,
  text,
  ...props
}: InlineLinkProps): JSX.Element {
  const className = cn(
    'text-foreground-light underline underline-offset-4 hover:text-foreground transition-colors',
    newClassName,
  );

  if (href?.startsWith('/')) {
    return (
      <Link href={href as Route<Path>} className={className} {...props}>
        {text}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...props}>
      {text}
    </a>
  );
}
