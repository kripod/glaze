# glaze

Glaze provides a convenient styling solution by combining popular approaches into a simple yet highly customizable API.

Think of it as an atomic CSS-in-JS framework for building approachable design systems.

[![npm](https://img.shields.io/npm/v/glaze)](https://www.npmjs.com/package/glaze)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kripod/glaze.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kripod/glaze/context:javascript)
[![Travis (.com)](https://img.shields.io/travis/com/kripod/glaze)](https://travis-ci.com/kripod/glaze)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)

⚠️ **Glaze is heavily in development and yet to be documented. I'd appreciate any kind of contributions** ⚠️

Built upon [Treat](https://github.com/seek-oss/treat)'s lightweight runtime (by [Mark Dalgleish](https://twitter.com/markdalgleish), [Matt Jones](https://twitter.com/mattcompiles), [Michael Taranto](https://twitter.com/michaeltaranto), et al), Glaze works by picking atomic CSS classes on the fly, generated from a theme. Inline styles are then applied as a fallback whenever a static `className` is not available.

The theme interface was carefully crafted with extensibility in mind. Inspired by [Brent Jackson](https://twitter.com/jxnblk)'s [Theme UI](https://theme-ui.com) and styling tokens from [Tailwind CSS](https://tailwindcss.com) but with automatically inlined one-off styles. The value of a given property is resolved from a scale.

Custom shorthands (e.g. `paddingX`) and aliases (e.g. `px`, `bg`) can also be specified.

![screenshots of glaze code](https://pbs.twimg.com/media/ETrGtitXkAIsl63?format=jpg&name=large)

## How it works

1. Aliases are mapped to their corresponding CSS property names or custom shorthands.
2. Each item of a shorthand (or the CSS property itself) gets assigned to a value of the given scale.
3. Unknown shorthands are applied as inline styles.

It's like Webpack for CSS-in-JS.

For instance, `{ px: 4 }` is piped like:

1. `'px'` is aliased to `'paddingX'`
2. `'paddingX'` is the shorthand for `['paddingLeft', 'paddingRight']`
3. `'paddingLeft'` is resolved to `'spacing'`, `'paddingRight'` is resolved to `'spacing'`
4. The final value is `scales['spacing'][4]` (eg; `'1rem'`)

Resolved class names are static!

![screenshot of statges of compilation](https://pbs.twimg.com/media/ETrMtJ7WoAAKniV?format=jpg&name=large)

## Contributing

```
yarn
cd packages/example
yarn develop
```

Interesting files are:

```
packages
└── glaze
    └── src
        ├── theme.ts
        ├── useStyling.ts
        ├── useStyling.treat.ts
        └── treat.ts
```
