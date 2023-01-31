module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '127.0.0.1',
    hot: true,
    port: 9000,
    open: true,
    //react配置路由之后，直接输入url显示404,是因为少了下面的配置
    historyApiFallback: true,
  },
}
