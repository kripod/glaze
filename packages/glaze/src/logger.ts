type LogLevel = 'warn' | 'error';

let instance: Pick<Console, LogLevel> = console;

export function setInstance(logger: typeof instance): void {
  instance = logger;
}

// TODO: Use `Set` when no polyfill is required for it anymore
const printedMessages = new Map<string, number>();

function printOnce(logLevel: LogLevel, message: string): void {
  if (!printedMessages.has(message)) {
    instance[logLevel](message);
    printedMessages.set(message, 1);
  }
}

export const warnOnce = printOnce.bind(null, 'warn');
export const errorOnce = printOnce.bind(null, 'error');
