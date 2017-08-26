const base = require('./webpack.base.config');

const config = Object.assign({}, base, {
  devServer: {
    overlay: true,
    proxy: {
      '/**': {
        target: '/index.html',
        secure: false,
        bypass: function (req, res, opt) {
          return '/index.html';
        }
      }
    }
  }
});

module.exports = config;
