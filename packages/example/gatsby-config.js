const siteMetadata = {
  name: 'glaze',
  description:
    'Atomic CSS-in-JS framework for building approachable design systems.',
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        ...siteMetadata,
        display: 'minimal-ui',
        // TODO: theme_color: '#663399',
        // TODO: background_color: 'white',
        // TODO: icon: 'src/assets/favicon.png',
        lang: 'en-US',
        start_url: '/',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-treat',
    'gatsby-plugin-typescript',
  ],
};
