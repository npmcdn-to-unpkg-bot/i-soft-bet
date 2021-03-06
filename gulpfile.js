"use strict";
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var bourbon = require('bourbon').includePaths;

var sourceFolder = 'src/';
var buildFolder = 'public/';

var jsSources = [];

var scssSources = [ sourceFolder + "scss/style.scss" ];

var pugSources = [ sourceFolder + "index.pug" ];

var templateFiles = []

gulp.task('compilePug', function() {
    return gulp.src( pugSources )
               .pipe(pug())
               .pipe(gulp.dest(buildFolder));
});

gulp.task('compileTemplates', function() {
    return gulp.src( templateFiles )
               .pipe(pug())
               .pipe(gulp.dest(buildFolder + 'templates/'));
});

gulp.task('compileScss', function() {
    return gulp.src( scssSources )
               .pipe(concat('style.css'))
               .pipe(sass({ includePaths: bourbon }))
               .pipe(gulp.dest(buildFolder + 'style/'))
});

gulp.task('compileJs', function() {
    return gulp.src( jsSources )
               .pipe(uglify())
               .pipe(concat('app.js'))
               .pipe(gulp.dest(buildFolder + 'js'));
});

gulp.task('watchJsFiles', function() {
  gulp.watch( sourceFolder + '**/*.js', ['compileJs']);
});

gulp.task('watchScssFiles', function() {
  gulp.watch( sourceFolder + '**/*.scss', [ 'compileScss' ]);
});

gulp.task('watchPugFiles', function() {
  gulp.watch( sourceFolder + '**/*.pug', [ 'compilePug', 'compileTemplates' ]);
});



gulp.task('default', [ 'compilePug', 'compileScss', 'compileJs', 'compileTemplates', 'watchJsFiles', 'watchScssFiles', 'watchPugFiles' ]);


