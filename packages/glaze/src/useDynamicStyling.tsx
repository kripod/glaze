/* Prefer performance over elegance, as this code is critical for the runtime */

import hash from '@emotion/hash';
import { useContext, useEffect, useRef } from 'react';
import { ClassRef } from 'treat';

import { isDev } from './env';
import { escape } from './ponyfills/CSS';
import { StyleInjectorContext } from './StyleInjectorContext';

const specificitiesByShorthandProperty = new Map([
  ['all', 1],
  ['animation', 1],
  ['background', 1],
  ['border', 1],
  // TODO:
  // ['borderBlock', 2],
  // ['borderBlockEnd', 3],
  // ['borderBlockStart', 3],
  ['borderBottom', 2],
  ['borderColor', 2],
  ['borderImage', 2],
  // TODO:
  // ['borderInline', 2],
  // ['borderInlineEnd', 3],
  // ['borderInlineStart', 3],
  ['borderLeft', 2],
  ['borderRadius', 2],
  ['borderRight', 2],
  ['borderStyle', 2],
  ['borderTop', 2],
  ['borderWidth', 2],
  ['columnRule', 1],
  ['columns', 1],
  ['flex', 1],
  ['flexFlow', 1],
  ['font', 1],
  ['gap', 1],
  ['grid', 1],
  ['gridArea', 1],
  ['gridColumn', 2],
  ['gridRow', 2],
  ['gridTemplate', 1],
  ['lineClamp', 1],
  ['listStyle', 1],
  ['margin', 1],
  ['mask', 1],
  ['maskBorder', 2],
  ['offset', 1],
  ['outline', 1],
  ['overflow', 1],
  ['padding', 1],
  ['placeContent', 1],
  ['placeItems', 1],
  ['placeSelf', 1],
  ['textDecoration', 1],
  ['textEmphasis', 1],
  ['transition', 1],
]);
const maxSpecificity = 3; // Math.max(...specificitiesByShorthandProperty.values()) + 1

function upperToHyphenLower(match: string): string {
  return `-${match.toLowerCase()}`;
}

function getClassName(identName: string): string {
  return isDev ? `DYNAMIC_${identName}` : `g${hash(identName)}`;
}

export function useDynamicStyling(): (
  identName: string,
  property: string,
  value: string | number,
  wrapRule?: (cssText: string) => string,
) => string {
  const { ruleManager } = useContext(StyleInjectorContext);
  const ownUsageCountsByClassName = useRef<{ [key in ClassRef]: number }>({})
    .current;

  // Remove dynamic styles which are not used anymore when unmounting
  useEffect(
    () => (): void => {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const className in ownUsageCountsByClassName) {
        const usageCount = ownUsageCountsByClassName[className];
        ruleManager.decreaseUsage(className, usageCount);
      }
    },
    // The dependencies never get re-assigned, so they can safely be omitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return function getDynamicClassName(
    identName: string,
    property: string,
    value: string | number,
    wrapRule?: (cssText: string) => string,
  ): string {
    // TODO: Use same hashing algorithm during static CSS generation
    const className = getClassName(identName);

    ruleManager.increaseUsage(className, () => {
      const selector = `.${isDev ? escape(className) : className}`.repeat(
        // Adjust specificity to let longhands override CSS shorthand properties
        specificitiesByShorthandProperty.get(property) || maxSpecificity,
      );

      const cssText = `${selector}{${
        // TODO: Abstract this logic away to a utility function
        // Convert CSS property to kebab-case and normalize numeric value
        `${property.replace(/[A-Z]/g, upperToHyphenLower)}:${
          typeof value === 'number' ? `${value}px` : value
        }`
      }}`;

      return wrapRule ? wrapRule(cssText) : cssText;
    });

    ownUsageCountsByClassName[className] =
      (ownUsageCountsByClassName[className] || 0) + 1;

    return className;
  };
}
