let instance: Pick<Console, 'warn' | 'error'> = console;

export function setInstance(logger: typeof instance): void {
  instance = logger;
}

// TODO: Use `Set` when no polyfill is required for it anymore
const printedMessages = new Map<string, number>();

export function warnOnce(message: string): void {
  if (!printedMessages.has(message)) {
    instance.warn(message);
    printedMessages.set(message, 1);
  }
}
