'use client';

import { IconButton } from '@/components/ui/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from 'next-themes';
import { useState } from 'react';

export function ThemeSelector(): JSX.Element {
  const { setTheme, theme: currentTheme } = useTheme();
  const [openToolTip, setOpenToolTip] = useState(false);

  const themes = [
    {
      name: 'Light',
      onclick: () => setTheme('dark'),
    },
    {
      name: 'Dark',
      onclick: () => setTheme('system'),
    },
    {
      name: 'System',
      onclick: () => setTheme('light'),
    },
  ];

  const theme =
    themes.find((t) => t.name.toLowerCase() === currentTheme?.toLowerCase()) || themes[2];

  return (
    <TooltipProvider>
      <Tooltip open={openToolTip}>
        <TooltipTrigger
          asChild
          onMouseEnter={() => setOpenToolTip(true)}
          onMouseLeave={() => setOpenToolTip(false)}
        >
          <IconButton
            onClick={theme.onclick}
            size='small'
            className='text-foreground-light hover:text-foreground'
          >
            <SunIcon className='dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0' />
            <MoonIcon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </IconButton>
        </TooltipTrigger>
        <TooltipContent side='left'>
          <p>{`Theme: ${theme.name} Mode`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
