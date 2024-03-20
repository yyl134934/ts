module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-prettier',
    'stylelint-selector-bem-pattern',
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      componentName: '[A-Z]+',
      componentSelectors: {
        initial: '^\\.{componentName}(?:-[a-z]+)?$',
        combined: '^\\.combined-{componentName}-[a-z]+$',
      },
      utilitySelectors: '^\\.util-[a-z]+$',
    },
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always',
    'prettier/prettier': true,
    'selector-class-pattern': null,
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
