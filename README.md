# webpack react 快速启动

## 一、分支
- `react17 支持ie 11`
- react18

## 二、启动

```
// 项目安装
yarn install

// 开发环境
yarn dev

// 生产环境
yarn build

// 测试环境
yarn start
```

## 三、项目结构

```
PROJECT
│   .babelrc.js    
│   .commitlintrc.js    
│   .editorconfig 
│   .eslintignore 
│   .eslintrc.js
│   .gitignore
│   .npmrc
│   .prettierignore
│   .prettierrc
│   .stylelintrc.js
│   .package.json
│   .postcss.config.js
│   .postcss.config.js
│    README.md
│    tsconfig.json
│    
└───.vscode
│   │   extensions.json
│   │   settings.json
│   │
└───public
│   │   index.html
│   │
└───scripts
│   │   constants.js
│   │   
│   └───config
│   │   │   webpack.common.js
│   │   │   webpack.dev.js
│   │   │   webpack.prod.js
│   └───server
│       │   choseport.js
│       │   index.js
│       │   logger.js
└───src
    │   index.tsx
    │   index.css
    │   app.tsx
    │   app.css
    │   setProxy.js
    │   index.css
    │   index.css
    └───api
    └───pages
    └───assets
    └───baseUI
    └───components
    └───constants
    └───hooks
    └───routes
    └───store
    └───stories
    └───typings
    └───utils
```


## 四、技术架构

**开发**

* `TypeScript 5.x`
* `React 17.x`
* `React-Router 6.x`
* `AntD 4.x`
* `Less 4.x`
* `Axios 1.x`
* `React-Query 4.x`
  * eslint-plugin-query 4.x
* `Zustand 4.x`   
* `Lodash 4.x`
* `Dayjs 1.x`
* ~~Echarts~~ 


**打包、调试、解析**
* `Webpack 5.x`
  * cross-env
  * `loaders`
    * babel-loader
    * style-loader
      * stylelint-*
    * css-loader
      * autoprefixer
    * less-loader
    * postcss-loader
      * postcss-*
    * file-loader
    * url-loader
  * `plugins`
    * clean-webpack-plugin
    * copy-webpack-plugin
    * css-minimizer-webpack-plugin
    * fork-ts-checker-webpack-plugin // TypeScript support
    * html-webpack-plugin
    * mini-css-extract-plugin
    * webpack-bundle-analyzer
    * ~~terser-webpack-plugin~~
* `Babel 7.x`
  * babel/core
  * babel/preset-env
  * babel/preset-react
  * babel/preset-typescript
  * babel-plugin-import
  * babel/*
* `Chalk`
* `Detect-port`
* `Glob`

**规范**

* `ESLint 7.x`
  * eslint-import-*
  * eslint-config-*
  * eslint-plugin-*
* `StyleLint 16.x`
  * stylelint-*
* `CommitLint`
  * commitlint/cli
  * commitlint/config-conventional
* `Prettier 3.x`
* `Lint-Staged`
