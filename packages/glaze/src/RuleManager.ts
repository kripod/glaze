import { ClassRef } from 'treat';

import { isBrowser, isDev } from './env';
import { errorOnce, warnOnce } from './logger';
import type { StyleInjector } from './StyleInjector';

export interface RuleManager {
  increaseUsage(className: ClassRef, cssText: () => string): void;
  decreaseUsage(className: ClassRef, byAmount: number): void;
}

export class NullRuleManager implements RuleManager {
  // eslint-disable-next-line class-methods-use-this
  increaseUsage(): void {
    if (isDev) {
      if (isBrowser) {
        errorOnce(
          'Client-side injection of dynamic styles is not set up. Wrap the component tree inside a `<StyleInjectorProvider>` without parameters.',
        );
      } else {
        warnOnce(
          'Server-side rendering of dynamic styles is not configured properly. Some of the initially applied CSS could not be prerendered. Please refer to the documentation at https://glaze.js.org/docs/server-side-rendering for further information.',
        );
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  decreaseUsage(): void {}
}

export class OptimizedRuleManager implements RuleManager {
  private injector: StyleInjector;

  private ruleIndexesByClassName = new Map<ClassRef, number>();

  private usageCountsByClassName = new Map<ClassRef, number>();

  constructor(
    injector: StyleInjector,
    initialRuleIndexesByClassName: Map<ClassRef, number>,
  ) {
    this.injector = injector;
    this.ruleIndexesByClassName = initialRuleIndexesByClassName;
  }

  increaseUsage(className: ClassRef, cssText: () => string): void {
    const prevUsageCount = this.usageCountsByClassName.get(className) || 0;
    this.usageCountsByClassName.set(className, prevUsageCount + 1);

    // Append new rule only if it wasn't available in the server-rendered code
    if (!prevUsageCount && !this.ruleIndexesByClassName.has(className)) {
      // eslint-disable-next-line no-underscore-dangle
      if (isDev && isBrowser && window.__glaze_disableStyleInjection) {
        new NullRuleManager().increaseUsage();
      } else {
        this.ruleIndexesByClassName.set(
          className,
          this.injector.addRule(cssText()),
        );
      }
    }
  }

  decreaseUsage(className: ClassRef, byAmount: number): void {
    const nextUsageCount =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.usageCountsByClassName.get(className)! - byAmount;

    if (nextUsageCount) {
      this.usageCountsByClassName.set(className, nextUsageCount);
    } else {
      this.usageCountsByClassName.delete(className);
      // eslint-disable-next-line no-underscore-dangle
      if (!isDev || !window.__glaze_disableStyleInjection) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.injector.nullifyRule(this.ruleIndexesByClassName.get(className)!);
        this.ruleIndexesByClassName.delete(className);
      }
    }
  }
}
