import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export type EventMethod = (event: IpcMainEvent, ...args: any[]) => void;
export type Events = Record<string, EventMethod | Record<string, EventMethod>>;

export type API<E extends Events> = {
  [K in keyof E]: E[K] extends (events: infer _, ...args: infer P) => void
    ? (...args: P) => void
    : E[K] extends Record<string, EventMethod>
      ? API<E[K]>
      : never;
};

export type HandlerMethod = (event: IpcMainInvokeEvent, ...args: any[]) => any;
export type Handlers = Record<string, HandlerMethod | Record<string, HandlerMethod>>;

export type APII<E extends Handlers> = {
  [K in keyof E]: E[K] extends (events: infer _, ...args: infer P) => infer R
    ? (...args: P) => Promise<R>
    : E[K] extends Record<string, HandlerMethod>
      ? APII<E[K]>
      : never;
};
