import { TSESLint } from '@typescript-eslint/utils';
import fs from 'fs';
import path from 'path';

const rule: TSESLint.RuleModule<'noUnresolvedMiddleware', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Check for the presence of middleware.',
      recommended: 'error',
    },
    messages: {
      noUnresolvedMiddleware: 'Middleware is not resolved',
    },
    schema: [],
    fixable: 'code',
  },
  create: (context) => {
    return {
      ExportDefaultDeclaration(node) {
        const { declaration } = node;

        if (declaration.type !== 'CallExpression') {
          return;
        }

        if (declaration.callee.type !== 'Identifier') {
          return;
        }

        const { name } = declaration.callee;

        if (name !== 'defineComponent') {
          return;
        }

        if (node.declaration.type !== 'CallExpression') {
          return;
        }

        const arg = node.declaration.arguments[0];

        if (arg.type !== 'ObjectExpression') {
          return;
        }

        const properties = arg.properties;

        const middlewareNode = properties.find(
          (x) =>
            x.type === 'Property' &&
            x.key.type === 'Identifier' &&
            x.key.name === 'middleware'
        );

        if (middlewareNode?.type !== 'Property') {
          return;
        }

        if (middlewareNode.value.type !== 'Literal') {
          return;
        }

        const middlewareFile = middlewareNode.value.value?.toString();

        if (!middlewareFile) {
          return;
        }

        if (!context.getCwd) {
          return;
        }

        const isJsExist = fs.existsSync(
          path.resolve(context.getCwd(), 'middleware', middlewareFile + '.js')
        );

        const isTsExist = fs.existsSync(
          path.resolve(context.getCwd(), 'middleware', middlewareFile + '.js')
        );

        if (isJsExist || isTsExist) {
          return;
        }

        context.report({
          node,
          messageId: 'noUnresolvedMiddleware',
        });
      },
    };
  },
};

export default rule;
