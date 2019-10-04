# Scrollspy

Scrollspy can be used to bind a callback that will be called when user scrolls to the given element.

## Setup

Install via npm

```bash
npm install @globocom/scrollspy
```

Or include one of the [browser bundles](dist/umd) via a script tag:

```html
<script src="https://unpkg.com/@globocom/scrollspy@0.1.0/dist/scrollspy.min.js"></script>
```

## Options

```js
ScrollSpy.add({
  el: DOMElement, // required
  callback: Function, // required - A function to be called when element are scrolled into screen
  offset: 200, // An offset (in px) to be considered upon calculation
  reference: "top" // ["top"|"bottom"] Which side to use as base for position calculation
});
```

## Usage

```js
import * as ScrollSpy from "@globocom/scrollspy";

ScrollSpy.add({
  el: document.querySelector(".myDiv"),
  callback: function() {
    // do something
  }
});

ScrollSpy.add({
  el: document.querySelector(".myDiv2"),
  offset: 0,
  callback: function() {
    // do something
  }
});

ScrollSpy.add({
  el: document.querySelector(".myDiv3"),
  offset: 40,
  reference: "bottom",
  callback: function() {
    // do something
  }
});
```

## Debug

There is also available a debug function that shows element and line borders
that scrollspy are currently listening on:

```js
ScrollSpy.debug();
```

## Contributing

This project utilizes [npm run scripts](https://docs.npmjs.com/misc/scripts). See [package.json](package.json) for available scripts.

## License

Scrollspy is licensed under the [MIT license](LICENSE).
