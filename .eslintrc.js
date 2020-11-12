const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin').configs.recommended;

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'react-hooks',
    'testing-library',
    'jest-dom'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    quotes: [
      'error',
      'single'
    ],
    'comma-dangle': [
      'warn',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline'
      }
    ],
    'object-curly-spacing': [
      'warn',
      'always'
    ],
    'array-bracket-spacing': [
      'warn',
      'never'
    ],
    'computed-property-spacing': [
      'warn',
      'never'
    ],
    'arrow-parens': [
      'warn',
      'as-needed'
    ],
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: false
      }
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxEOF: 0
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: Object.assign(typescriptEslintRecommended.rules, {
        '@typescript-eslint/no-unused-vars': 'off',
      })
    }
  ]
};
