const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const browserSync2 = require('browser-sync').create();

/* -------------------------------------------------------------------------
  begin Sass
* ------------------------------------------------------------------------- */

gulp.task('sass', () =>
  gulp
    .src('build/sass/global.scss')

    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./dist/css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
);

/* -------------------------------------------------------------------------
   end Sass
 * ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
  begin Minify JavaScript
* ------------------------------------------------------------------------- */

gulp.task('scripts', () =>
  gulp
    .src('./build/js/main.js')
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'bundle.js'
        },
        optimization: {
          minimize: false
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['env']
              }
            }
          ]
        },
        externals: {}
      })
    )
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
);

/* -------------------------------------------------------------------------
   end Minify JavaScript
 * ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
   begin Pug
 * ------------------------------------------------------------------------- */

gulp.task('pug', () =>
  gulp
    .src(['build/pug/*.pug'])
    .pipe(
      pug({
        basedir: __dirname,
        pretty: true
        // debug: true,
        // compileDebug: true,
      })
    )
    .pipe(gulp.dest('././dist'))
);

/* -------------------------------------------------------------------------
   end Pug
 * ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
  begin Run
* ------------------------------------------------------------------------- */

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    port: 3010,
    ui: {
      port: 3011
    }
  });

  browserSync2.init({
    server: {
      baseDir: './dist',
      index: 'layout.html'
    },
    port: 3012,
    ui: {
      port: 3013
    }
  });

  gulp.watch('./build/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('./build/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./build/js/**/*.js', gulp.series('scripts'));
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
  gulp.watch('./dist/js/*.js').on('change', browserSync2.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync2.reload);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/*.html').on('change', browserSync2.reload);
});

/* -------------------------------------------------------------------------
   end Run
 * ------------------------------------------------------------------------- */
