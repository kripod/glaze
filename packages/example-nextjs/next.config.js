// @ts-nocheck

const withTM = require('next-transpile-modules')(['glaze']);
const TreatPlugin = require('treat/webpack-plugin');

module.exports = withTM({
  webpack: (config, { isServer }) => {
    config.plugins.push(new TreatPlugin({ outputCSS: !isServer }));
    return config;
  },
});
