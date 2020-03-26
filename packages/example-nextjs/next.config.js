// @ts-nocheck

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withTM = require('next-transpile-modules')(['glaze']);
const TreatPlugin = require('treat/webpack-plugin');

module.exports = withTM({
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new TreatPlugin({
        outputLoaders: [MiniCssExtractPlugin.loader],
        outputCSS: !isServer,
      }),
      new MiniCssExtractPlugin(),
    );
    return config;
  },
});
