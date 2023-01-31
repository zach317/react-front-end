const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  mode: 'production',

  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
}
