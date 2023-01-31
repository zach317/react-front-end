// postcss是一个用js工具和插件转换css代码的工具，比如自动获取浏览器流行度和能够支持的属性，自动添加前缀等
// 需要安装postcss-loader以及相关插件autoprefixer
module.exports = {
  plugins: [require('autoprefixer')],
}
