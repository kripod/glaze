const {
  getClientStyleLoader,
} = require('next/dist/build/webpack/config/blocks/css/loaders/client');
const TreatPlugin = require('treat/webpack-plugin');

module.exports = {
  webpack: (config, { dev, isServer, config: { assetPrefix } }) => {
    config.plugins.push(
      new TreatPlugin({
        outputCSS: !isServer,
        outputLoaders: [
          // Extract static CSS in production
          // Logic adopted from https://github.com/zeit/next.js/blob/ee0081356d7ea166dfed4765f134730c11ecaecf/packages/next/build/webpack/config/blocks/css/loaders/global.ts#L13-L22
          !isServer
            ? getClientStyleLoader({ isDevelopment: dev, assetPrefix })
            : '',
        ],
      }),
    );
    return config;
  },
};
