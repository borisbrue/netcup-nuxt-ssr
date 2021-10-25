module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:wdio/recommended',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
    'wdio'
  ],
  // add your custom rules here
  rules: {}
}
