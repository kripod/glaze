module.exports = {
  title: 'glaze',
  tagline: 'CSS-in-JS framework for building approachable design systems',
  url: 'https://glaze.js.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'kripod',
  projectName: 'glaze',
  themeConfig: {
    prism: {
      /* eslint-disable global-require, import/no-extraneous-dependencies */
      theme: require('prism-react-renderer/themes/nightOwl'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      /* eslint-enable global-require, import/no-extraneous-dependencies */
    },
    navbar: {
      title: 'glaze',
      logo: {
        alt: 'glaze logo (donut emoji)',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/doc1',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/kripod/glaze',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/glaze',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kripod/glaze',
            },
          ],
        },
      ],
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
