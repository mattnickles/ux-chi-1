import gulp from 'gulp';

const watchOptions = { };

export const serveAndWatch = gulp.parallel(
  'serve',
  () => gulp.watch(
    'src/lux/**/*.scss',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      gulp.parallel('lint:css', 'build:lux:styles'),
      'serve:notify:end'
    )
  ),
  () => gulp.watch(
    'src/lux/**/*.js',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:lux:scripts',
      'build:lux:scriptsES6',
      'build:lux:scriptsAMD',
      'serve:notify:end',
      'serve:reload'
    )
  ),
  () => gulp.watch(
    'src/website/assets/images/**/*',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:website:images',
      'serve:notify:end',
      'serve:reload'
    )
  ),
  () => gulp.watch(
    'src/website/assets/styles/**/*',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:website:styles',
      'serve:notify:end'
    )
  ),
  () => gulp.watch(
    'src/website/assets/scripts/**/*',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:website:scripts',
      'serve:notify:end',
      'serve:reload'
    )
  ),
  () => gulp.watch(
    ['src/website/views/**/*', 'src/website/layouts/**/*'],
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:website:views',
      'serve:notify:end',
      'serve:reload'
    )
  ),
  () => gulp.watch(
    'test/**/*.pug',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:test',
      'serve:notify:end',
      'serve:reload'
    )
  ),
  () => gulp.watch(
    'src/website/views/**/*',
    watchOptions,
    gulp.series(
      'serve:notify:start',
      'build:website:views',
      'serve:notify:end',
      'serve:reload'
    )
  )
);

gulp.task('watch', gulp.series(
  'build',
  serveAndWatch
));
