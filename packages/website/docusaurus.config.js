module.exports = {
  title: 'glaze',
  tagline:
    'CSS-in-JS microlibrary for making design systems approachable with React',
  url: 'https://glaze.js.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'kripod',
  projectName: 'glaze',
  themeConfig: {
    announcementBar: {
      id: 'approaching-v0_6',
      content:
        'Please note that the instructions are being rewritten for an upcoming version of glaze. Stay tuned for updates.',
      textColor: 'white',
    },
    image: 'img/cover.png',
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
          to: 'docs/introduction',
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
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://twitter.com/kripod97" target="_blank" rel="noopener noreferrer">Kristóf Poduszló</a><br>Released under the MIT License`,
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
