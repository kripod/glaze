/*
Based on:
- https://github.com/threepointone/glamor/blob/78ffd84bfba187f4037a29b389e5a349dbb6e9a8/packages/glamor/src/StyleSheet.ts
- https://github.com/styled-components/styled-components/blob/94df8bb57c8ba01cd33268b65df93499a7961cb2/packages/styled-components/src/sheet/Tag.js
*/

const MAX_RULE_COUNT = 0xffff;

function createAndMountStyleElement(): HTMLStyleElement {
  const el = document.createElement('style');
  el.dataset.glaze = '';
  return document.head.appendChild(el);
}

function getSheet(styleEl: HTMLStyleElement): CSSStyleSheet {
  if (styleEl.sheet) return styleEl.sheet as CSSStyleSheet;

  // Avoid Firefox quirk where the style element might not have a sheet property
  for (let i = 0, l = document.styleSheets.length; i < l; i += 1) {
    const styleSheet = document.styleSheets[i];
    if (styleSheet.ownerNode === styleEl) {
      return styleSheet as CSSStyleSheet;
    }
  }

  return undefined as never;
}

export interface StyleSheet {
  insertRule(cssText: string): number;
  deleteRule(id: number): void;
}

export class VirtualStyleSheet implements StyleSheet {
  cssTexts: string[] = [];

  insertRule(cssText: string): number {
    return this.cssTexts.push(cssText) - 1;
  }

  // No dynamic styles are deleted during SSR
  // eslint-disable-next-line class-methods-use-this
  deleteRule(): void {}
}

export class DebuggableStyleSheet implements StyleSheet {
  private styleEl: HTMLStyleElement;

  private nodes: Text[] = [];

  private freeIndexes: number[] = [];

  constructor() {
    this.styleEl = createAndMountStyleElement();
  }

  insertRule(rule: string): number {
    const index = this.freeIndexes.pop() ?? this.nodes.length;

    if (index === MAX_RULE_COUNT) {
      // eslint-disable-next-line no-console
      console.warn(
        'An excessive amount of styling rules have been injected at runtime. Consider using inline styles or CSS variables instead.',
      );
    }

    const node = document.createTextNode(rule);
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
      this.nodes[index].textContent = ''; // Dummy
    }
  }
}

export class OptimizedStyleSheet implements StyleSheet {
  private styleEl: HTMLStyleElement;

  private innerSheet: CSSStyleSheet;

  private ruleCount = 0;

  private freeIndexes: number[] = [];

  constructor() {
    this.styleEl = createAndMountStyleElement();

    // Avoid Edge bug where empty style elements don't create sheets
    this.styleEl.appendChild(document.createTextNode(''));

    this.innerSheet = getSheet(this.styleEl);
  }

  insertRule(cssText: string): number {
    const index = this.freeIndexes.length
      ? this.freeIndexes.pop()
      : this.ruleCount++; // eslint-disable-line no-plusplus
    return this.innerSheet.insertRule(cssText, index);
  }

  deleteRule(index: number): void {
    if (index === this.ruleCount - 1) {
      this.ruleCount -= 1;
      this.innerSheet.deleteRule(index);
    } else {
      // Only allow replacements to prevent modification of existing indexes
      this.freeIndexes.push(index);
      this.innerSheet.insertRule(
        '#_{}', // Dummy
        index,
      );
    }
  }
}
