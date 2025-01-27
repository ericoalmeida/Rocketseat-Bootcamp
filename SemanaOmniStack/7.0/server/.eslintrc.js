module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "new-cap" : ["error", { "newIsCap": false }],
    "new-cap" : ["error", { "capIsNewExceptionPattern": "^Person\.." }],
    "new-cap" : ["error", { "properties": true }]
  },
};
