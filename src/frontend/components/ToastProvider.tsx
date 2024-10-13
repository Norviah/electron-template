import { useTheme } from './ThemeProvider';
import { Toaster as BaseToastProvider } from 'sonner';

type ToasterProps = React.ComponentProps<typeof BaseToastProvider>;

export function ToastProvider({ ...props }: ToasterProps): JSX.Element {
  const { theme = 'system' } = useTheme();

  return (
    <BaseToastProvider
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='bottom-left'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-card',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}
