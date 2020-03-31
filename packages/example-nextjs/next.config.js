// @ts-nocheck

const {
  getClientStyleLoader,
} = require('next/dist/build/webpack/config/blocks/css/loaders/client');
const withTM = require('next-transpile-modules')(['glaze']);
const TreatPlugin = require('treat/webpack-plugin');

module.exports = withTM({
  webpack: (config, { dev, isServer, config: { assetPrefix } }) => {
    config.plugins.push(
      new TreatPlugin({
        outputCSS: !isServer,
        outputLoaders: [
          !isServer
            ? getClientStyleLoader({ isDevelopment: dev, assetPrefix })
            : 'style-loader',
        ],
      }),
    );
    return config;
  },
});
