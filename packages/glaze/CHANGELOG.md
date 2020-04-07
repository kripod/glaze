# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://github.com/kripod/glaze/compare/glaze@0.3.1...glaze@0.4.0) (2020-04-07)


### Bug Fixes

* **typings:** error when theme is not given ([e0d2c29](https://github.com/kripod/glaze/commit/e0d2c295d61903b48c177c5790a2ed59514da67e))


### Code Refactoring

* **theme:** make specifying scales mandatory ([870d040](https://github.com/kripod/glaze/commit/870d0408acd450a4c15da0aa6c7c955b9677644d))
* rename `defaultTheme` to `defaultTokens` ([6684dc5](https://github.com/kripod/glaze/commit/6684dc59d7bcd3918984ff118c0f218c0deba549))


### Features

* autocomplete for themed values and aliases ([4718cbd](https://github.com/kripod/glaze/commit/4718cbded9e2b980cc0d889090d16a5b6df21a93))


### BREAKING CHANGES

* **theme:** No action is required when extending `defaultTokens`. Otherwise, each scale must be
specified, as seen in `StaticTheme`.
* `defaultTheme` imports shall be rewritten to `defaultTokens`





## [0.3.1](https://github.com/kripod/glaze/compare/glaze@0.3.0...glaze@0.3.1) (2020-04-05)

### Performance Improvements

- don't create a new Map during each rerender ([9d4c635](https://github.com/kripod/glaze/commit/9d4c6352d43b4d526dd1ced8d7050b1ac199aa5e))

# [0.3.0](https://github.com/kripod/glaze/compare/glaze@0.2.0...glaze@0.3.0) (2020-04-04)

### Bug Fixes

- only fire warnings during development ([239edda](https://github.com/kripod/glaze/commit/239edda8d13dbe5ce9b3cec93f03fd84914fe17b))
- rule management in StyleInjector ([47a1f93](https://github.com/kripod/glaze/commit/47a1f930a312eb55d2c2a8772c93868b9d6b03ac))
- rule replacement for dynamic styles ([5b3ba81](https://github.com/kripod/glaze/commit/5b3ba815b92ad28b60f23e8dcf9fc17e973bc54a))

### Features

- add customizable logger, e.g. for Gatsby ([a0b47d4](https://github.com/kripod/glaze/commit/a0b47d4c392b7480f693a1263478cd629699a384))
- add NullStyleInjector with warnings ([5dacdf2](https://github.com/kripod/glaze/commit/5dacdf24a046b0a79bf799044eaf2939805acd56))
- allow disabling dynamic style injection ([adca16f](https://github.com/kripod/glaze/commit/adca16fba065e814a43f7bd755d968e550e458dd))
- experimental StyleSheet implementation ([92adee8](https://github.com/kripod/glaze/commit/92adee8adc29c14b5660e14df96e65c7cbb51e68))
- server-rendered rule rehydration ([887b84a](https://github.com/kripod/glaze/commit/887b84afccd9b7fecb32313702db484252707b53)), closes [#11](https://github.com/kripod/glaze/issues/11)

### Performance Improvements

- apply new StyleSheet ([fb61ab0](https://github.com/kripod/glaze/commit/fb61ab078b0f2cc36c9101eab686e480a57618da))
- cSSOM-based dynamic styling ([c967d94](https://github.com/kripod/glaze/commit/c967d9429e27a3145bee71ba7ebf66efa5a5a689))

### BREAKING CHANGES

- Existing CSS rules are not re-instantiated on the client anymore.
- styles are now managed through CSSOM in production

## 0.2.0 (2020-03-31)

### Bug Fixes

- auto-convert dynamic property keys and values ([4bca582](https://github.com/kripod/glaze/commit/4bca582))
- dynamic style unmounting ([ff203cd](https://github.com/kripod/glaze/commit/ff203cd))
- server-side rendering for dynamic styles ([fabc4af](https://github.com/kripod/glaze/commit/fabc4af))

### Improvements

- clear debug names for dynamic styles ([a6d9467](https://github.com/kripod/glaze/commit/a6d9467))
- detach unused dynamic styles from DOM ([510f59c](https://github.com/kripod/glaze/commit/510f59c))
- expressive dynamic style prefixes ([b6f5e52](https://github.com/kripod/glaze/commit/b6f5e52))

### Features

- generate hoisted style classes in runtime ([4adf807](https://github.com/kripod/glaze/commit/4adf807))
- style composition based on className ([a599c8e](https://github.com/kripod/glaze/commit/a599c8e)), closes [#4](https://github.com/kripod/glaze/issues/4)

## [0.1.5](https://github.com/kripod/glaze/compare/glaze@0.1.4...glaze@0.1.5) (2020-03-27)

**Note:** Version bump only for package glaze

## [0.1.4](https://github.com/kripod/glaze/compare/glaze@0.1.3...glaze@0.1.4) (2020-03-25)

**Note:** Version bump only for package glaze

## [0.1.3](https://github.com/kripod/glaze/compare/glaze@0.1.2...glaze@0.1.3) (2020-03-25)

**Note:** Version bump only for package glaze

## [0.1.2](https://github.com/kripod/glaze/compare/glaze@0.1.1...glaze@0.1.2) (2020-03-25)

**Note:** Version bump only for package glaze

## [0.1.1](https://github.com/kripod/glaze/compare/glaze@0.1.0...glaze@0.1.1) (2020-03-25)

**Note:** Version bump only for package glaze

# 0.1.0 (2020-03-25)

### Bug Fixes

- **ci:** package resolution ([1f7ebfa](https://github.com/kripod/glaze/commit/1f7ebfa2266adfb3073a715613b56bba7c2f4d92))
- **theme:** add missing resolvers ([b316434](https://github.com/kripod/glaze/commit/b31643417fd7e6e2c8fccd47407e038fb67dea01))

### Features

- add runtime theme tokens ([5c527f0](https://github.com/kripod/glaze/commit/5c527f07831e95015ceacafa2e15e786b2f56a96))
- add support for property aliases ([a118792](https://github.com/kripod/glaze/commit/a11879242592769840ad608786ba6fc1bd46e9f3))
- add useStyling hook ([5ac7ef8](https://github.com/kripod/glaze/commit/5ac7ef810bbff76c12ce6e697e790e9319d6b7f3))
- create gatsby-plugin-glaze package ([6aa6fb9](https://github.com/kripod/glaze/commit/6aa6fb9c8e550427b647c1c0b2d14e0e0f8df74d))
- encapsulate TreatProvider and clarify types ([55a5718](https://github.com/kripod/glaze/commit/55a571839007c47abcdd827c073abb6b3f76c0f6))
- export important types from package root ([ef443c4](https://github.com/kripod/glaze/commit/ef443c405b4ac12a2894db5e07c5e4692641f9e2))
- support custom shorthands for rules ([7fb9903](https://github.com/kripod/glaze/commit/7fb9903c10f3afc6baa6a29181d441b69e38155c))

### Reverts

- remove Box component ([871d7e6](https://github.com/kripod/glaze/commit/871d7e67d562429973f5687030abf46fd6519b0c))
