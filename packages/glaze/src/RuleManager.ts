import { isBrowser, isDev } from './env';
import { errorOnce, warnOnce } from './logger';
import type { StyleInjector } from './StyleInjector';

export interface RuleManager {
  increaseUsage(className: string, cssText: () => string): void;
  decreaseUsage(className: string, byAmount: number): void;
}

export class NullRuleManager implements RuleManager {
  // eslint-disable-next-line class-methods-use-this
  increaseUsage(): void {
    if (isDev) {
      // TODO: Add instructions for resolving the situation
      if (isBrowser) {
        errorOnce('Client-side rendering of dynamic styles is not set up');
      } else {
        warnOnce('Server-side rendering of dynamic styles is not set up');
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  decreaseUsage(): void {}
}

export class OptimizedRuleManager implements RuleManager {
  private injector: StyleInjector;

  private ruleIndexesByClassName = new Map<string, number>();

  private usageCountsByClassName = new Map<string, number>();

  constructor(
    injector: StyleInjector,
    initialRuleIndexesByClassName: Map<string, number>,
  ) {
    this.injector = injector;
    this.ruleIndexesByClassName = initialRuleIndexesByClassName;
  }

  increaseUsage(className: string, cssText: () => string): void {
    const prevUsageCount = this.usageCountsByClassName.get(className) || 0;
    this.usageCountsByClassName.set(className, prevUsageCount + 1);

    // Append new rule only if it wasn't available in the server-rendered code
    if (!prevUsageCount && !this.ruleIndexesByClassName.has(className)) {
      this.ruleIndexesByClassName.set(
        className,
        this.injector.addRule(cssText()),
      );
    }
  }

  decreaseUsage(className: string, byAmount: number): void {
    const nextUsageCount =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.usageCountsByClassName.get(className)! - byAmount;

    if (nextUsageCount) {
      this.usageCountsByClassName.set(className, nextUsageCount);
    } else {
      this.usageCountsByClassName.delete(className);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.injector.nullifyRule(this.ruleIndexesByClassName.get(className)!);
      this.ruleIndexesByClassName.delete(className);
    }
  }
}
