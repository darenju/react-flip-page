[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# react-flip-page

*DISCLAIMER: This package is in no way related to nor endorsed by Flipboard, Inc. nor [flipboard.com](http://www.flipboard.com). This is just a showcase of HTML5 & CSS3 effect implemented with React.*

*Note: this README is updated often. If you are reading it from the [NPM package page](https://www.npmjs.com/package/react-flip-page), please take a look at the same file of the [GitHub repository](https://github.com/darenju/react-flip-page/blob/master/README.md). The one there is the most up to date version.*

Have you ever wished you could use the cool Flipboard page swipe effect in one of your React.js apps?

Well, I was a little bored and decided to craft it in React.js, and here is the result!

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
| `style` | `object` | `{}` | Additional style for the flipboard |
| `height` | `number` | `480` | Height for the flipboard |
| `width` | `number` | `320` | Width for the flipboard |
| `onPageChange` | `function` |   | Callback when the page has been changed. Parameter: `pageIndex` |
| `className` | `string` | `''` | Optional CSS class to be applied on the container |

## Methods

There are currently two methods that can be called on the component. To call them, you can use the
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

## Contribute

Since this is an open source project and it's far from perfect, contribution is welcome. Fork the repository and start working on your fix or new feature. Remember, it's good practice to work in your own branch, to avoid painful merge conflicts.

Once you think your work is ready, fire a [pull request](https://github.com/darenju/react-flip-page/pulls) with an understandable description of what you're bringing to the project. If it's alright, chances are high your work will be merged!

### Things I need help on

- **Unit Testing** : I would like any recommendation or article to guide me on how to effectively test the React component, ideally from command line. Is [Jest](https://facebook.github.io/jest/) a good choice?
