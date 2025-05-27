module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,        // ✅ 支持 Node.js 全局变量
    commonjs: true     // ✅ 支持 CommonJS (module.exports, require)
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid'
      }
    ],
    'no-debugger': 'off',
    // 'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    //允许使用_开头的变量不被此规则检查
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
  }
};
