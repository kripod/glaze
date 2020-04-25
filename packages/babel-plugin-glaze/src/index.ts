/* eslint-disable @typescript-eslint/explicit-function-return-type, no-param-reassign */

import { NodePath, PluginObj, template, types } from '@babel/core';

/* Source: https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js */
function isComponentName(name: string): boolean {
  return !/^[a-z]/.test(name);
}

/* Source: https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js */
function isHookName(name: string): boolean {
  return /^use[A-Z0-9].*$/.test(name);
}

/* Source: https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js */
function isComponent(node: types.Node): boolean {
  return types.isIdentifier(node) && isComponentName(node.name);
}

/* Source: https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js */
function isHook(node: types.Node): boolean {
  if (types.isIdentifier(node)) {
    return isHookName(node.name);
  }
  if (
    types.isMemberExpression(node) &&
    !node.computed &&
    types.isIdentifier(node.property) &&
    isHook(node.property)
  ) {
    return types.isIdentifier(node.object) && node.object.name === 'React';
  }
  return false;
}

/* Source: https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js#L542 */
function getFunctionIdentifier(path: NodePath): types.Identifier | undefined {
  const { node } = path;
  const { parent } = path;

  if (path.isFunctionDeclaration()) {
    return path.node.id || undefined;
  }
  if (path.isFunctionExpression()) {
    return path.node.id || undefined;
  }

  if (path.isFunctionExpression() || path.isArrowFunctionExpression()) {
    if (
      types.isVariableDeclarator(parent) &&
      parent.init === node &&
      types.isIdentifier(parent.id)
    ) {
      return parent.id;
    }
    if (
      types.isAssignmentExpression(parent) &&
      parent.right === node &&
      parent.operator === '=' &&
      types.isIdentifier(parent.left)
    ) {
      return parent.left;
    }
    if (
      types.isProperty(parent) &&
      parent.value === node &&
      types.isIdentifier(parent.key)
    ) {
      return parent.key;
    }
    if (
      types.isAssignmentPattern(parent) &&
      parent.right === node &&
      types.isIdentifier(parent.left)
    ) {
      return parent.left;
    }
  } else {
    return undefined;
  }
  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findNearestParentComponent(path: NodePath<any>): NodePath | undefined {
  while (path) {
    const { scope } = path;
    const node = path.scope.path;

    if (types.isExportDefaultDeclaration(scope.path.parent)) {
      return node;
    }

    const functionIdentifier = getFunctionIdentifier(scope.path);

    if (functionIdentifier) {
      if (isComponent(functionIdentifier) || isHook(functionIdentifier)) {
        return node;
      }
    }
    path = scope.path.parentPath;
  }
  return undefined;
}

module.exports = function plugin({
  types: t,
}: {
  types: typeof types;
}): PluginObj<{
  hasSxProps: boolean | undefined;
  useStylingImportName: string;
  glazeImportDeclaration: types.ImportDeclaration | undefined;
  pathsToAddHook: Set<NodePath<types.Function>>;
}> {
  return {
    name: 'babel-plugin-glaze',
    visitor: {
      Program: {
        enter(path, state) {
          state.hasSxProps = false;
          state.useStylingImportName = 'useStyling';
          state.pathsToAddHook = new Set();

          const { node } = path;
          // Check if something from glaze is already imported
          const glazeImportDeclaration = node.body.find(
            (s) => t.isImportDeclaration(s) && s.source.value === 'glaze',
          );

          // Something is already imported from glaze
          if (t.isImportDeclaration(glazeImportDeclaration)) {
            state.glazeImportDeclaration = glazeImportDeclaration;
            // Check if it's `useStyling` which is imported
            const useStylingImport = glazeImportDeclaration.specifiers.find(
              (s) => t.isImportSpecifier(s) && s.imported.name === 'useStyling',
            );

            if (useStylingImport) {
              state.useStylingImportName = useStylingImport.local.name;
            }
          }
        },
        exit(path, { hasSxProps, glazeImportDeclaration }) {
          if (hasSxProps) {
            const importUseStyling = template.ast`import { useStyling } from 'glaze'`;

            // Something is already imported from glaze
            if (glazeImportDeclaration) {
              // Check if it's `useStyling` which is imported
              const useStylingImport = glazeImportDeclaration.specifiers.find(
                (s) =>
                  t.isImportSpecifier(s) && s.imported.name === 'useStyling',
              );

              // If it's not `useStyling`, we add it to the import
              if (!useStylingImport) {
                glazeImportDeclaration.specifiers.push(
                  t.importSpecifier(
                    t.identifier('useStyling'),
                    t.identifier('useStyling'),
                  ),
                );
              }
            }
            // Nothing imported yet from glaze
            else {
              path.unshiftContainer('body', importUseStyling);
            }
          }
        },
      },
      Function: {
        exit(path, state) {
          if (state.pathsToAddHook.has(path)) {
            const nodeToAddHook = path.node;
            const createUseStylingHook = template.statement.ast`
            const sx = ${state.useStylingImportName}();
           `;

            if (t.isBlockStatement(nodeToAddHook.body)) {
              /* Verify that the hook is not yet created.
                 If not,we create it
              */

              const block = nodeToAddHook.body;
              const isAlreadyImported = block.body.some(
                (st) =>
                  t.isVariableDeclaration(st) &&
                  st.declarations.find(
                    (decl) =>
                      t.isCallExpression(decl.init) &&
                      t.isIdentifier(decl.init.callee, {
                        name: state.useStylingImportName,
                      }),
                  ),
              );
              if (!isAlreadyImported) {
                nodeToAddHook.body.body.unshift(createUseStylingHook);
              }
            } else {
              /* Not a block statement. We first need to create one. Example:

                const Comp = () => <div sx={{color: "blue"}}>hello</div>

                Should become:

                const Comp = () => {
                  return <div sx={{color: "blue"}}>hello</div>
                }
              */
              nodeToAddHook.body = t.blockStatement([
                createUseStylingHook,
                t.returnStatement(nodeToAddHook.body),
              ]);
            }
          }
        },
      },
      JSXAttribute(path, state) {
        const { node } = path;

        if (t.isJSXIdentifier(node.name, { name: 'sx' })) {
          const jsxIdentifier = node.name;
          if (t.isJSXExpressionContainer(node.value)) {
            if (t.isExpression(node.value.expression)) {
              /* 1. We set this value so we know that somewhere in the file
                 the `sx` props is used.We will need therefore to import
                 `useStyling` hook from 'glaze'. This is done in the Program exit.
              */
              state.hasSxProps = true;

              /* 2. Find the nearest parent component (or the current scope)
                 and add it to a list that will be processed wihtin the
                 Function exit. This is where we will create de `sx` variable:
                 `const sx = useStyling()`
              */
              const pathsToAddHook =
                findNearestParentComponent(path) || path.scope.path;

              if (pathsToAddHook.isFunction()) {
                state.pathsToAddHook.add(pathsToAddHook);
              }

              /* 3. This is where we transform the `sx` props */
              if (t.isJSXOpeningElement(path.parent)) {
                const objectExpression = node.value.expression;

                // Remove the `sx` props
                path.remove();

                // Check if a className props already exists
                let classNameAttributeIdentifier = path.parent.attributes.find(
                  (a) =>
                    t.isJSXAttribute(a) &&
                    t.isJSXIdentifier(a.name, { name: 'className' }),
                );

                if (t.isJSXAttribute(classNameAttributeIdentifier)) {
                  // A className props already exists
                  const classNameNode = classNameAttributeIdentifier.value;
                  const baseTemplateLiteral = t.templateLiteral(
                    [
                      t.templateElement({ raw: '' }, false),
                      t.templateElement({ raw: '' }, true),
                    ],
                    [
                      t.callExpression(t.identifier(jsxIdentifier.name), [
                        objectExpression,
                      ]),
                    ],
                  );

                  /* Handle the case where className is currently a
                     an expression. E.g: `className={fn(...)}` or
                     `className={isValid ? "my-class" : ""}`
                  */
                  if (
                    t.isJSXExpressionContainer(classNameNode) &&
                    t.isExpression(classNameNode.expression)
                  ) {
                    baseTemplateLiteral.quasis.splice(
                      1,
                      0,
                      t.templateElement({ raw: ' ' }, false),
                    );
                    baseTemplateLiteral.expressions.unshift(
                      classNameNode.expression,
                    );
                  } else if (t.isStringLiteral(classNameNode)) {
                    /* Handle the case where the className is currently a string */
                    if (classNameNode.value !== '') {
                      baseTemplateLiteral.quasis[0] = t.templateElement(
                        { raw: `${classNameNode.value} ` },
                        false,
                      );
                    }
                  }
                  classNameAttributeIdentifier.value = t.jsxExpressionContainer(
                    baseTemplateLiteral,
                  );
                } else {
                  /* Handle the case where no className exists yet */
                  classNameAttributeIdentifier = t.jsxAttribute(
                    t.jsxIdentifier('className'),
                    t.jsxExpressionContainer(
                      t.callExpression(t.identifier(jsxIdentifier.name), [
                        objectExpression,
                      ]),
                    ),
                  );
                  path.parent.attributes.unshift(classNameAttributeIdentifier);
                }
              }
            }
          }
        }
      },
    },
  };
};
