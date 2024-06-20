import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-explicit-any': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-this-alias': 'warn',
    },
  },
  {
    ignores: ['**/node_modules/', '**/dist/'],
  },
];
