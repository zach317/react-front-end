const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 相对路径转绝对路径
const pathResolve = (_path) => path.resolve(__dirname, _path)

module.exports = {
  entry: pathResolve('../src/index.jsx'),
  output: {
    path: pathResolve('../dist'),
    filename: 'scripts/[name].bundle.js',
    clean: true, // 每次执行完打包之后都将上次打包残留的文件清理掉
    assetModuleFilename: 'images/[contenthash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: 'babel-loader',
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathResolve('../public/index.html'),
      filename: 'index.html',
      title: 'react+webpack',
      favicon: pathResolve('../public/favicon.ico'),
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'styles/[name].[contenthash].css',
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // 从左到右按顺序
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },
}
