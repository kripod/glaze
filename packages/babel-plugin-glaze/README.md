# babel-plugin-glaze

> Transforms the `sx` prop for styling elements concisely with glaze

## Example

### In

```jsx
function Component() {
  return <p sx={{ color: 'green' }}>Hello, world!</p>;
}
```

### Out

```jsx
import { useStyling } from 'glaze';

function Component() {
  const sx = useStyling();
  return <p className={sx({ color: 'green' })}>Hello, world!</p>;
}
```

## Installation

Add the plugin to `devDependencies` with a package manager of choice, e.g. npm:

```shell
npm install --save-dev babel-plugin-glaze
```

## Usage

### With a configuration file (Recommended)

`.babelrc.json`:

```json
{
  "plugins": ["babel-plugin-glaze"]
}
```

### Via CLI

```shell
babel --plugins babel-plugin-glaze script.js
```

### Via Node API

```js
require('@babel/core').transform('code', {
  plugins: ['babel-plugin-glaze'],
});
```
