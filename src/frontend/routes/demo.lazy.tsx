import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/demo')({
  component: Demo,
});

import { ThemeSelector } from '@frontend/components/ThemeSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@frontend/components/ui/Avatar';
import { Blockquote } from '@frontend/components/ui/Blockquote';
import { Button, IconButton } from '@frontend/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/Card';
// import { CodeBlock } from '@frontend/components/ui/CodeBlock';
import { HoverCard } from '@frontend/components/ui/HoverCard';
import { Input } from '@frontend/components/ui/Input';
import { Label } from '@frontend/components/ui/Label';
import { Separator } from '@frontend/components/ui/Separator';
import { Switch } from '@frontend/components/ui/Switch';
import { UnorderedList } from '@frontend/components/ui/UnorderedList';
import { CopyIcon } from 'lucide-react';
import { BellRingIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@frontend/components/ui/DropdownMenu';
import { cn } from '@frontend/lib/utils';
import { toast } from 'sonner';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

type CardProps = React.ComponentProps<typeof Card>;

function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>

      <CardContent className='grid gap-4'>
        <div className=' flex items-center space-x-4 rounded-md border p-4'>
          <BellRingIcon />
          <div className='flex-1 space-y-1'>
            <p className='font-medium text-sm leading-none'>Push Notifications</p>
            <p className='text-foreground-lighter text-sm'>Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
            >
              <span className='flex h-2 w-2 translate-y-1 rounded-full bg-success' />
              <div className='space-y-1'>
                <p className='font-medium text-foreground-light text-sm leading-none'>
                  {notification.title}
                </p>
                <p className='text-foreground-lighter text-sm'>{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>
          <CheckIcon className='mr-2 h-4 w-4' /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

function CardDemo2({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <img
        src='https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8'
        alt='A dog'

        // width={500}
        // height={500}
        // className='rounded-t-md'
      />
      <CardHeader>
        <CardTitle>Arctic</CardTitle>
      </CardHeader>
      <CardContent className='grid'>
        {/* <p className='text-muted-foreground text-sm'> */}
        <p className='text-foreground text-sm'>
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat
          maximus blandit. Duis viverra fringilla imperdiet. Proin efficitur euismod sapien, eu
          dictum orci rutrum eget.
        </p>

        <p className='text-foreground-light text-sm'>
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat
          maximus blandit. Duis viverra fringilla imperdiet. Proin efficitur euismod sapien, eu
          dictum orci rutrum eget.
        </p>
        <p className='text-foreground-lighter text-sm'>
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat
        </p>
      </CardContent>
      <Separator className='mb-5' />
      <CardFooter>
        <Button className='w-full'>
          <CheckIcon className='mr-2 h-4 w-4' /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

function Demo(): JSX.Element {
  return (
    <div>
      <span>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <br />
        <CardDemo />
        <br />
        <CardDemo2 />
        <br />
        <ThemeSelector />
        <div className='mt-5 mb-5'>
          <Button variant='ghost'>
            MENU
            <ChevronDownIcon
              className='relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180'
              aria-hidden='true'
            />
          </Button>
        </div>
        <UnorderedList>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </UnorderedList>
        <div className='grid grid-cols-5 gap-5'>
          <Button
            variant='default'
            onClick={() => {
              toast.message('Title', {
                description: 'Description',
                action: {
                  label: 'Action',
                  onClick: () => console.log('Action!'),
                },
              });
            }}
          >
            Button
          </Button>
          <Button
            variant='default'
            onClick={() => {
              toast.message('Title', {
                description: 'Description',
                action: {
                  label: 'Action',
                  onClick: () => console.log('Action!'),
                },
              });
            }}
          >
            Button
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              toast.info('Info', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='info'
            onClick={() => {
              toast.info('Info', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='destructive'
            onClick={() => {
              toast.error('Error', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='success'
            onClick={() => {
              toast.success('Success', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button
            variant='warn'
            onClick={() => {
              toast.warning('Warning', { description: 'Description' });
            }}
          >
            Button
          </Button>
          <Button variant='ghost'>Button</Button>
          <Button variant='outline'>Button</Button>
        </div>

        <div className='m-10 flex w-full justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='focus:outline-none'>
              <Button variant='outline'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='mb-10'>
          <Blockquote>
            {
              "After all, everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
            }
          </Blockquote>
        </div>
        {/* <CodeBlock>#include {'<stdio.h>'}</CodeBlock> */}
        <div>
          Lorem ipsum dolor sit amet, consectetur <HoverCard /> elit. Maecenas molestie pellentesque
          ipsum. Ut id convallis nisi. Aliquam feugiat maximus blandit. Duis viverra fringilla
          imperdiet. Proin efficitur euismod sapien, eu dictum orci rutrum eget. ipsum. Ut id
          convallis nisi. Aliquam feugiat maximus blandit. Duis viverra fringilla imperdiet. Proin
          efficitur euismod sapien, eu dictum orci rutrum eget.
        </div>
        <p className='text-foreground-light text-sm'>
          Lorem ipsum dolor sit amet, consectetur ipsum. Ut id convallis nisi. Aliquam feugiat
          maximus blandit. Duis viverra fringilla imperdiet. Proin efficitur euismod sapien, eu
          dictum orci rutrum eget.
        </p>
      </span>

      <div className='space-y-5'>
        <Card className=''>
          <CardTitle className='p-6 text-base'>General Settings</CardTitle>

          <CardContent>
            <div className='grid w-full max-w-sm items-center gap-2'>
              <Label htmlFor='email'>Organization Name</Label>
              <Input
                type='email'
                id='email'
                placeholder='Email'
                value='Name'
                // className='text-foreground bg-[#292929]'
                // className='bg-foreground/[.026] text-foreground'
              />
            </div>

            {/* <div className='grid w-full max-w-sm items-center gap-2'>
            <Label htmlFor='email'>Organization Slug</Label>
            <Input
              type='email'
              id='email'
              placeholder='Email'
              value='pyuelyyvfpuurxlonjow'
              className='bg-[#292929]'
            />
          </div> */}

            <div className='grid w-full max-w-sm items-center gap-2'>
              <div className='relative'>
                <Input
                  data-size='small'
                  id='slug'
                  name=''
                  type='text'
                  // className='peer/input block box-border w-full rounded-md shadow-sm transition-all text-foreground focus-visible:shadow-md outline-none focus:ring-current focus:ring-2 focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder-foreground-muted group bg-foreground/[.026] border border-control text-sm leading-4 px-3 py-2'
                  defaultValue='pyuelyyvfpuurxlonjow'
                />
                <div className='absolute inset-y-0 right-0 flex items-center space-x-1 pr-1 pl-3'>
                  {/* <button
                  data-size='tiny'
                  type='button'
                  className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
                > */}
                  <Button
                    // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
                    // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
                    className='h-[26px] space-x-2'
                    // className='h-[26px]'
                    // variant='outline'
                    // color='secondary'
                  >
                    <div className='text-foreground-muted [&_svg]:h-[14px] [&_svg]:w-[14px]'>
                      <CopyIcon className='h-4 w-4' />
                    </div>{' '}
                    <span className='truncate'>Copy</span>{' '}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='space-x-3'>
          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong bg-background px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success dark:bg-muted',
              'hover:bg-foreground/[.026]',
            )}
          >
            {/* <div className='[&_svg]:h-[14px] [&_svg]:w-[14px] text-foreground-muted'>
              <CopyIcon className='w-4 h-4' />
            </div>{' '} */}
            <span className='truncate'>Default</span>{' '}
          </Button>

          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success',
              'bg-secondary text-secondary-foreground',
              'hover:bg-foreground/[.026]',
            )}
          >
            <span className='truncate'>Secondary</span>{' '}
          </Button>

          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border-strong px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success',
              'bg-success text-success-foreground hover:bg-success/85',
            )}
          >
            <span className='truncate'>Success</span>{' '}
          </Button>

          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border-strong px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success',
              'bg-destructive text-destructive-foreground',
              'hover:bg-destructive/85',
            )}
          >
            <span className='truncate'>Detructive</span>{' '}
          </Button>

          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success',
              'bg-warn text-warn-foreground hover:bg-warn/70',
            )}
          >
            <span className='truncate'>Warn</span>{' '}
          </Button>

          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success',
              'bg-info text-info-foreground hover:bg-info/85',
            )}
          >
            <span className='truncate'>Information</span>{' '}
          </Button>

          <div
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'h-9 px-4 py-2',
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1',
              // 'hover:bg-foreground/10',
              'hover:bg-foreground/[.026]',
            )}
          >
            <span className='truncate'>Ghost</span>{' '}
          </div>

          <div
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className={cn(
              'h-9 px-4 py-2',
              'relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong bg-background px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success dark:bg-muted',
              'hover:bg-foreground/[.026]',
            )}
          >
            <span className='truncate'>Copy</span>
          </div>

          <Button
            // className='relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-background dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]'
            className='relative inline-flex h-[26px] cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong bg-background px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success dark:bg-muted'
            // className='h-[26px]'
            // variant='outline'
            // color='secondary'
          >
            <CopyIcon className='h-3 w-3' />
            <span className='truncate'>Copy</span>
          </Button>
        </div>

        <div className='space-x-3'>
          <Button variant='default'>Default</Button>
          <Button variant='secondary'>secondary</Button>
          <Button variant='success'>success</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='warn'>warn</Button>
          <Button variant='info'>info</Button>
          <Button variant='ghost'>ghost</Button>
          <Button variant='outline'>outline</Button>

          <IconButton icon={CopyIcon} />
        </div>

        <div className='space-x-3'>
          <Button size='sm' variant='default'>
            Default
          </Button>
          <Button size='sm' variant='secondary'>
            secondary
          </Button>
          <Button size='sm' variant='success'>
            success
          </Button>
          <Button size='sm' variant='destructive'>
            Destructive
          </Button>
          <Button size='sm' variant='warn'>
            warn
          </Button>
          <Button size='sm' variant='info'>
            info
          </Button>
          <Button size='sm' variant='ghost'>
            ghost
          </Button>

          <IconButton size='smallIcon' icon={CopyIcon} />
        </div>

        <div className='space-x-3 bg-card p-5'>
          <Button size='sm' variant='default'>
            Default
          </Button>
          <Button size='sm' variant='secondary'>
            secondary
          </Button>
          <Button size='sm' variant='success'>
            success
          </Button>
          <Button size='sm' variant='destructive'>
            Destructive
          </Button>
          <Button size='sm' variant='warn'>
            warn
          </Button>
          <Button size='sm' variant='info'>
            info
          </Button>
          <Button size='sm' variant='ghost'>
            ghost
          </Button>

          <IconButton size='smallIcon' icon={CopyIcon} />
        </div>

        <Card>
          <div className='flex flex-col gap-0 divide-y divide-border'>
            <div className='undefined grid grid-cols-12 gap-6 px-8 py-8 opacity-100'>
              <label className='col-span-12 text-foreground text-sm lg:col-span-5 '>
                General settings
              </label>
              <div className='undefined undefined relative col-span-12 flex flex-col gap-6 lg:col-span-7'>
                <div className='grid gap-2 text-sm leading-4 md:grid md:grid-cols-12'>
                  <div className='col-span-12 flex flex-row justify-between space-x-2'>
                    <label className='block text-foreground-light text-sm leading-4' htmlFor='name'>
                      Organization name
                    </label>
                  </div>
                  <div className='col-span-12'>
                    <div className=''>
                      <div className='relative'>
                        <input
                          data-size='small'
                          id='name'
                          name=''
                          type='text'
                          className='peer/input group box-border block w-full rounded-md border border-control bg-foreground/[.026] px-3 py-2 text-foreground text-sm leading-4 placeholder-foreground-muted shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:border-foreground-muted focus-visible:shadow-md focus-visible:ring-background-control'
                          defaultValue='Norviaha'
                        />
                      </div>
                    </div>
                    <p
                      data-state='hide'
                      className='text-red-900 text-sm leading-4 transition-all data-show:mt-2 data-hide:animate-slide-up-normal data-show:animate-slide-down-normal'
                    />
                  </div>
                </div>
                <div className='grid gap-2 text-sm leading-4 md:grid md:grid-cols-12'>
                  <div className='col-span-12 flex flex-row justify-between space-x-2'>
                    <label className='block text-foreground-light text-sm leading-4' htmlFor='slug'>
                      Organization slug
                    </label>
                  </div>
                  <div className='col-span-12'>
                    <div className=''>
                      <div className='relative'>
                        <input
                          data-size='small'
                          id='slug'
                          name=''
                          type='text'
                          className='peer/input group box-border block w-full rounded-md border border-control bg-foreground/[.026] px-3 py-2 text-foreground text-sm leading-4 placeholder-foreground-muted opacity-50 shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:border-foreground-muted focus-visible:shadow-md focus-visible:ring-background-control'
                          defaultValue='pyuelyyvfpuurxlonjow'
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center space-x-1 pr-1 pl-3'>
                          <button
                            data-size='tiny'
                            type='button'
                            className='relative inline-flex h-[26px] cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong bg-alternative px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success dark:bg-muted'
                          >
                            <div className='text-foreground-muted [&_svg]:h-[14px] [&_svg]:w-[14px]'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={18}
                                height={18}
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='sbui-icon'
                                role='img'
                                aria-label='test'
                              >
                                <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                                <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                              </svg>
                            </div>{' '}
                            <span className='truncate'>Copy</span>{' '}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p
                      data-state='hide'
                      className='text-red-900 text-sm leading-4 transition-all data-show:mt-2 data-hide:animate-slide-up-normal data-show:animate-slide-down-normal'
                    />
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='flex flex-row gap-6 text-sm leading-4'>
                    <div className=''>
                      <button
                        type='button'
                        id='isOptedIntoAi'
                        name='isOptedIntoAi'
                        className=' focus:!ring-border relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-foreground-muted/40 p-0 outline-none transition-colors duration-200 ease-in-out hover:bg-foreground-muted/60 focus:ring-2 focus:ring-current'
                      >
                        <span
                          aria-hidden='true'
                          className=' !h-5 !w-5 inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        />
                      </button>
                    </div>
                    <div className='order-2 col-span-4 flex flex-col space-y-2'>
                      <label
                        className='block text-foreground-light text-sm leading-4'
                        htmlFor='isOptedIntoAi'
                      >
                        Opt-in to sending anonymous data to OpenAI
                      </label>
                      <div
                        className='mt-2 text-foreground-lighter text-sm leading-4 leading-normal'
                        id='isOptedIntoAi-description'
                      >
                        By opting into sending anonymous data, Supabase AI can improve the answers
                        it shows you
                      </div>
                      <p
                        data-state='hide'
                        className='text-red-900 text-sm leading-4 transition-all data-show:mt-2 data-hide:animate-slide-up-normal data-show:animate-slide-down-normal'
                      />
                    </div>
                  </div>
                  <div data-state='closed'>
                    <div
                      className='ml-16 flex cursor-pointer items-center space-x-2'
                      aria-controls='radix-:r86:'
                      aria-expanded='false'
                      data-state='closed'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={16}
                        height={16}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='sbui-icon transition-all'
                        role='img'
                        aria-label='test'
                      >
                        <polyline points='9 18 15 12 9 6' />
                      </svg>
                      <p className='text-foreground-light text-sm underline'>
                        Important information regarding opting in
                      </p>
                    </div>
                    <div
                      data-state='closed'
                      id='radix-:r86:'
                      className=' data-closed:animate-slide-up-normal data-open:animate-slide-down-normal '
                      style={{}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='border-t'>
            <div className='flex px-8 py-4'>
              <div className='flex w-full items-center justify-end gap-2'>
                <div className='flex items-center gap-2'>
                  <button
                    data-size='tiny'
                    type='reset'
                    className='relative inline-flex h-[26px] cursor-pointer items-center justify-center space-x-2 rounded-md border border-strong bg-alternative bg-foreground/[.026] px-2.5 py-1 text-center font-regular text-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-stronger hover:bg-selection focus-visible:outline-4 focus-visible:outline-success focus-visible:outline-offset-1 data-[state=open]:border-button-hover data-[state=open]:bg-selection data-[state=open]:outline-success dark:bg-muted'
                  >
                    {' '}
                    <span className='truncate'>Cancel</span>{' '}
                  </button>
                  <button
                    data-size='tiny'
                    type='submit'
                    form='org-general-settings'
                    className='relative inline-flex h-[26px] cursor-pointer items-center justify-center space-x-2 rounded-md border border-success/75 bg-success px-2.5 py-1 text-center font-regular text-success-foreground text-xs outline-none outline-0 transition-all duration-200 ease-out hover:border-success/80 hover:bg-success/80 focus-visible:outline-4 focus-visible:outline-offset-1 data-[state=open]:outline-success dark:border-success/30 dark:bg-success dark:data-[state=open]:bg-success/80 dark:hover:bg-success/50'
                  >
                    {' '}
                    <span className='truncate'>Save</span>{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className='w-fit rounded bg-card p-5'>
          <div className=' mb-2 flex space-x-3 font-normal '>
            <span className='w-full text-foreground-lighter text-sm'>Account</span>
          </div>
          <ul className='space-y-1'>
            <a className='block' target='_self' href='/dashboard/account/me'>
              <span className='group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted'>
                <span
                  title='Preferences'
                  className='w-full truncate text-foreground-light text-sm transition group-hover:text-foreground'
                >
                  Preferences
                </span>
              </span>
            </a>
            <a className='block' target='_self' href='/dashboard/account/tokens'>
              <span className='group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted'>
                <span
                  title='Access Tokens'
                  className='w-full truncate text-foreground-light text-sm transition group-hover:text-foreground'
                >
                  Access Tokens
                </span>
              </span>
            </a>
            <a className='block' target='_self' href='/dashboard/account/security'>
              <span className='group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted'>
                <span
                  title='Security'
                  className='w-full truncate text-foreground-light text-sm transition group-hover:text-foreground'
                >
                  Security
                </span>
              </span>
            </a>
            <a className='block' target='_self' href='/dashboard/account/audit'>
              <span className='group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted'>
                <span
                  title='Audit Logs'
                  className='w-full truncate text-foreground-light text-sm transition group-hover:text-foreground'
                >
                  Audit Logs
                </span>
              </span>
            </a>
          </ul>
        </div>

        <div className=''>
          <div className='relative'>
            <input
              data-size='small'
              id='name'
              name=''
              type='text'
              className='peer/input group box-border block w-full rounded-md border border-control bg-foreground/[.026] px-3 py-2 text-foreground text-sm leading-4 placeholder-foreground-muted shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:border-foreground-muted focus-visible:shadow-md focus-visible:ring-background-control'
              defaultValue='Norviah'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
