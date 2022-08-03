import { resolve } from './../utils/resolve';
import {
  isCallExpression,
  isIdentifier,
  isObjectExpression,
  isProperty,
} from './../utils/type-guard';
import { TSESLint } from '@typescript-eslint/utils';
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

        if (!isObjectExpression(arg)) {
          return;
        }

        const properties = arg.properties;

        const middlewareNode = properties.find(
          (x) =>
            x.type === 'Property' &&
            x.key.type === 'Identifier' &&
            x.key.name === 'middleware'
        );

        if (!middlewareNode) {
          return;
        }

        if (!isProperty(middlewareNode)) {
          return;
        }

        if (
          middlewareNode.value.type !== 'Literal' &&
          middlewareNode.value.type !== 'ArrayExpression'
        ) {
          return;
        }

        const report = (middlewareFile: string) => {
          const isFileExist = resolve(middlewareDir, middlewareFile);

          if (isFileExist) {
            return;
          }
          context.report({
            node,
            messageId: 'noUnresolvedMiddleware',
            data: {
              fileName: middlewareFile,
            },
          });
        };

        if (middlewareNode.value.type === 'Literal') {
          const middlewareFile = middlewareNode.value.value?.toString();

          if (!middlewareFile) {
            return;
          }

          report(middlewareFile);
        } else if (middlewareNode.value.type === 'ArrayExpression') {
          const middlewareFiles = middlewareNode.value.elements;

          if (!middlewareFiles) {
            return;
          }

          middlewareFiles.forEach((x) => {
            if (x.type !== 'Literal') {
              return;
            }

            const middlewareFile = x.value?.toString();

            if (!middlewareFile) {
              return;
            }

            report(middlewareFile);
          });
        }
      },
    };
  },
};

export default rule;
