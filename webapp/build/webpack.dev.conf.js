var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var OfflinePlugin = require('offline-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json', to: 'manifest.json' },
      // { from: 'src/service-worker.js', to: 'sw.js' },
      { from: 'src/assets/launcher-icon.png', to: 'launcher-icon.png' },
      { from: 'src/assets/launcher-icon-96.png', to: 'launcher-icon-96.png' },
      { from: 'src/assets/launcher-icon-144.png', to: 'launcher-icon-144.png' },
      { from: 'src/assets/launcher-icon-192.png', to: 'launcher-icon-192.png' },
      { from: 'src/assets/launcher-icon-256.png', to: 'launcher-icon-256.png' },
      { from: 'src/assets/powered-by-mangopay.png', to: 'powered-by-mangopay.png' },
      { from: 'src/assets/slide-img-es.png', to: 'slide-img-es.png' },
      { from: 'src/assets/slide-img-fr.png', to: 'slide-img-fr.png' },
      // favicon icons
      { from: 'src/assets/icons/android-icon-36x36.png', to: '' },
      { from: 'src/assets/icons/android-icon-48x48.png', to: 'android-icon-48x48.png' },
      { from: 'src/assets/icons/android-icon-72x72.png', to: 'android-icon-72x72.png' },
      { from: 'src/assets/icons/android-icon-96x96.png', to: 'android-icon-96x96.png' },
      { from: 'src/assets/icons/android-icon-144x144.png', to: 'android-icon-144x144.png' },
      { from: 'src/assets/icons/android-icon-192x192.png', to: 'android-icon-192x192.png' },
      { from: 'src/assets/icons/apple-icon-57x57.png', to: 'apple-icon-57x57.png' },
      { from: 'src/assets/icons/apple-icon-60x60.png', to: 'apple-icon-60x60.png' },
      { from: 'src/assets/icons/apple-icon-72x72.png', to: 'apple-icon-72x72.png' },
      { from: 'src/assets/icons/apple-icon-76x76.png', to: 'apple-icon-76x76.png' },
      { from: 'src/assets/icons/apple-icon-114x114.png', to: 'apple-icon-114x114.png' },
      { from: 'src/assets/icons/apple-icon-120x120.png', to: 'apple-icon-120x120.png' },
      { from: 'src/assets/icons/apple-icon-144x144.png', to: 'apple-icon-144x144.png' },
      { from: 'src/assets/icons/apple-icon-152x152.png', to: 'apple-icon-152x152.png' },
      { from: 'src/assets/icons/apple-icon-180x180.png', to: 'apple-icon-180x180.png' },
      { from: 'src/assets/icons/apple-icon-precomposed.png', to: 'apple-icon-precomposed.png' },
      { from: 'src/assets/icons/apple-icon.png', to: 'apple-icon.png' },
      { from: 'src/assets/icons/browserconfig.xml', to: 'browserconfig.xml' },
      { from: 'src/assets/icons/favicon-16x16.png', to: 'favicon-16x16.png' },
      { from: 'src/assets/icons/favicon-32x32.png', to: 'favicon-32x32.png' },
      { from: 'src/assets/icons/favicon-96x96.png', to: 'favicon-96x96.png' },
      { from: 'src/assets/icons/favicon.ico', to: 'favicon.ico' },
      { from: 'src/assets/icons/ms-icon-70x70.png', to: 'ms-icon-70x70.png' },
      { from: 'src/assets/icons/ms-icon-144x144.png', to: 'ms-icon-144x144.png' },
      { from: 'src/assets/icons/ms-icon-150x150.png', to: 'ms-icon-150x150.png' },
      { from: 'src/assets/icons/ms-icon-310x310.png', to: 'ms-icon-310x310.png' },
    ]),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new OfflinePlugin()
  ]
})
