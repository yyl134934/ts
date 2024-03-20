const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const proxyConfigs = require('../../src/setProxy');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: SERVER_HOST, // 地址
    port: SERVER_PORT, // 端口
    hot: true, // 热更新
    bonjour: false, //广播开发服务器
    client: {
      logging: 'info', // 日志等级
    },
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    // overlay: { warnings: true, errors: true }, // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
    // proxy: { ...proxyConfigs },//代理（处理跨域问题）
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
});
