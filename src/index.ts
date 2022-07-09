import rule from './rules/no-unresolved-middleware';

export = {
  rules: {
    'no-unresolved-middleware': rule,
  },
  configs: {
    all: {
      plugins: ['nuxt-middleware'],
      rules: {
        'nuxt-middleware/no-unresolved-middleware': 'error',
      },
    },
  },
};
