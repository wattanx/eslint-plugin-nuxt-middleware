import { TSESTree } from '@typescript-eslint/utils';

export const isCallExpression = (
  declaration: TSESTree.DefaultExportDeclarations
): declaration is TSESTree.CallExpression =>
  declaration.type === 'CallExpression';

export const isIdentifier = (
  declaration: TSESTree.LeftHandSideExpression
): declaration is TSESTree.Identifier => declaration.type === 'Identifier';

export const isObjectExpression = (
  arg: TSESTree.CallExpressionArgument
): arg is TSESTree.ObjectExpression => arg.type === 'ObjectExpression';

export const isProperty = (
  node: TSESTree.ObjectLiteralElement
): node is TSESTree.Property => node.type === 'Property';
