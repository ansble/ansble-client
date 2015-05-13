var gulp = require('gulp')
    , mocha = require('gulp-mocha')
    , istanbul = require('gulp-istanbul');

gulp.task('test', function (){
    'use strict';

    return gulp.src(['**/**_test.js', '!node_modules/**/*'], {read: false})
            .pipe(mocha({reporter: 'spec'}));
});

// gulp.task('test', function(){
//     'use strict';
//   return gulp.src(['**/*.js', '!**/*_test.js', '!node_modules', '!gulpfile.js'])
//       // Right there
//       .pipe(istanbul({includeUntested: true}))
//       .pipe(istanbul.hookRequire())
//       .on('finish', function () {
//          gulp.src(['**/**_test.js', '!node_modules/**/*'], {read: false})
//             .pipe(mocha({reporter: 'spec'}))
//             .pipe(istanbul.writeReports());
//       });
// });