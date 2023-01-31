const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(commonConfig, devConfig)
    case env.production:
      return merge(commonConfig, prodConfig)
  }
}
