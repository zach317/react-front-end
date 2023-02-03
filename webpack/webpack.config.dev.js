module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  devServer: {
    host: '127.0.0.1',
    hot: true,
    port: 9000,
    open: true,
    // inline: true,
    //react配置路由之后，直接输入url显示404,是因为少了下面的配置
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        pathRewrite: { '^/api': '' },
        // changeOrigin: true,     // target是域名的话，需要这个参数，
        // secure: false,          // 设置支持https协议的代理
      },
    },
  },
}
