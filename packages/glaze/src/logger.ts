type LogLevel = 'warn' | 'error';

function prefixMessage(message?: unknown): string {
  return `[glaze] ${message}`;
}

let instance: Pick<Console, LogLevel> = {
  warn(message?: unknown, ...optionalParams: unknown[]) {
    // eslint-disable-next-line no-console
    console.warn(prefixMessage(message), ...optionalParams);
  },
  error(message?: unknown, ...optionalParams: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(prefixMessage(message), ...optionalParams);
  },
};

export function setLogger(logger: typeof instance): void {
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
