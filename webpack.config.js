const defaultConfig = require('@wordpress/scripts/config/webpack.config.js')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WatchExternalFilesPlugin = require ('webpack-watch-files-plugin').default


module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(process.cwd(), 'public/src/', 'index.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'public/build')
  },
  optimization: {
    ...defaultConfig.optimization
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    ...defaultConfig.plugins,
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      //proxy: 'http://localhost/' //Use a proxy when using an existing local server.
      server: { baseDir: ['public'] } //Use BrowserSync's server when not using an existing local server.
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WatchExternalFilesPlugin({
      files: [
        './**/*.php',
        './**/*.twig',
        '!./src/**/*',
        '!./node_modules/**/*',
        '!./build/**/*',
      ]
    })
  ]
}
