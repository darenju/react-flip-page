/* global __dirname */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'example/index.js'),
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'bundle.min.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', path.resolve(__dirname, 'src')]
  },
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
