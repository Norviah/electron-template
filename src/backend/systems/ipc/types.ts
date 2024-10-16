import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

/**
 * Represents the structure for an IPC listener.
 *
 * When registering a listener for an IPC event, the function's first parameter
 * will represent the event, which is dependent on whether if the event is a
 * one-way event or a request-response event.
 *
 * @template EventParameter The event parameter type.
 */
export type IPCMethod<EventParameter extends IpcMainEvent | IpcMainInvokeEvent> = (
  event: EventParameter,
  ...args: any[]
) => EventParameter extends IpcMainEvent ? void : any;

/**
 * Represents a collection of IPC listeners.
 *
 * @param EventParameter The event parameter type.
 */
export type IPCCollection<EventParameter extends IpcMainEvent | IpcMainInvokeEvent> = Record<
  string,
  IPCMethod<EventParameter> | Record<string, IPCMethod<EventParameter>>
>;

/**
 * Represents the event types for the IPC system.
 *
 * This type resolves to a tuple of strings, where the first element represents
 * the method when registering the IPC listener, and the second element
 * represents the method when sending an IPC event.
 *
 * @template Collection The collection of IPC listeners.
 */
export type EventTypes<
  Collection extends IPCCollection<IpcMainEvent> | IPCCollection<IpcMainInvokeEvent>,
> = Collection extends IPCCollection<infer EventParameter>
  ? EventParameter extends IpcMainEvent
    ? ['on', 'send']
    : ['handle', 'invoke']
  : never;

/**
 * Constructs the API for the IPC system.
 *
 * When generating the API, the first parameters of listeners must be the event
 * that the listener is listening for, but the methods on the renderer process
 * does not have this parameter.
 *
 * This type reconstructs the API to remove the first parameter from the
 * listeners.
 *
 * @template Collection The collection of IPC listeners.
 */
export type API<
  Collection extends IPCCollection<IpcMainEvent> | IPCCollection<IpcMainInvokeEvent>,
> = Collection extends IPCCollection<infer EventParameter>
  ? {
      [K in keyof Collection]: Collection[K] extends (
        events: EventParameter,
        ...args: infer P
      ) => infer R
        ? (...args: P) => EventParameter extends IpcMainEvent ? void : Promise<R>
        : Collection[K] extends Record<string, IPCMethod<EventParameter>>
          ? API<
              | (Collection[K] & IPCCollection<IpcMainEvent>)
              | (Collection[K] & IPCCollection<IpcMainInvokeEvent>)
            >
          : never;
    }
  : never;
