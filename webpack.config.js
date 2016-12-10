var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/flipboard.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'flipboard.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
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
