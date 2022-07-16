# eslint-plugin-nuxt-middleware

## Install

```bash
npm install -D eslint-plugin-nuxt-middleware
```

```bash
yarn add -D eslint-plugin-nuxt-middleware
```

## Usage

```js:.eslintrc.js

module.exports = {
  plugins: ['nuxt-middleware'],
  rules: {
    'nuxt-middleware/no-unresolved-middleware': 'error',
  },
}
```

## Rules

| Rule ID                         | Description                                    |
| :------------------------------ | ---------------------------------------------- |
| `nuxt/no-unresolved-middleware` | Checks for the presence of Nuxt.js middleware. |

## Rule Details

### nuxt/no-unresolved-middleware

This rule outputs an error if a file that does not exist in the `middleware` directory is specified.

Examples of **incorrect** code for this rule:

```
middleware
  └─ middleware-sample.js
```

```vue
// pages/home.vue
<script lang="ts">
export default defineComponent({
  middleware: 'sample', // sample is not found.
});
</script>
```

Examples of **correct** code for this rule:

```
middleware
  └─ middleware-sample.js
```

```vue
// pages/home.vue
<script lang="ts">
export default defineComponent({
  middleware: 'middleware-sample',
});
</script>
```

Options

`srcDir`: Define the source directory of your Nuxt application.

```json
{
  "plugins": ["nuxt"],
  "rules": {
    "nuxt/no-unresolved-middleware": [
      "error",
      {
        "srcDir": "src"
      }
    ]
  }
}
```
