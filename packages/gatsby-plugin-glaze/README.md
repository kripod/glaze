# 🍩 gatsby-plugin-glaze

Applies glaze theming on Gatsby sites.

## 📚 Usage

0. Install the package and its peer dependencies along with the [Gatsby plugin for treat][]:

   ```sh
   npm install gatsby-plugin-glaze gatsby-plugin-treat glaze treat
   ```

1. Add newly installed plugins to `gatsby-config.js`:

   ```js
   module.exports = {
     plugins: ['gatsby-plugin-glaze', 'gatsby-plugin-treat'],
   };
   ```

2. Override the default theme, as shown through an [example project][]:

   ```js
   /* src/gatsby-plugin-glaze/theme.treat.js */

   import { createTheme, defaultTokens } from 'glaze';

   export default createTheme({
     ...defaultTokens,
     // Customization…
   });
   ```

## ⚙️ Options

Additional configuration can be specified using [Gatsby plugin options][]:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-glaze',
      options: {
        // Reduce client runtime size by omitting style generation on the fly
        disableStyleInjection: true,
      },
    },
    ,
    'gatsby-plugin-treat',
  ],
};
```

[gatsby plugin for treat]: https://www.npmjs.com/package/gatsby-plugin-treat
[example project]: https://github.com/kripod/glaze/tree/master/packages/example-gatsby
[gatsby plugin options]: https://www.gatsbyjs.org/docs/configuring-usage-with-plugin-options/
