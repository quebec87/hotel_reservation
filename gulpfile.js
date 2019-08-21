const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const _publicpos = 'docs/'

sass.compiler = require('node-sass');

// Compile Sass & Inject Into Browser
function style(done) {
    gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            indentType: 'tab',
            indentWidth: '1',
        }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                overrideBrowserslist: ['last 2 version'],
            }),
        ]))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(_publicpos + 'css'))
        .pipe(browserSync.stream());
    done();
}

// minify js
function compressJS(done) {
    gulp.src(['src/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest(_publicpos));
    done();
};

function reload() {
    browserSync.reload();
}

//exports.style = style;
//exports.compressJS = compressJS;

// Watch Sass & Serve
function watch(cb) {
    browserSync.init({
        server: {
            baseDir: './docs/',
            middleware: function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });
    // gulp.watch('src/sass/**/*', function() {
    //         gulpMultiProcess(['style'], function() {})
    //     })
    gulp.watch('src/sass/**/*', style);
    gulp.watch('src/js/*.js', compressJS);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
    gulp.watch(_publicpos + '*.html').on('change', browserSync.reload);
    cb();
};



var build = gulp.series(style, compressJS, watch);
gulp.task('default', build);