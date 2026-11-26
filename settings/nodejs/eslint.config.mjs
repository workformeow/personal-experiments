// @ts-check
import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  { ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'eslint.config.mjs'] },

  {
    files: ['src/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      prettier, // last: turns off rules that fight Prettier
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { import: importPlugin, 'unused-imports': unusedImports, n },
    rules: {
      // Correctness
      eqeqeq: 'error',
      curly: ['error', 'multi-line'],
      'no-eval': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/promise-function-async': 'warn',
      '@typescript-eslint/require-await': 'off',
      complexity: ['warn', { max: 15 }],

      // Node — keep the version in sync with .nvmrc / engines
      'n/no-deprecated-api': 'error',
      'n/no-extraneous-import': 'error',
      'n/no-unsupported-features/node-builtins': ['error', { version: '>=26' }],

      // Logging & env — log through a logger, read env through one validated module
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-process-env': 'warn',

      // Imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'import/no-relative-parent-imports': 'error', // `../x` → use the `@/` alias
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'after' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off', // handled by unused-imports (auto-fixable)
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
  },

  // The env module loads before any logger exists. Point this at your own file.
  {
    files: ['src/config/env.ts'],
    rules: { 'no-console': 'off', 'no-process-env': 'off' },
  }
)
