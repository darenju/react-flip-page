const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const base = require('./webpack.base.config.js');


const otherPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false, // Suppress uglification warnings
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true
    },
    output: {
      comments: false,
    },
    exclude: [/\.min\.js$/gi] // skip pre-minified libs
  }),
];

const config = Object.assign({}, base, {
  plugins: [
    ...otherPlugins,
    ...base.plugins
  ]
});

module.exports = config;
