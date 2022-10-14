const defaultConfig = require('@wordpress/scripts/config/webpack.config.js')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(process.cwd(), 'public/src/js', 'index.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'public/build')
  },
  optimization: {
    ...defaultConfig.optimization,
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ]
  },
  plugins: [
    ...defaultConfig.plugins,
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
