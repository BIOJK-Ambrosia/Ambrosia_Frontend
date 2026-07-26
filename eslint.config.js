import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: true,
      },
      'boundaries/elements': [
        { type: 'domain', pattern: 'src/domain/*' },
        { type: 'application', pattern: 'src/application/*' },
        { type: 'infrastructure', pattern: 'src/infrastructure/*' },
        { type: 'presentation', pattern: 'src/presentation/*' },
        { type: 'app', pattern: 'src/app/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'domain' } },
              allow: { to: { element: { types: { anyOf: ['domain', 'shared'] } } } },
            },
            {
              from: { element: { type: 'application' } },
              allow: { to: { element: { types: { anyOf: ['application', 'domain', 'shared'] } } } },
            },
            {
              from: { element: { type: 'infrastructure' } },
              allow: {
                to: {
                  element: {
                    types: { anyOf: ['domain', 'application', 'infrastructure', 'shared'] },
                  },
                },
              },
            },
            {
              from: { element: { type: 'presentation' } },
              allow: {
                to: {
                  element: { types: { anyOf: ['presentation', 'application', 'shared', 'app'] } },
                },
              },
            },
            {
              from: { element: { type: 'app' } },
              allow: {
                to: {
                  element: {
                    types: {
                      anyOf: ['domain', 'application', 'infrastructure', 'presentation', 'shared'],
                    },
                  },
                },
              },
            },
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } },
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
)
