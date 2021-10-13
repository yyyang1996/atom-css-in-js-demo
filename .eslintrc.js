module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['plugin:mikiya/react-ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    // '@typescript-eslint/interface-name-prefix': 0,
    // '@typescript-eslint/no-var-requires': 0,
    'react/prop-types': 0
  },
};
