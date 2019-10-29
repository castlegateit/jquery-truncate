;(function($) {"use strict"; 
// Name and default settings
var pluginName = 'truncate';
var resizeName = pluginName + 'ResizeDone';
var defaults = {
    lines: false
};

// Resize timer
var resizeTimer;

// Constructor
var Plugin = function(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    // Initialization
    this.init();
};

// Initialization
Plugin.prototype.init = function() {
    var _this = this;

    // Save the original text content so that we can reuse it on window
    // resize, converting all child elements to text content.
    _this.text = $(_this.element).text();

    // Truncate text on window resize
    $(window).on(resizeName, function() {
        _this.truncate();
    });

    // Truncate text on page load
    _this.truncate();
};

// Truncate the content of the element to fit in the element
Plugin.prototype.truncate = function() {
    // We cannot truncate the content of elements that are hidden because
    // they may not have a height or width.
    if ($(this.element).is(':hidden')) {
        return;
    }

    // Reset and re-measure the element
    this.reset();
    this.measure();

    // Remove the content of the element
    $(this.element).empty();

    // Create sufficient lines to fill the element without causing vertical
    // overflow.
    while (this.lines.length < this.maxLines) {
        this.createLine();
    }

    // If there are any remaining words, add them to the last line and hide
    // them with CSS text overflow.
    this.updateLastLine();
};

// Restore the original text content and reset the lists of words and
// completed lines.
Plugin.prototype.reset = function() {
    $(this.element).text(this.text);

    this.words = this.text.split(' ');
    this.lines = [];
};

// Measure the element to determine the available width and the number of
// lines that will fit without causing vertical overflow.
Plugin.prototype.measure = function() {
    var box = $(this.element);

    this.width = box.width();
    this.maxLines = this.settings.lines;

    // If the number of lines has not been set, see how many lines will fit
    // neatly into the available space.
    if (!this.maxLines) {
        this.maxLines = Math.floor(
            box.height() / parseInt(box.css('line-height'), 10)
        );
    }
};

// Create a truncated line from the available words and append it to the
// parent element.
Plugin.prototype.createLine = function() {
    var line = $('<span>').css('white-space', 'nowrap');

    // Previous text content of the line and current word
    var text;
    var word;

    // Append the line element to the parent element, with a space after to
    // allow each line to wrap.
    $(this.element).append(line, ' ');

    // Add words to the element
    for (var i = 0, j = this.words.length; i < j; i++) {
        text = line.text();
        word = this.words.shift();

        // Append the current word to the line
        line.text(text + word + ' ');

        // If the line is now too long to fit in the parent element, restore
        // the previous text (before the word was added), put the current
        // word back at the start of the list of words, and stop adding
        // words to this line.
        if (line.width() > this.width) {
            line.text(text);
            this.words.unshift(word);
            break;
        }
    }

    // Append the line to the master list of lines
    this.lines.push(line);
};

// If there are any remaining words, add them to the last line and hide them
// with CSS text overflow.
Plugin.prototype.updateLastLine = function() {
    var line = this.lines[this.lines.length - 1];

    if (this.words.length === 0) {
        return;
    }

    line.text(line.text() + ' ' + this.words.join(' ')).css({
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: this.width
    });
};

// Add method to jQuery
$.fn[pluginName] = function(options) {
    return this.each(function() {
        if (!$.data(this, pluginName)) {
            $.data(this, pluginName, new Plugin(this, options));
        }
    });
};

// Trigger window resize complete event
$(window).on('resize', function() {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(function() {
        $(window).trigger(resizeName);
    }, 50);
});

})(jQuery);