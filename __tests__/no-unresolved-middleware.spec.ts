import { TSESLint } from '@typescript-eslint/utils';
import rule from '../src/rules/no-unresolved-middleware';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('no-unresolved-middleware', rule, {
  valid: [
    {
      code: `
    <script>
    export default defineComponent({
      middleware: 'sample'
    })
    </script>`,
      options: [{ srcDir: '/' }],
    },
  ],
  invalid: [
    {
      code: `
      <script>
      export default defineComponent({
        middleware: 'test'
      })
      </script>`,
      errors: [
        {
          messageId: 'noUnresolvedMiddleware',
        },
      ],
    },
    {
      code: `
      <script>
      export default defineComponent({
        middleware: ['test', 'test2']
      })
      </script>`,
      errors: [
        {
          messageId: 'noUnresolvedMiddleware',
        },
        {
          messageId: 'noUnresolvedMiddleware',
        },
      ],
    },
  ],
});
