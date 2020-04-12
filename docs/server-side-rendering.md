# Server-side rendering

While prerendering a page, the [CSSOM][] is inaccessible and thus, styles cannot be injected dynamically. However, a `VirtualStyleInjector` can collect the styles instead of applying them through injection:

```jsx
import { StyleInjectorProvider, VirtualStyleInjector } from 'glaze';
import { renderToString } from 'react-dom/server';

import theme from './src/theme.treat';

const injector = new VirtualStyleInjector();

const html = renderToString(
  <StyleInjectorProvider injector={injector}>{element}</StyleInjectorProvider>,
);
```

Afterwards, the collected styles can be retrieved as a single `<style>` element, which has to be added inside the document's `<head>`:

```jsx
const styleEl = injector.getStyleElement();

// Framework-dependent, e.g. `setHeadComponents()` in Gatsby v2
appendToHead(styleEl);
```

## Reference implementation

The [official Gatsby plugin](https://www.npmjs.com/package/gatsby-plugin-glaze) does everything above, as observable [in its source](../packages/gatsby-plugin-glaze/gatsby-ssr.js).

[cssom]: https://developer.mozilla.org/docs/Web/API/CSS_Object_Model
