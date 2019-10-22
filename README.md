[![npm version](https://badge.fury.io/js/react-flip-page.svg)](https://badge.fury.io/js/react-flip-page)
[![Build Status](https://travis-ci.org/darenju/react-flip-page.svg?branch=master)](https://travis-ci.org/darenju/react-flip-page)
[![codecov](https://codecov.io/gh/darenju/react-flip-page/branch/master/graph/badge.svg)](https://codecov.io/gh/darenju/react-flip-page)
[![Greenkeeper badge](https://badges.greenkeeper.io/darenju/react-flip-page.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

# react-flip-page

> **DISCLAIMER**: This package is in no way related to nor endorsed by Flipboard, Inc. nor [flipboard.com](http://www.flipboard.com). This is just a showcase of HTML5 & CSS3 effect implemented with React.

This package allows you to use the cool Flipboard page swipe effect in your React.js apps.

> Please keep in mind that static content will work best with this component. Content like videos and related can produce undesired effects.

It has a `responsive` option, so you can possibly cover your entire page with it!

![Demo GIF](https://raw.githubusercontent.com/darenju/react-flip-page/master/demo.gif)

You can play with [this demo](http://darenju.me/react-flip-page/).

## Install

Installation is pretty straight-forward, as you just have to `npm install` this package:

```
npm install --save react-flip-page
```

Then, you can require the module with any way you like, let it be webpack or something else.

## Usage

This package consists of one single component that does all the work. Simply throw a `FlipPage` component with some children that will be the content.

```html
<FlipPage>
  <article>
    <h1>My awesome first article</h1>
    <p>My awesome first content</p>
  </article>
  <article>
    <h1>My wonderful second article</h1>
    <p>My wonderful second content</p>
  </article>
  <article>
    <h1>My excellent third article</h1>
    <p>My excellent third content</p>
  </article>
</FlipPage>
```

### Props

There are a few properties that define the behaviour of the component, here they are:

| Prop | Type | Default | Role |
|------|------|---------|------|
| `orientation` | `string` | `vertical` | Orientation of swipes. `vertical` or `horizontal` for respectively up/down swipes and left/right swipes |
| `uncutPages` | `boolean` | `false` | If `true`, the pages will be allowed to overflow through the container. The original effect is to keep everything inside the container, but you can set this to `true` to have a more "bookish" effect. |
| `animationDuration` | `number` | `200` | Duration in ms of the fold/unfold animation |
| `treshold` | `number` | `10` | Distance in px to swipe before the gesture is activated |
| `maxAngle` | `number` | `45` | Angle of the page when there's nothing to display before/after |
| `maskOpacity` | `number` | `0.4` | Opacity of the masks that covers the underneath content |
| `perspective` | `string` | `130em` | Perspective value of the page fold effect. The bigger, the less noticeable |
| `pageBackground` | `string` | `#fff` | Background of the pages. This can be overriden in individual pages by styling the component |
| `firstComponent` | `element` | `null` | Component that will be displayed under the first page |
| `lastComponent` | `element` | `null` | Component that will be displayed under the last page |
| `showHint` | `bool` | `false` | Indicates if the component must hint the user on how it works. Setting this to `true` will lift the bottom of the page 1s after the component is mounted, for 1s |
| `showSwipeHint` | `bool` | `false` | Indicates if the component must hint the user on how it works. Setting this to `true` will show an example of gesture to switch pages |
| `showTouchHint` | `bool` | `false` | Indicates if the component must hint the user on how it works. Setting this to `true` will show a pointer indicating where to click to switch pages. Works with
`flipOnTouch` |
| `style` | `object` | `{}` | Additional style for the flipboard |
| `height` | `number` | `480` | Height for the flipboard |
| `width` | `number` | `320` | Width for the flipboard |
| `onPageChange` | `function` |   | Callback when the page has been changed. Parameters: `pageIndex`, `direction` |
| `onStartPageChange` | `function` |   | Callback when the page starts to change. Parameters: `oldPageIndex`, `direction` |
| `onStartSwiping` | `function` |   | Callback when the user starts swiping |
| `onStopSwiping` | `function` |   | Callback when the user stops swiping |
| `className` | `string` | `''` | Optional CSS class to be applied on the container |
| `loopForever` | `boolean` | `false` | If `true` flipping after the last page will return to the first (and visa-versa) |
| `flipOnTouch` | `boolean` | `false` | If `true`, the user can flip pages by touching/clicking a top/bottom or left/right zone. These zones have CSS classes: `rfp-touchZone`, `rfp-touchZone-previous` and `rfp-touchZone-next` so that you can style them |
| `flipOnTouchZone` | `number` | `210` | Percentage of dimensions of the zone to touch/click to flip pages |
| `disableSwipe` | `boolean` | `false` | If `true`, users can't use the swipe feature to switch pages while `flipOnTouch` is enabled. Make sure you enable `flipOnTouch` so they can switch pages, or provide buttons binded to Methods |
| `responsive` | `boolean` | `false` | If `true`, the component will be responsive, meaning it will take all the available space. Place the component in a container before to make sure it is visible |
| `startAt` | `number` | `0` | Default start position of the component |
| `reverse` | `boolean` | `false` | If `true`, the user must swip in reverse order: he must swipe down/right to see the next page, and up/left to see the previous page. |
| `swipeImmune` | `array` | `[]` | This array holds the CSS class names that the user can not initiate a swipe gesture from. |
| `noShadow` | `boolean` | `false` | This disables the inset drop shadow on the inside of the flipping pages. |

## Methods

There are currently three methods that can be called on the component. To call them, you can use the
`ref` attribute in React:

```javascript
<FlipPage ref={(component) => { this.flipPage = component; }}>
  ...
</FlipPage>

this.flipPage.gotoPreviousPage();
```

### `gotoPreviousPage()`

This method triggers the effect and switches to the previous page, if possible.

### `gotoNextPage()`

This method triggers the effect and switches to the next page, if possible.

### `gotoPage(page)`

This methods positions the component to the wanted page index. The `page` argument should be between `0` and the number of pages. If not, a `RangeError` will be thrown. Also note that this does **not** call the `onPageChange` nor the `onStartPageChange` callback.

## Contribute

Since this is an open source project and it's far from perfect, contribution is welcome. Fork the repository and start working on your fix or new feature. Remember, it's good practice to work in your own branch, to avoid painful merge conflicts.

Once you think your work is ready, fire a [pull request](https://github.com/darenju/react-flip-page/pulls) with an understandable description of what you're bringing to the project. If it's alright, chances are high your work will be merged!

## Donate

This project takes some of my time, and I do it for free. If you're kind enough, you can show your support for my work by making a small donation here:

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](darenju@live.com)

I would very much appreciate it!
