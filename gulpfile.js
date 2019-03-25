const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');

const target = 'dist/blackjack';

function clean() {
    
    return del(['dist']);
}

function index() {
    
    return src('src/index.html')
    .pipe(dest(target))
    .pipe(connect.reload());
}

function js() {

    return src('src/ts/**/*')
    .pipe(ts({
        noImplicitAny: true,
        noEmitOnError: true,
        target: 'es5',
        out: 'output.js'
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(dest(target + '/js'))
    .pipe(connect.reload());
}

function css() {
    
    return src('src/scss/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(dest(target + '/css'))
    .pipe(connect.reload());
}

function jquery() {
    
    return src('node_modules/jquery/dist/jquery.min.js')
    .pipe(dest(target + '/js/jquery'));
}

function bootstrap() {
    
    return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(dest(target + '/css/bootstrap'));
}

function img() {
    
    return src('src/img/**/*')
    .pipe(dest(target + '/img'))
    .pipe(connect.reload());
}

function fonts() {

    return src('src/fonts/**/*')
    .pipe(dest(target + '/fonts'))
    .pipe(connect.reload());
}

function cssIcons() {

    return src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
    .pipe(dest(target + '/css/icons/css'))
    .pipe(connect.reload());
}

function icons() {

    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(dest(target + '/css/icons/webfonts'))
    .pipe(connect.reload());
}

function server(cb) {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
    cb();
}

function watchers(cb) {
    watch('src/ts/**/*', js);
    watch('src/scss/**/*', css);
    watch('src', index);
    watch('src/img/**/*', img);
    watch('src/fonts/**/*', fonts);
    watch('src/css/icons/**/*', icons);
    watch('src/css/icons/**/*', cssIcons);
    cb();
}

const build = series(
    clean,
    parallel(js, index, jquery, bootstrap, img, css, fonts, icons, cssIcons)
    );
    
    const start = series(
        build,
        parallel(server, watchers)
        );
        
        exports.default = build;
        exports.start = start;
        