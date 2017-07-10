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
      { from: 'src/manifest.json', to: 'manifest/manifest.json' },
      // { from: 'src/service-worker.js', to: 'sw.js' },
      { from: 'src/assets/launcher-icon.png', to: 'logos/launcher-icon.png' },
      { from: 'src/assets/launcher-icon-96.png', to: 'logos/launcher-icon-96.png' },
      { from: 'src/assets/launcher-icon-144.png', to: 'logos/launcher-icon-144.png' },
      { from: 'src/assets/launcher-icon-192.png', to: 'logos/launcher-icon-192.png' },
      { from: 'src/assets/launcher-icon-256.png', to: 'logos/launcher-icon-256.png' },
      { from: 'src/assets/powered-by-mangopay.png', to: 'powered-by-mangopay.png' },
      { from: 'src/assets/slide-img-es.png', to: 'slide-img-es.png' },
      { from: 'src/assets/slide-img-fr.png', to: 'slide-img-fr.png' },
      { from: 'src/assets/launcher-icon-512.png', to: 'logos/launcher-icon-512.png'},
      { from: 'src/assets/Webapp-JeVaisAider-2.png', to: 'Webapp-JeVaisAider-2.png'},
      { from: 'src/assets/Webapp-JeVaisAider-1.png', to: 'Webapp-JeVaisAider-1.png'},
      { from: 'src/assets/Webapp-YoQuieroAyudar-2.png', to: 'Webapp-YoQuieroAyudar-2.png'},
      { from: 'src/assets/Webapp-YoQuieroAyudar-1.png', to: 'Webapp-YoQuieroAyudar-1.png'},
      { from: 'src/assets/Webapp-Plain-1.png', to: 'Webapp-Plain-1.png'},
      { from: 'src/assets/bg.png', to: 'bg.png'},
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
