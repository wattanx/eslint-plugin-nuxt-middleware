import { TSESLint } from '@typescript-eslint/utils';
import rule from '../src/rules/no-unresolved-middleware';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});
// rule名, ルールの実装(先程実装したやつ), 成功ケースと失敗ケース
ruleTester.run('no-unresolved-middleware', rule, {
  // 成功ケース
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
  // 失敗ケース
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
  ],
});
