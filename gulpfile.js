'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const pipeline = require('readable-stream').pipeline;
const { watch } = require("gulp");
const babel = require("gulp-babel");

// Compile Sass to CSS and minify
function buildStyles() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
};

// Babel
function runBabel() {
  return gulp.src("src/js/events-schedule.js")
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(gulp.dest("dist/js/"));
};

// MinifyJS
function minifyJs() {
  return pipeline(
    gulp.src('dist/js/events-schedule.js')
      .pipe(rename({ suffix: '.min' })),
    uglify(),
    gulp.dest('dist/js/')
  );
}

exports.buildStyles = buildStyles;
exports.minifyJs = minifyJs;
exports.runBabel = runBabel;

// Watcher function
function watchFiles() {
  watch('src/scss/*.scss', buildStyles);
  watch('src/js/*.js', runBabel);
  watch('dist/js/events-schedule.js', minifyJs);
}

exports.watch = watchFiles;

// Default task i.e. what runs when you type 'gulp'
gulp.task('default', gulp.series(buildStyles, runBabel, minifyJs));