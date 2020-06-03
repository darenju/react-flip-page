const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: path.resolve('src'),
  entry: {
    app: './index.jsx'
  },
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ReactFlipPage'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            stripdeclarations: true
          }
        }
      }
    ]
  },
  externals: {
    'react': 'react'
  }
};
