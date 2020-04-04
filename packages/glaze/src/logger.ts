let instance: Pick<Console, 'warn' | 'error'> = console;

export function setInstance(logger: typeof instance): void {
  instance = logger;
}

const printedMessages = new Set<string>();

export function warnOnce(message: string): void {
  if (!printedMessages.has(message)) {
    instance.warn(message);
    printedMessages.add(message);
  }
}
