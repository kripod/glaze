# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.5.0 (2020-04-20)

### Code Refactoring

- **theme:** rename 'resolvers' to 'matchers' ([c363cf3](https://github.com/kripod/glaze/commit/c363cf3986f595a2759fedb08030f88e40e6ad7b))

### Performance Improvements

- optimize bundled outputs ([577eda6](https://github.com/kripod/glaze/commit/577eda6385f2f7f44e8ced5e4be6ced960ee6241))

### BREAKING CHANGES

- **theme:** the `resolvers` key of theme objects (e.g. passed to `createTheme`) shall be
  renamed to `matchers`
