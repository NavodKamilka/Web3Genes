/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': ['error', 'windows'], 'no-unused-vars': 'warn', 'no-underscore-dangle': ['error', { allow: ['_id'] }], 'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
