const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { IS_DEV, PROJECT_PATH, THEME } = require('../constants');

const getCssLoaders = (importLoaders) => [
  IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: IS_DEV,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      implementation: require('postcss'),
      postcssOptions: {
        plugins: [require('autoprefixer'), require('postcss-preset-env')],
      },
      sourceMap: IS_DEV,
    },
  },
];

const getMiniPlugins = () => {
  return [
    !IS_DEV &&
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
    !IS_DEV && new CssMinimizerPlugin(),
  ].filter(Boolean);
};

const getCacheGroups = () => {
  return {
    vendors: {
      // 项目基本框架等
      chunks: 'all',
      test: /[/\\]node_modules[/\\]/,
      priority: -10,
      name: 'vendors',
    },
    'async-commons': {
      // 异步加载公共包、组件等
      chunks: 'async',
      minChunks: 2,
      name: 'async-commons',
      priority: -20,
    },
    commons: {
      // 其他同步加载公共包
      chunks: 'all',
      minChunks: 2,
      name: 'commons',
      priority: -30,
    },
  };
};

module.exports = {
  // entry: { app: ['core-js', path.resolve(PROJECT_PATH, './src/index.tsx')] },
  entry: { app: path.resolve(PROJECT_PATH, './src/index.tsx') },
  target: 'web', // webpack 5之后需要指定，否则根据browserlist来定（影响热更新）
  output: {
    filename: `js/[name].${IS_DEV ? '' : '[chunkhash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  // externals: {
  //   // cdn配置，优化包的大小（网络不好切勿开启，会延长首屏加载时间）
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 244,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: getCacheGroups(),
    },
    minimize: !IS_DEV,
    minimizer: getMiniPlugins(),
  },
  performance: {
    maxEntrypointSize: 1024000, // 1MB
    maxAssetSize: 1024000, // 1MB
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: path.resolve(PROJECT_PATH, './src'),
      Components: path.resolve(PROJECT_PATH, './src/components'),
      Utils: path.resolve(PROJECT_PATH, './src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              worker: 4,
              workerParallelJobs: 50,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: IS_DEV,
              lessOptions: {
                // 【antd 主题色配置】如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                // modifyVars: THEME.light,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, // 超过限制转用file-loader
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: IS_DEV
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    // 打包静态文件
    // new CopyWebpackPlugin({
    //   patterns: [{ from: './src/assets', to: './assets', toType: 'dir' }],
    // }),
    new WebpackBar({
      name: IS_DEV ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
  ],
};
