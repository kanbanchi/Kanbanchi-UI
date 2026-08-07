import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

// Ported 1:1 from the former tslint.json. No shared preset is extended on
// purpose: tslint ran a hand-picked rule set, so pulling in eslint/tseslint
// "recommended" here would turn a lint migration into a code-fixing project.
export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'static/**',
      'public/**',
      '.storybook/**',
      'stories/**',
      'src/**/*.js',
      'src/**/*.jsx',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // class-name + interface-name: [true, "always-prefix"]
      '@typescript-eslint/naming-convention': ['error',
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
      ],

      // eofline
      '@stylistic/eol-last': ['error', 'always'],

      // indent: [true, "spaces"] — tslint checked only the character, not the
      // width, so no-tabs is the faithful port (not @stylistic/indent).
      '@stylistic/no-tabs': 'error',

      // max-file-line-count: [true, 1015]
      'max-lines': ['error', { max: 1015, skipBlankLines: false, skipComments: false }],

      // no-consecutive-blank-lines
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],

      // no-construct
      'no-new-wrappers': 'error',

      // no-debugger
      'no-debugger': 'error',

      // no-eval
      'no-eval': 'error',

      // no-internal-module ("namespace" keyword instead of "module")
      '@typescript-eslint/prefer-namespace-keyword': 'error',

      // no-reference
      '@typescript-eslint/triple-slash-reference': ['error',
        { path: 'never', types: 'never', lib: 'never' },
      ],

      // no-trailing-whitespace
      '@stylistic/no-trailing-spaces': 'error',

      // no-var-keyword
      'no-var': 'error',

      // quotemark: [true, "single", "jsx-double", "avoid-escape"]
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],

      // triple-equals: [true, "allow-null-check", "allow-undefined-check"]
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // typedef-whitespace: nospace before, onespace after.
      // tslint scoped this to call/index signatures, parameters, property and
      // variable declarations — i.e. the ":" only. The "=>" of a function type
      // was never checked, so it keeps the conventional spaced form.
      // The rule's defaults are exactly this, so no options are passed.
      '@stylistic/type-annotation-spacing': 'error',

      // use-isnan
      'use-isnan': 'error',
    },
  },
);
