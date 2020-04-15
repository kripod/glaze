module.exports = {
  title: 'glaze',
  tagline: 'CSS-in-JS microlibrary for making design systems approachable',
  url: 'https://glaze.js.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'kripod',
  projectName: 'glaze',
  themeConfig: {
    sidebarCollapsible: false,
    prism: {
      /* eslint-disable global-require, import/no-extraneous-dependencies */
      theme: require('prism-react-renderer/themes/nightOwl'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      /* eslint-enable global-require, import/no-extraneous-dependencies */
    },
    navbar: {
      hideOnScroll: true,
      title: 'glaze',
      logo: {
        alt: 'glaze logo (donut emoji)',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/getting-started',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/kripod/glaze',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://twitter.com/kripod97">Kristóf Poduszló</a><br>Released under the MIT License`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/kripod/glaze/edit/master/packages/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
