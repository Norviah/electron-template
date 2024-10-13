import { cn } from '@frontend/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md border border-border bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
