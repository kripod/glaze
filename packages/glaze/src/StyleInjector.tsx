/**
 * Based on:
 *
 * - https://github.com/threepointone/glamor/blob/78ffd84bfba187f4037a29b389e5a349dbb6e9a8/packages/glamor/src/StyleSheet.ts
 * - https://github.com/styled-components/styled-components/blob/94df8bb57c8ba01cd33268b65df93499a7961cb2/packages/styled-components/src/sheet/Tag.js
 */

/* eslint-disable no-plusplus */

import * as React from 'react';
import { ClassRef } from 'treat';

import { warnOnce } from './logger';
import {
  NullRuleManager,
  OptimizedRuleManager,
  RuleManager,
} from './RuleManager';

const MAX_RULE_COUNT = 0xffff;

function createAndMountStyleElement(nonce?: string): HTMLStyleElement {
  const el = document.createElement('style');
  el.dataset.glaze = '';
  el.nonce = nonce;
  return document.head.appendChild(el);
}

function getSheet(nonce?: string): CSSStyleSheet {
  // Hydrate existing style node if available
  for (let i = 0, len = document.styleSheets.length; i < len; ++i) {
    const styleSheet = document.styleSheets[i];
    if ((styleSheet.ownerNode as HTMLElement).dataset.glaze === '') {
      return styleSheet as CSSStyleSheet;
    }
  }

  const styleEl = createAndMountStyleElement(nonce);

  // Avoid Edge bug where empty style elements don't create sheets
  styleEl.appendChild(document.createTextNode(''));

  // Avoid Firefox quirk where the style element might not have a sheet property
  return (styleEl.sheet as CSSStyleSheet | undefined) || getSheet(nonce);
}

function getInitialRuleIndexes(rules: CSSRuleList): Map<ClassRef, number> {
  const ruleIndexesByClassName = new Map<ClassRef, number>();

  for (let i = 0, { length } = rules; i < length; ++i) {
    const rule = rules[i];
    if (rule.type === CSSRule.STYLE_RULE) {
      // Remove leading '.' from class selector
      const className = (rule as CSSStyleRule).selectorText.slice(1);
      ruleIndexesByClassName.set(className, i);
    }
    // TODO: Add support for `CSSMediaRule`
  }

  return ruleIndexesByClassName;
}

export interface StyleInjector {
  readonly ruleManager: RuleManager;

  addRule(cssText: string): number;
  nullifyRule(index: number): void;
}

export class NullStyleInjector implements StyleInjector {
  ruleManager: RuleManager = new NullRuleManager();

  // eslint-disable-next-line class-methods-use-this
  addRule(): number {
    return 0;
  }

  // eslint-disable-next-line class-methods-use-this
  nullifyRule(): void {}
}

export class VirtualStyleInjector implements StyleInjector {
  ruleManager: RuleManager = new OptimizedRuleManager(this, new Map());

  private cssTexts: string[] = [];

  private nonce?: string;

  setNonce(nonce?: string): void {
    this.nonce = nonce;
  }

  getStyleElement(): JSX.Element {
    return (
      <style
        data-glaze=""
        nonce={this.nonce}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: this.cssTexts.join('') }}
      />
    );
  }

  addRule(cssText: string): number {
    return this.cssTexts.push(cssText) - 1;
  }

  // No styles are revoked during SSR
  // eslint-disable-next-line class-methods-use-this
  nullifyRule(): void {}
}

export class OptimizedStyleInjector implements StyleInjector {
  private sheet: CSSStyleSheet;

  private ruleCount = 0;

  private freeIndexes: number[] = [];

  ruleManager: RuleManager;

  constructor(nonce?: string) {
    this.sheet = getSheet(nonce);
    this.ruleManager = new OptimizedRuleManager(
      this,
      getInitialRuleIndexes(this.sheet.rules), // Hydrate server-rendered rules
    );
  }

  addRule(cssText: string): number {
    if (this.freeIndexes.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.replaceRule(this.freeIndexes.pop()!, cssText);
    }

    return this.sheet.insertRule(cssText, this.ruleCount++);
  }

  nullifyRule(index: number): void {
    if (index === this.ruleCount - 1) {
      this.sheet.deleteRule(--this.ruleCount);
    } else {
      // Only allow replacements to prevent modification of existing indexes
      const dummyRule = '#_{}';
      this.freeIndexes.push(this.replaceRule(index, dummyRule));
    }
  }

  replaceRule(index: number, cssText: string): number {
    this.sheet.deleteRule(index);
    return this.sheet.insertRule(cssText, index);
  }
}

export class DebuggableStyleInjector implements StyleInjector {
  ruleManager: RuleManager = new OptimizedRuleManager(this, new Map());

  private styleEl: HTMLStyleElement;

  private nodes: Text[] = [];

  private freeIndexes: number[] = [];

  constructor(nonce?: string) {
    this.styleEl = createAndMountStyleElement(nonce);
  }

  addRule(cssText: string): number {
    if (this.freeIndexes.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.replaceRule(this.freeIndexes.pop()!, cssText);
    }

    const index = this.nodes.length;

    if (index === MAX_RULE_COUNT) {
      warnOnce(
        'An excessive amount of styling rules have been injected at runtime. Consider using inline styles or CSS variables instead.',
      );
    }

    const node = document.createTextNode(cssText);
    this.styleEl.appendChild(node);
    this.nodes[index] = node;
    return index;
  }

  nullifyRule(index: number): void {
    if (index === this.nodes.length - 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.styleEl.removeChild(this.nodes.pop()!);
    } else {
      // Only allow replacements to prevent modification of existing indexes
      const dummyRule = '';
      this.freeIndexes.push(this.replaceRule(index, dummyRule));
    }
  }

  replaceRule(index: number, cssText: string): number {
    this.nodes[index].textContent = cssText;
    return index;
  }
}
