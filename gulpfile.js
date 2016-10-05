var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

gulp.task('default', function() {
  // place code for your default task here
  console.log("default task")
});

 
var awspublish = require('gulp-awspublish');

// Publish to AWS S3
gulp.task('publish', function() {
  var publisher = awspublish.create({
    region: 'eu-central-1',
    params: {
      Bucket: 'ahub-beta-eu-central-1-portal'
    }
  });
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };
  return gulp.src('dist/**')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});