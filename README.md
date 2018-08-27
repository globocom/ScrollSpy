# Scrollspy

Scrollspy can be used to bind a callback that will be called when user scrolls to the given element.

## Parameters:

```javascript
ScrollSpy.add({
  el: DOMElement, // required
  callback: Function, // required - A function to be called when element are scrolled into screen
  offset: 200, // A offset(in px) to be considered upon calculation
  reference: "top", // ["top"|"bottom"] Which side to use as base when calculation element position.
});
```

## Usage:

```javascript
  ScrollSpy.add({
    el: document.querySelector('.myDiv'),
    callback: function(){
      // do something
    },
  });

  ScrollSpy.add({
    el: document.querySelector('.myDiv2'),
    offset: 0,
    callback: function(){
      // do something
    },
  });

  ScrollSpy.add({
    el: document.querySelector('.myDiv3'),
    offset: 40,
    reference: "bottom",
    callback: function(){
      // do something
    },
  });
```

## Debug:

There is also available a debug function that show element and line borders that scrollspy are currently listening on

```javascript
  ScrollSpy.debug()
```

## Tests:

```shell
  npm test
```

## License

Scrollspy is licensed under the [MIT license](LICENSE).
