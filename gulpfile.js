var gulp = require('gulp')
    , mocha = require('gulp-mocha');

gulp.task('test', function (){
    'use strict';

    return gulp.src(['**/**_test.js', '!node_modules/**/*'], {read: false})
            .pipe(mocha({reporter: 'spec'}));
});