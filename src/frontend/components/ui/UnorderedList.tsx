import { cn } from '@frontend/lib/utils';

export type UnorderedListProps = JSX.IntrinsicElements['ul'];

export function UnorderedList({ className, ...props }: UnorderedListProps): JSX.Element {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {props.children}
    </ul>
  );
}
