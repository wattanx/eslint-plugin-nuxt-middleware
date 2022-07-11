import { isCallExpression, isIdentifier } from './../utils/type-guard';
import { TSESLint } from '@typescript-eslint/utils';
import fs from 'fs';
import path from 'path';

const rule: TSESLint.RuleModule<
  'noUnresolvedMiddleware',
  { srcDir?: string }[]
> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Check for the presence of middleware.',
      recommended: 'error',
    },
    messages: {
      noUnresolvedMiddleware: '{{ fileName }} is not found.',
    },
    schema: [
      {
        type: 'object',
      },
    ],
    fixable: 'code',
  },
  create: (context) => {
    const srcDir = context.options[0]?.srcDir ?? '/';

    return {
      ExportDefaultDeclaration(node) {
        if (!context.getCwd) {
          return;
        }
        const middlewareDir = path.join(context.getCwd(), srcDir, 'middleware');

        if (!isCallExpression(node.declaration)) {
          return;
        }

        if (!isIdentifier(node.declaration.callee)) {
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

        const isJsExist = fs.existsSync(
          path.resolve(middlewareDir, middlewareFile + '.js')
        );

        const isTsExist = fs.existsSync(
          path.resolve(middlewareDir, middlewareFile + '.js')
        );

        if (isJsExist || isTsExist) {
          return;
        }

        context.report({
          node,
          messageId: 'noUnresolvedMiddleware',
          data: {
            fileName: middlewareFile,
          },
        });
      },
    };
  },
};

export default rule;
