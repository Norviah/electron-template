import type { IpcMainEvent } from 'electron';

export type EventMethod = (event: IpcMainEvent, ...args: any[]) => void;
export type Events = Record<string, EventMethod | Record<string, EventMethod>>;

export type API<E extends Events> = {
  [K in keyof E]: E[K] extends (events: infer _, ...args: infer P) => void
    ? (...args: P) => void
    : E[K] extends Record<string, EventMethod>
      ? API<E[K]>
      : never;
};
