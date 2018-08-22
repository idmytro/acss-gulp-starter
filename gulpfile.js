const gulp = require('gulp');
const gulpAtomizer = require('gulp-atomizer');
const browserSync = require('browser-sync').create();

gulp.task('bs', ['acss'], () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(["*.html"], ['acss', 'html-watch']);
});

gulp.task('html-watch', done => {
  browserSync.reload();
  done();
});

gulp.task('acss', () => {
  return gulp.src('*.html')
    .pipe(gulpAtomizer({
      outfile: 'atomic.css',
      acssConfig: Object.assign({}, require('./build-utils/acss/config')),
      addRules: require('./build-utils/acss/rules')
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['bs']);
