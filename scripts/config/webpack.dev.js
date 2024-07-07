const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const proxyConfigs = require('../../src/setProxy');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 地址
    port: SERVER_PORT, // 端口
    hot: true, // 热更新
    bonjour: false, //广播开发服务器
    client: {
      logging: 'info', // 日志等级
      overlay: true, // 在浏览器中显示编译错误
    },
    compress: true, // 是否启用 gzip 压缩
    open: false, // 打开默认浏览器
    historyApiFallback: true, // 404 响应重定向到 index.html 文件。
    // overlay: { warnings: true, errors: true }, // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
    // proxy: { ...proxyConfigs },//代理（处理跨域问题）
  },
});
