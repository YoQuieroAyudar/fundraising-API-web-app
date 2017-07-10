var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var OfflinePlugin = require('offline-plugin')

// const CopyWebpackPlugin = require('copy-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json', to: 'manifest.json' },
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
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new OfflinePlugin()
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
