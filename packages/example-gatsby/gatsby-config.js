module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-glaze',
      options: { disableStyleInjector: true },
    },
    'gatsby-plugin-treat',
    'gatsby-plugin-typescript',
  ],
};
