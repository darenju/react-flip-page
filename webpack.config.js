/* global __dirname */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  },
  // resolve: {
  //   modules: [__dirname, 'node_modules']
  // },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  stats: {
    colors: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js($|\?)|\.jsx($|\?)/,
        exclude: /node_modules/,
      }
    ]
  }
}
