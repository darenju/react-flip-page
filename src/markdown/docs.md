# Docs

## Properties

### animationDuration

Type: `Number`

Default value: `200` (ms)

Duration of the flipping animation when a page turns.

### className

Type: `string`

Default value: `''`

CSS class name to add on the component.

### firstComponent

Type: `object`

Default value: `null`

If specified, this component will be rendered under the very first page.

When trying to lift the first page, this component will be showing underneath.

### flipOnLeave

Type: `boolean`

Default value: `false`

Indicates if the component should finish a flip or restore to its original state when the pointer
leaves the component.

### height

Type: `Number`

Default value: `480`

Height of the component.

See also: `width`

### lastComponent

Type: `object`

Default value: `null`

If specified, this component will be rendered under the very last page.

When trying to lift the last page, this component will be showing underneath.

### maskOpacity

Type: `Number`

Default value: `0.4`

Maximum opacity of the mask covering the underneath pages.

### maxAngle

Type: `Number`

Default value: `45`

Maximum angle a page is allowed to lift when there's nothing before/after.

### onPageChange

Type: `function`

Default: `() => {}`

This callback is called after the current page has changed, whether the user or the code made that
change.

### orientation

Type: `string (vertical|horizontal)`

Default: `vertical`

Simply defines in which direction the pages will flip.

`vertical` immitates the default Flipboard® behavior.

`horizontal` immitates the flip of a book page.

### pageBackground

Type: `string`

Default: `#fff`

This is the default background of every page in the component. It can be a CSS color or a
`background-image` value.

### perspective

Type: `Number`

Default: `130em`

This value is the CSS value that will be applied to the page fold effect. The bigger the value,
the less noticeable is the effect. Trying and adjusting is strongly recommended to get this to your
own taste.

See also: `maxAngle`

### showHint

Type: `boolean`

Default: `false`

If set true, the component will wait for `1s` before lifting the bottom/right part of the page to
indicate the possible page switch to the user.

### showTouchHint

Type: `boolean`

Default: `false`

Similar to `showHint`, this option will show a finger swipe gesture on the component to help the
user understand they can move the pages.

You may style this with the `.rfp-hint` CSS class. See examples for more details.

### style

Type: `object`

Default: `{}`

Additional CSS styles that will be applied to the component.

### treshold

Type: `Number`

Default: `10`

Amount of pixels the user's finger/pointer has to travel in order to start the effect.

You can adjust this value, though it is __strongly__ recommended that you leave it as is.

### uncutPages

Type: `boolean`

Default: `false`

If set to true, this option will allow the pages to expand outside of the component when they are
being folded. This can be interesting in `horizontal` mode, check examples.

### width

Type: `Number`

Default: `320`

Width of the component.

See also: `height`
