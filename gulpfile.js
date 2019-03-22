import { src, dest, watch, series, parallel } from 'gulp';
import del from 'del';
import { reload, server as _server } from 'gulp-connect';
import sass, { logError } from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import ts from 'gulp-typescript';

const target = 'dist/blackjack';

function clean() {
    
    return del(['dist']);
}

function index() {
    
    return src('src/index.html')
    .pipe(dest(target))
    .pipe(reload());
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
    .pipe(reload());
}

function css() {
    
    return src('src/scss/**/*')
    .pipe(sass().on('error', logError))
    .pipe(concat('style.css'))
    .pipe(dest(target + '/css'))
    .pipe(reload());
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
    .pipe(reload());
}

function fonts() {

    return src('src/fonts/**/*')
    .pipe(dest(target + '/fonts'))
    .pipe(reload());
}

function cssIcons() {

    return src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
    .pipe(dest(target + '/css/icons/css'))
    .pipe(reload());
}

function icons() {

    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(dest(target + '/css/icons/webfonts'))
    .pipe(reload());
}

function server(cb) {
    _server({
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
        
        const _default = build;
export { _default as default };
        const _start = start;
export { _start as start };
        