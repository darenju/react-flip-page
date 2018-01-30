# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.11.8
### Added

- Add `.gitattributes` for windows developers
- Add Jest setup
- Add Enzyme setup
- Add `code coverage` report file
- Add `check-dependencies` to `prebuild` and `pretest` lifecycle. This lib checks if the developer has the up-to-date dependencies inside its node_modules directory, as described in the `package.json` file.
- Add TravisCI and Greenkeeper initial setup (@darenju still needs to setup each of these in his repository)
- Add `pre-commit` which runs lint before each commit

### Removed

- Remove generated code from VCS, as a good practice. The generated code should not be versioned, as it can be checked at [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices#only-git-the-important-bits)

### Fixed

- Temporaly disables lint for a specific line: `src/index.jsx:577:3`. Style is a pretty generic prop, receiving any style the user needs. Ideally, this eslint should be disable if you still have the intent of using this props. Or, the code should be refactored, to match the proper [eslint rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md)

## 0.10.3 - 2018-01-29
### Fixed
- Issue causing the package to switch back to first page all the time. Issue was because package was not updated to react@16.

## 0.10.1 - 2017-09-24
### Fixed
- Adjusted properties types.

## 0.10.0 - 2017-09-14
### Changed
- Now using eslint as code style.

## 0.9.1 - 2017-09-04
### Fixed
- Fixed `showTouchHint` always displaying despite property being defined to `false`.
