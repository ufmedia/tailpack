const defaultConfig = require('@wordpress/scripts/config/webpack.config.js')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(process.cwd(), 'public/src/js/', 'index.js')
  },
  output: {
    path: path.resolve(process.cwd(), 'public/build')
  },
  watchOptions: {
    ignored: [
      path.resolve(process.cwd(), 'public/build'),
      path.resolve(process.cwd(), 'node_modules')
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), 'public')
    },
    devMiddleware: {
      writeToDisk: true
    },
    compress: true,
    port: 9000
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
      proxy: 'http://localhost:9000/' //Use a proxy when using an existing local server.
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WatchExternalFilesPlugin({
      files: [
        './**/*.php',
        './**/*.twig',
        './**/*.html',
        '!./node_modules',
        '!./public/build/**/*'
      ]
    })
  ]
}