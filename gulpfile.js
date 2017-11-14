// Resize images for thumbnails
const gulp = require('gulp');
const pipe = require('pipe');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');

gulp.task('default', () => {
  return gulp.src('diagrams/**/*.{jpg,png}')
    .pipe(imageResize({ width : 100 }))
    .pipe(gulp.dest('diagrams/thumbnails'));
});
