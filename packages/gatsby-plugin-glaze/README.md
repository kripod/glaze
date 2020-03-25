# 🍩 gatsby-plugin-glaze

Applies glaze theming on Gatsby sites.

## 📚 Usage

0. Install the package and its peer dependencies along with the [Gatsby plugin for treat][]:

   ```
   npm install gatsby-plugin-glaze glaze treat react-treat gatsby-plugin-treat
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

   import { createTheme, defaultTheme } from 'glaze';

   export default createTheme({
     ...defaultTheme,
     // Customization...
   });
   ```

[gatsby plugin for treat]: https://www.npmjs.com/package/gatsby-plugin-treat
[example project]: https://github.com/kripod/glaze/tree/master/packages/gatsby-plugin-glaze-example
