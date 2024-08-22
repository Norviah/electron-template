import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { RequireExactlyOne } from 'type-fest';

import * as React from 'react';

const buttonVariants = cva(
  'relative justify-center inline-flex items-center text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs',
  {
    variants: {
      variant: {
        default:
          'hover:bg-foreground/[.08] bg-background dark:bg-muted dark:hover:bg-muted/90 text-foreground dark:hover:bg-muted/90 border border-strong shadow-sm',
        primary:
          'hover:bg-primary/85 bg-primary text-primary-foreground border border-strong shadow-sm',
        destructive:
          'hover:bg-destructive/85 bg-destructive text-destructive-foreground border border-strong shadow-sm',
        info: 'bg-info text-info-foreground hover:bg-info/85 border border-strong shadow-sm',
        success:
          'bg-success text-success-foreground hover:bg-success/85 border border-strong shadow-sm',
        warn: 'bg-warn text-warn-foreground hover:bg-warn/70 border border-strong shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border border-strong shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground ',
        outline:
          'hover:bg-foreground/[.08] bg-background dark:hover:bg-muted/90 text-foreground dark:hover:bg-muted/90 border border-strong',
      },
      size: {
        default: 'h-9 px-2.5 py-1',
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

export type IconButtonProps = Omit<ButtonProps, 'size'> &
  RequireExactlyOne<
    {
      children: React.ReactNode | React.ReactNode[];
      icon: LucideIcon;
      size?: 'icon' | 'small';
    },
    'icon' | 'children'
  >;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, children, size = 'icon', ...props }, ref) => {
    return (
      <Button variant='outline' size={size === 'small' ? 'smallIcon' : size} ref={ref} {...props}>
        {Icon ? <Icon className='size-4' /> : children}
      </Button>
    );
  },
);
IconButton.displayName = 'IconButton';

export { Button, buttonVariants, IconButton };
