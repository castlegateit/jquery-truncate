// jshint node: true, esversion: 6

// Strict mode
'use strict';

// Configuration
const name = 'truncate.js';
const src = './src/*.js';
const dest = './dist';

// Modules
const del = require('del');
const gulp = require('gulp');

// Plugins
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const wrap = require('gulp-wrap');

// Tasks
function clean() {
    return del(dest);
}

function compile() {
    return gulp.src(src)
        .pipe(plumber())

        // Write uncompressed development version
        .pipe(wrap(';(function($) {"use strict"; \n<%= contents %>\n})(jQuery);'))
        .pipe(rename(name))
        .pipe(gulp.dest(dest))

        // Write compressed production version
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
}

function watchTask() {
    gulp.watch(src, build);
}

const build = gulp.series(clean, compile);
const watch = gulp.parallel(build, watchTask);

// Public tasks
exports.default = build;
exports.watch = watch;
