# Truncate

Provides responsive, multi-line [text-overflow](https://developer.mozilla.org/en/docs/Web/CSS/text-overflow) using jQuery. If an element has fixed or maximum height, this will ensure that the text fits inside the element:

~~~ javascript
$('.foo').truncate();
~~~

You can also limit an element to a particular number of lines:

~~~ javascript
$('.foo').truncate({
    lines: 4
});
~~~

If you do not set a limit on the height of the element and you do not set a number of lines, you will see no visible effect on the element, but it will be populated with `<span>` elements for each visible line.

## Install

Install with npm:

    npm install --save-dev @castlegate/jquery-truncate

## Limitations

The element selected must use `display: block` and any child elements will converted to text.

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). See [LICENSE](LICENSE) for details.
