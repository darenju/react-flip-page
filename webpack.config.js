const path = require('path');

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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
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
  },
};
