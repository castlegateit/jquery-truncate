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

    npm install --save-dev castlegate-truncate

## Limitations

The element selected must use `display: block` and any child elements will converted to text.

## License

Copyright (c) 2019 Castlegate IT. All rights reserved.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
