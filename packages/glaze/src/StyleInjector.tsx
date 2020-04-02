/*
Based on:
- https://github.com/threepointone/glamor/blob/78ffd84bfba187f4037a29b389e5a349dbb6e9a8/packages/glamor/src/StyleSheet.ts
- https://github.com/styled-components/styled-components/blob/94df8bb57c8ba01cd33268b65df93499a7961cb2/packages/styled-components/src/sheet/Tag.js
*/

import React from 'react';

const MAX_RULE_COUNT = 0xffff;

function createAndMountStyleElement(): HTMLStyleElement {
  const el = document.createElement('style');
  el.dataset.glaze = '';
  return document.head.appendChild(el);
}

function getSheet(): CSSStyleSheet {
  // Hydrate existing style node if available
  for (let i = 0, l = document.styleSheets.length; i < l; i += 1) {
    const styleSheet = document.styleSheets[i];
    if ((styleSheet.ownerNode as HTMLElement).dataset.glaze === '') {
      return styleSheet as CSSStyleSheet;
    }
  }

  const styleEl = createAndMountStyleElement();

  // Avoid Edge bug where empty style elements don't create sheets
  styleEl.appendChild(document.createTextNode(''));

  // Avoid Firefox quirk where the style element might not have a sheet property
  return (styleEl.sheet as CSSStyleSheet | undefined) || getSheet();
}

export interface StyleInjector {
  insertRule(cssText: string): number;
  deleteRule(index: number): void;
}

export class VirtualStyleInjector implements StyleInjector {
  private cssTexts: string[] = [];

  getStyleElement(): JSX.Element {
    return (
      <style
        data-glaze=""
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: this.cssTexts.join('') }}
      />
    );
  }

  insertRule(cssText: string): number {
    return this.cssTexts.push(cssText) - 1;
  }

  // No dynamic styles are deleted during SSR
  // eslint-disable-next-line class-methods-use-this
  deleteRule(): void {}
}

export class OptimizedStyleInjector implements StyleInjector {
  private sheet = getSheet();

  private ruleCount = 0;

  private freeIndexes: number[] = [];

  insertRule(cssText: string): number {
    const index = this.freeIndexes.length
      ? this.freeIndexes.pop()
      : this.ruleCount++; // eslint-disable-line no-plusplus
    return this.sheet.insertRule(cssText, index);
  }

  deleteRule(index: number): void {
    if (index === this.ruleCount - 1) {
      // eslint-disable-next-line no-plusplus
      this.sheet.deleteRule(--this.ruleCount);
    } else {
      // Only allow replacements to prevent modification of existing indexes
      this.freeIndexes.push(index);
      const dummyRule = '#_{}';
      this.sheet.insertRule(dummyRule, index);
    }
  }
}

export class DebuggableStyleInjector implements StyleInjector {
  private styleEl: HTMLStyleElement;

  private nodes: Text[] = [];

  private freeIndexes: number[] = [];

  constructor() {
    this.styleEl = createAndMountStyleElement();
  }

  insertRule(cssText: string): number {
    const index = this.freeIndexes.pop() ?? this.nodes.length;

    if (index === MAX_RULE_COUNT) {
      // eslint-disable-next-line no-console
      console.warn(
        'An excessive amount of styling rules have been injected at runtime. Consider using inline styles or CSS variables instead.',
      );
    }

    const node = document.createTextNode(cssText);
    this.styleEl.appendChild(node);
    this.nodes[index] = node;
    return index;
  }

  deleteRule(index: number): void {
    if (index === this.nodes.length - 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.styleEl.removeChild(this.nodes.pop()!);
    } else {
      // Only allow replacements to prevent modification of existing indexes
      this.freeIndexes.push(index);
      const dummyRule = '';
      this.nodes[index].textContent = dummyRule;
    }
  }
}
