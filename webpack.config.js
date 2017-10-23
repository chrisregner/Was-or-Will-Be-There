const { resolve } = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/main.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),

    // path of output bundle relative to HTML file, necessary for live editing
    publicPath: '/js/',
  },
  devServer: {
    // Respond to 404s with index.html
    historyApiFallback: true,

    // Location of static assets (e.g. HTML file)
    contentBase: resolve(__dirname, 'dist'),

    // must be the same as output.publicPath, necessary for live editing
    publicPath: '/js/',
  },

  // TODO: should be 'source-map' if prod
  devtool: 'cheap-module-eval-source-map',

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
            'react'
          ],
          plugins: [
            'react-hot-loader/babel',
            'transform-object-rest-spread',
            'transform-class-properties',
          ]
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    alias: {
      components: resolve(__dirname, 'app/components'),
      services: resolve(__dirname, 'app/services'),
    },
  },
}
