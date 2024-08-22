### ⚡️ Electron

[Electron](https://www.electronjs.org/) is a framework for creating native
applications with web technologies like JavaScript, HTML, and CSS. A lot of
popular applications are built with Electron, such as Discord, Slack, and VS
Code.

[`main.ts`](./src/main.ts) is the entry point for the electron application, this
is where initialization and configuration of the application is done.

[`preload.ts`](./src/preload.ts) is the preload script for the electron, which
forms the bridge between the backend and the frontend.

&nbsp;

### 📦 Next.js

We're using [Next.js](https://nextjs.org/) to create the frontend of APP NAME.
How this works is that, for development, we use next.js to create a server to
run the actual application and use electron to create the window to display the
frontend.

For production, we use next.js to statically build the frontend, which
compiles the application to static HTML/CSS/JS files, which is then served by
electron to the window.

&nbsp;

### 🤝 Communication

As all applications, the frontend and backend needs to communicate with each
other to work. We simply can't call native libraries from the frontend, so we
need to have a way to communicate with the backend.

To do this, we use [IPC](https://www.electronjs.org/docs/latest/tutorial/ipc) to
send messages between the frontend and backend. In the `main.ts` file, we define
the events to listen to on the backend side, with the `preload.ts` file exposing
the handlers to listen to the events on the frontend side, we expose this bridge
on the `window` object, so `window.ipc` will have this object.

On the frontend side, we can then call `window.ipc.send` to send a message to
the backend and wait for a response. For example, in `main.ts`, we define the
`ping` event as:

```ts
ipcMain.handle('ping', async (event, args) => {
  return `pong: ${args}`;
});
```

On the frontend side, we can use the `window.ipc.send` method to send a message
and wait for a response. For example, in `page.tsx`, we can do:

`page.tsx`

```tsx
'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { useState } from 'react';

export default function Home(): JSX.Element {
  const [text, setText] = useState<string>('');

  return (
    <div className="flex flex-row gap-3">
      <Input
        className="h-9 bg-white shadow dark:bg-black"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        className="h-9"
        variant="default"
        onClick={async () => {
          try {
            const response = await window.ipc.send('ping', text);

            console.log(response);
          } catch {
            console.log('error');
          }
        }}
      >
        Ping
      </Button>
    </div>
  );
}
```

What this example does, is that it creates a client component with a text input
and a button. When text is entered into the input, the text is stored within the
component's state.

Once the button is clicked, it uses the bridge to send the `ping` event to the
backend with the stored text as the argument. The backend then responds with
`pong: ${args}`, which is then returned to the frontend and logged to the
console.