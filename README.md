# react-flipboard

Have you ever wished you could use the cool Flipboard page swipe effect in one of your React.js apps?

Well, I was a little bored and decided to craft it in React.js, and here is the result!

![Demo GIF](https://raw.githubusercontent.com/darenju/react-flipboard/master/demo.gif)

You can play with [this demo](https://darenju.me/react-flipboard/).

## Install

Installation is pretty straight-forward, as you just have to `npm install` this package:

```
npm install --save react-flipboard
```

Then, you can require the module with any way you like, let it be webpack or something else.

## Usage

This package consists of one single component that does all the work. Simply throw a `Flipboard` component with some children that will be the content.

```html
<Flipboard>
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
</Flipboard>
```

### Props

There are a few properties that define the behaviour of the component, here they are:

| Prop | Type | Default | Role |
|------|------|---------|------|
| `animationDuration` | `number` | `200` | Duration in ms of the fold/unfold animation |
| `treshold` | `number` | `10` | Distance in px to swipe before the gesture is activated |
| `maxAngle` | `number` | `45` | Angle of the page when there's nothing to display before/after |
| `maskOpacity` | `number` | `0.4` | Opacity of the masks that covers the underneath content |
| `perspective` | `string` | `130em` | Perspective value of the page fold effect. The bigger, the less noticeable |
| `pageBackground` | `string` | `#fff` | Background of the pages. This can be overriden in individual pages by styling the component |
| `firstComponent` | `element` | `null` | Component that will be displayed under the first page |
| `lastComponent` | `element` | `null` | Component that will be displayed under the last page |
| `style` | `object` | `{}` | Additional style for the flipboard |
