module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: ['plugin:vue/essential', '@vue/prettier', 'eslint:recommended'],
}
