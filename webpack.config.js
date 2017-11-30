const { resolve } = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDevServer = !!process.argv.find(v => v.includes('webpack-dev-server'))
const isProd = process.env.NODE_ENV === 'production'
const prodUrl = 'https://chrisregner.github.io/plans-and-journals/'

module.exports = {
  entry: (isProd && !isDevServer)
    ? [
      'babel-polyfill',
      './app/preloaded.js',
      './app/main.js',
    ]
    : [
      'babel-polyfill',
      'react-hot-loader/patch',
      './app/preloaded.js',
      './app/main.js',
    ],
  output: {
    filename: (isProd && !isDevServer) ? 'js/[name].[hash].js' : 'js/bundle.js',
    path: resolve(__dirname, 'dist'),

    // path of output bundle relative to HTML file, necessary for live editing
    publicPath: (isProd && !isDevServer) ? prodUrl : '/',
  },
  devServer: {
    // Respond to 404s with index.html
    historyApiFallback: true,

    // Location of static assets (e.g. HTML file)
    contentBase: resolve(__dirname, 'dist'),

    // Must be the same as output.publicPath, necessary for live editing
    publicPath: (isProd && !isDevServer) ? prodUrl : '/',
  },

  // Solution for request/request-promise issue
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  // TODO: should be 'source-map' if prod
  devtool: (isProd && !isDevServer) ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', { modules: false }],
            'react',
            ...((isProd && !isDevServer) ? ['react-optimize'] : []),
          ],
          plugins: [
            ...(!isProd
              ? ['react-hot-loader/babel']
              : []),
            ...((isProd && !isDevServer)
              ? [
                'styled-components',
                'tailcall-optimization',
                'minify-constant-folding',
              ]
              : ['react-hot-loader/babel']),
            'transform-object-rest-spread',
            'transform-class-properties',
            'transform-object-entries',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: (isProd && !isDevServer)
              ? { importLoaders: 1 }
              : {},
          },
          ...((isProd && !isDevServer) ? [] : [{
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-flexibility')(),
                require('postcss-flexbugs-fixes')(),
                require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
          }]),
        ],
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      components: resolve(__dirname, 'app/components'),
      containers: resolve(__dirname, 'app/containers'),
      services: resolve(__dirname, 'app/services'),
      state: resolve(__dirname, 'app/state'),
      constants: resolve(__dirname, 'app/constants'),
    },
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, 'dist/index.html'),
      template: resolve(__dirname, 'app/index-template.html'),
      inlineManifestWebpackName: 'webpackManifest',
    }),
    ...((isProd && !isDevServer)
      ? [
        new BundleAnalyzerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new ChunkManifestPlugin({
          filename: 'chunk-manifest.json',
          manifestVariable: 'webpackManifest',
          inlineManifest: true,
        }),
      ]
      : []),
  ],
}
