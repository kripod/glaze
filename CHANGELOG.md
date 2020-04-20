# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.5.0 (2020-04-20)

### Bug Fixes

- exported function name for `useStyling` ([c3ec10f](https://github.com/kripod/glaze/commit/c3ec10fe06ea34b981dc713b6eebce3db8a1954e))
- literal union typing issue ([d767a44](https://github.com/kripod/glaze/commit/d767a449b560a0f484446f038751d34bd4d35348))
- **default-theme:** negative letter spacings ([1eb7a41](https://github.com/kripod/glaze/commit/1eb7a414a1c092bd0b06218ebf735f6788c4ec5c))
- **example:** encapsulation of TreatProvider ([5fabdb2](https://github.com/kripod/glaze/commit/5fabdb23f1a3ab555fa51eedc2a2d559a61966c6))
- **example:** theming ([06c435a](https://github.com/kripod/glaze/commit/06c435acf3495ea605c504e25a37f49e89a7c13c))
- **meta:** package versioning ([7955ce7](https://github.com/kripod/glaze/commit/7955ce79a559779ab0fac6bd9c18252b572de87d))
- **package:** module bundling compat with treat ([93f9ba7](https://github.com/kripod/glaze/commit/93f9ba7e02e70da95b7d45d0a8b115daa2e90028))
- auto-convert dynamic property keys and values ([4bca582](https://github.com/kripod/glaze/commit/4bca582aa1bbc91e4e6b917ca508d0560167ed30))
- dynamic style unmounting ([ff203cd](https://github.com/kripod/glaze/commit/ff203cd5ad9df9e276f4d2b3064fe5defabf2175))
- escape CSS class names during development ([3ec83d0](https://github.com/kripod/glaze/commit/3ec83d0949aae5d9096e11ca2b9e5b7f66efdbf7))
- **theme:** add missing resolvers ([b316434](https://github.com/kripod/glaze/commit/b31643417fd7e6e2c8fccd47407e038fb67dea01))
- **typings:** error when theme is not given ([e0d2c29](https://github.com/kripod/glaze/commit/e0d2c295d61903b48c177c5790a2ed59514da67e))
- only fire warnings during development ([239edda](https://github.com/kripod/glaze/commit/239edda8d13dbe5ce9b3cec93f03fd84914fe17b))
- package build failure when using ?. or ?? ([c691695](https://github.com/kripod/glaze/commit/c6916955ab0cd79763d7f345940535964a3ab2cb))
- rule management in StyleInjector ([47a1f93](https://github.com/kripod/glaze/commit/47a1f930a312eb55d2c2a8772c93868b9d6b03ac))
- rule replacement for dynamic styles ([5b3ba81](https://github.com/kripod/glaze/commit/5b3ba815b92ad28b60f23e8dcf9fc17e973bc54a))
- server-side rendering for dynamic styles ([fabc4af](https://github.com/kripod/glaze/commit/fabc4af8170cc09922dac6cc5107267e6f167436))
- **ci:** package resolution ([1f7ebfa](https://github.com/kripod/glaze/commit/1f7ebfa2266adfb3073a715613b56bba7c2f4d92))
- **example:** plugin build for Next.js ([89c6c32](https://github.com/kripod/glaze/commit/89c6c32381f21313bbf754e98be092572d7bf519))
- type checking script ([b0439ae](https://github.com/kripod/glaze/commit/b0439ae80b4628db156636ee1e4a2bc924e34cde))

### Code Refactoring

- **theme:** make specifying scales mandatory ([870d040](https://github.com/kripod/glaze/commit/870d0408acd450a4c15da0aa6c7c955b9677644d))
- **theme:** rename 'resolvers' to 'matchers' ([c363cf3](https://github.com/kripod/glaze/commit/c363cf3986f595a2759fedb08030f88e40e6ad7b))
- rename `defaultTheme` to `defaultTokens` ([6684dc5](https://github.com/kripod/glaze/commit/6684dc59d7bcd3918984ff118c0f218c0deba549))

### Features

- add experimental `useStaticStyling` internal ([4f095f6](https://github.com/kripod/glaze/commit/4f095f6bb53ca6ab8bcc579e708a0fcb53422add))
- **babel-plugin:** initial version ([#16](https://github.com/kripod/glaze/issues/16)) ([58d3ef6](https://github.com/kripod/glaze/commit/58d3ef61afdc98e2af4a073605a3e8ea926949cf))
- **default-theme:** add more letter spacings ([3e38eca](https://github.com/kripod/glaze/commit/3e38eca9846c1ee59cbfc3902309fcaafae7ca05))
- **injection:** hierarchic specificity emulation ([2e2e0fd](https://github.com/kripod/glaze/commit/2e2e0fd649d3cbf56ea601de16987827016ba5a6))
- **injector:** emulate source declaration order ([dc448bc](https://github.com/kripod/glaze/commit/dc448bc55c22f57e4830c77fcfec8c3fa11507de)), closes [#29](https://github.com/kripod/glaze/issues/29)
- **theme:** add duration scale for animations ([42ae12d](https://github.com/kripod/glaze/commit/42ae12d03293129c5fbc49cd3d2dee1074d1b312))
- add customizable logger, e.g. for Gatsby ([a0b47d4](https://github.com/kripod/glaze/commit/a0b47d4c392b7480f693a1263478cd629699a384))
- add NullStyleInjector with warnings ([5dacdf2](https://github.com/kripod/glaze/commit/5dacdf24a046b0a79bf799044eaf2939805acd56))
- add runtime theme tokens ([5c527f0](https://github.com/kripod/glaze/commit/5c527f07831e95015ceacafa2e15e786b2f56a96))
- add support for property aliases ([a118792](https://github.com/kripod/glaze/commit/a11879242592769840ad608786ba6fc1bd46e9f3))
- add useStyling hook ([5ac7ef8](https://github.com/kripod/glaze/commit/5ac7ef810bbff76c12ce6e697e790e9319d6b7f3))
- allow disabling dynamic style injection ([adca16f](https://github.com/kripod/glaze/commit/adca16fba065e814a43f7bd755d968e550e458dd))
- autocomplete for themed values and aliases ([4718cbd](https://github.com/kripod/glaze/commit/4718cbded9e2b980cc0d889090d16a5b6df21a93))
- create gatsby-plugin-glaze package ([6aa6fb9](https://github.com/kripod/glaze/commit/6aa6fb9c8e550427b647c1c0b2d14e0e0f8df74d))
- encapsulate TreatProvider and clarify types ([55a5718](https://github.com/kripod/glaze/commit/55a571839007c47abcdd827c073abb6b3f76c0f6))
- experimental StyleSheet implementation ([92adee8](https://github.com/kripod/glaze/commit/92adee8adc29c14b5660e14df96e65c7cbb51e68))
- export important types from package root ([ef443c4](https://github.com/kripod/glaze/commit/ef443c405b4ac12a2894db5e07c5e4692641f9e2))
- server-rendered rule rehydration ([887b84a](https://github.com/kripod/glaze/commit/887b84afccd9b7fecb32313702db484252707b53)), closes [#11](https://github.com/kripod/glaze/issues/11)
- support custom shorthands for rules ([7fb9903](https://github.com/kripod/glaze/commit/7fb9903c10f3afc6baa6a29181d441b69e38155c))
- symmetrize default spacing scale ([e15e89a](https://github.com/kripod/glaze/commit/e15e89a09289ad10bf851a092dfd946268ad24e2))

### improvement

- shorten generated dynamic class names ([1bc3519](https://github.com/kripod/glaze/commit/1bc35199facc9e35f9fb04e1eb1f04f18bd136ec))

### Performance Improvements

- **theme:** minify values ([c3e779a](https://github.com/kripod/glaze/commit/c3e779a4b786458aa0885ce239afffaf78005444))
- apply new StyleSheet ([fb61ab0](https://github.com/kripod/glaze/commit/fb61ab078b0f2cc36c9101eab686e480a57618da))
- cSSOM-based dynamic styling ([c967d94](https://github.com/kripod/glaze/commit/c967d9429e27a3145bee71ba7ebf66efa5a5a689))
- don't create a new Map during each rerender ([9d4c635](https://github.com/kripod/glaze/commit/9d4c6352d43b4d526dd1ced8d7050b1ac199aa5e))
- optimize bundled outputs ([577eda6](https://github.com/kripod/glaze/commit/577eda6385f2f7f44e8ced5e4be6ced960ee6241))
- optimize CSS ident escaper RegExp ([de97e10](https://github.com/kripod/glaze/commit/de97e10e3c4ba6c71c032dafad18a58b634c499b))

### Reverts

- "build: use newer compilation target" ([9edb8be](https://github.com/kripod/glaze/commit/9edb8be8f0acd232389f61dbc108cf616dfc784b))
- remove Box component ([871d7e6](https://github.com/kripod/glaze/commit/871d7e67d562429973f5687030abf46fd6519b0c))
- remove unused type exports from the entry point ([08cc3fd](https://github.com/kripod/glaze/commit/08cc3fd809df7db2af68767f2c618a109b2a523c))
- Revert "chore: improve changelog generation" ([ddd7c62](https://github.com/kripod/glaze/commit/ddd7c6267f7951d6bcee6c0b46b730f98c1d78b8))
- skip versioning gatsby-plugin-glaze-example ([2a11211](https://github.com/kripod/glaze/commit/2a11211278832ddc3af4276df3703d119763a95f))
- **ci:** fix script ([00e9dba](https://github.com/kripod/glaze/commit/00e9dba3f1f7eeea25c7fbd78debdb25b8e26db0))
- **ci:** set up jobs for testing parallelism ([6e49d9a](https://github.com/kripod/glaze/commit/6e49d9ad258a2b015f7088e1a70c2d4d1bd3cbbc))

### BREAKING CHANGES

- **theme:** the `resolvers` key of theme objects (e.g. passed to `createTheme`) shall be
  renamed to `matchers`
- Don't use the types `RuntimeTheme`, `ScaleTokens` and `StaticTheme` anymore.
- Newly generated dynamic class names differ from existing ones. Rebuild
  server-rendered pages for proper rehydration.
- **theme:** No action is required when extending `defaultTokens`. Otherwise, each scale must be
  specified, as seen in `StaticTheme`.
- `defaultTheme` imports shall be rewritten to `defaultTokens`
- Existing CSS rules are not re-instantiated on the client anymore.
- styles are now managed through CSSOM in production
