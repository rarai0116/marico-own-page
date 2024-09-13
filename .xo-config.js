module.exports = {
  // reactのeslintを適応する
  extends: ['plugin:@next/next/core-web-vitals', 'xo-react'],
  ignores: [
    'babel.config.js',
    'tsconfig.json',
    'tailwind.config.js',
    'next-env.d.ts',
    'next.config.mjs',
    'webpack.config.js',
    'README.md',
    '**/node_modules/**',
  ],
  rules: {
    // ファイル名はパスカルケース
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          pascalCase: true,
          camelCase: true,
        },
      },
    ],
    // reduceは使って良い
    'unicorn/no-array-reduce': ['off', { 'allowSimpleOperations': false }],
    // 原因不明だがエラーが出てLintが機能しなくなるため無効
    'unicorn/expiring-todo-comments': 'off',
    // コンポーネントはarrow関数で定義する

    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'lf',
        'singleQuote': true,
        'bracketSpacing': false,
      }
    ],
    // import文で拡張子チェックはいらない
    'import/extensions': 'off',
    // React 17以降はJSXの対応済みのための'React'のimportはいらない
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/hook-use-state': 'off',
    //コメントの一文字目は大文字でも小文字でも良い
    'capitalized-comments': 'off',
    //processをグローバルに使用することを許可
    'n/prefer-global/process': 0,
    'n/file-extension-in-import': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    //タイプにnullを指定することを許可
    '@typescript-eslint/ban-types': 0,
    // 関数の引数は4つまで。4以上だとオブジェクトにしてまとめる
    'max-params': ['error', 4],
    // elseの中でreturnすることを許可
    'no-else-return': 'off',
    // requireを使うのを許可
    'no-require-imports': 'off',
    // propsという名前を許可
    'unicorn/prevent-abbreviations': [
      'off',
      {
        'allowList': {
          'props': true,
          'Props': true,
        }
      }
    ],
    // import文で重複を許可
    'import/no-duplicates': ["off", { "prefer-inline": true }]
  },
  // prettierを有効にする
  prettier: true,
  space: 2,
  webpack: false, // webpackがうまく動かないため一時的に無効化
}