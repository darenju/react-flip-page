# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.17.0

### Changed

- Changed the way page components are rendered. To limit number of renders, the component now uses `PureComponent`s wrapper (higher-order components) for actual pages.

## 0.16.0

### Added

- New property `startAt`.

## 0.15.1

### Fixed

- Fixed `onPageChange` not passing the correct page number.

## 0.15.0

### Added

- Improve code coverage for `<FlipPage />` from `74%` to `99%`.
- `onStartSwiping` and `onEndSwiping` callback.

## 0.14.2

### Added

- Improve code coverage for `<FlipPage />` from `59%` to `74%`:
	- `mouseLeave()`: 100% covered
	- `reset()`: 100% covered
	- `props.orientation`: 100% covered
	- `moveGesture()`: 90% covered (WIP)

### Changed

- Change `eslintrc` run config, as it was given different error outputs based on the OS of the developer. It was basically change `eslint src/**/*.js* --quiet` to `eslint --ext .jsx --ext .js --quiet src/`.

## 0.14.1

### Fixed

- `button`s and `a` were not clickable.

## 0.14.0

### Added

- `responsive` property (default to `false`) to enable responsive mode.
- Improve code coverage for `<FlipPage />`:
	- `getHeight()`: 100% covered
	- `getHalfHeight()`: 100% covered
	- `getWidth()`: 100% covered
	- `getHalfWidth()`: 100% covered
	- `isLastPage()`: 100% covered
	- `isFirstPage()`: 100% covered
	- `incrementPage()`: 100% covered
	- `decrementPage()`: 100% covered
	- `doNotMove()`: 100% covered
	- `startMoving()`: 100% covered
- Fix some lint issues on `index.jsx`
- Add codecov to the project (@darenju still needs setup it to his github repository)

### Fixed

- Replace the code style badge url fron `standardjs` to `airbnb`.

## 0.13.1
### Added

- Added mask on previous/next parts. This way if you go to the drop area, you will see the shadow of the page. This only happened when lifting the page.

### Fixed

- Shadows were not displayed on some parts when swiping. The fix for non-clickable links had caused this.

## 0.13.0
### Added

- `showTouchHint` property that shows a pointer indicating where to click or touch to switch pages.

### Changed

- `flipOnTouchAllowDrag` has been renamed to `disableSwipe`. By default, the swipe is always allowed with `flipOnTouch`, unless `disableSwipe` is specified.
- `showTouchHint` has been renamed to `showSwipeHint` to avoid confusion.
- Changed default `flipOnTouchZone` from `20` to `10`.

### Removed

- Removed `touchHintTimeout`, `touchHintTimeoutTimer`, `showTouchHint`, `hintVisible` as they were useless.

## 0.12.2
### Added

- `flipOnTouchAllowDrag` propery allowing the user to keep the dragging feature even though `flipOnTouch`
is active.

## 0.12.1
### Added

- Class names on touch zones.

## 0.12.0
### Added

- Add `flipOnTouch` feature. Zones to touch/click are defined by the `flipOnTouchZone` property.

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
