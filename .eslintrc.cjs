module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-var': 2,
    'prefer-const': 2,
    'prefer-destructuring': 2,
    'prefer-object-spread': 2,
    'no-unused-expressions': 2,
    'prefer-arrow-callback': 2,
    '@typescript-eslint/no-explicit-any': 2,
    'no-console': 1,
  },
  root: true,
  env: {
    node: true,
  }
};
