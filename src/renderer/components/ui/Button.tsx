import { Slot } from '@radix-ui/react-slot';

import { cn } from '@renderer/lib/utils';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';
import { type LucideIcon, SearchIcon } from 'lucide-react';
import type { RequireExactlyOne } from 'type-fest';

import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        info: 'bg-info text-info-foreground shadow-sm hover:bg-info/90',
        success: 'bg-success text-success-foreground shadow-sm hover:bg-success/90',
        warn: 'bg-warn text-warn-foreground shadow-sm hover:bg-warn/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground hover:text-foreground transition-colors',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9 p-0',
        smallIcon: 'h-8 w-8 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export type IconButtonProps = ButtonProps &
  RequireExactlyOne<
    {
      children: React.ReactNode | React.ReactNode[];
      icon: LucideIcon;
      size?: 'icon' | 'smallIcon';
    },
    'icon' | 'children'
  >;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon: Icon, children, size = 'icon', ...props }, ref) => {
    return (
      <Button variant='outline' size={size} ref={ref} {...props}>
        {Icon ? <Icon className='size-4' /> : children}
      </Button>
    );
  },
);
IconButton.displayName = 'IconButton';

export { IconButton, Button, buttonVariants };
