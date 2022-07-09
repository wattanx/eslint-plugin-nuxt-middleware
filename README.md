# no-unresolved-middleware

Checks for the presence of Nuxt.js middleware.

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
