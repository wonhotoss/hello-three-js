let gulp = require('gulp');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let watchify = require('watchify');
let tsify = require('tsify');
let fancy_log = require('fancy-log');
let paths = {
    pages: ['src/*.html', 'src/*/*', 'src/*/*/*']   // TODO: make recursive
};

// let ts = require('gulp-typescript');
// let ts_project = ts.createProject('tsconfig.json');
let watched_browserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('copy-html', () => {
    // return gulp.src(paths.pages, {'base': '.'})
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
        // .pipe(gulp.dest((f) => {
        //     f.dir
        //     return 'dist';
        // }));
});

function bundle(){
    return watched_browserify
        .bundle()
        .on('error', fancy_log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
watched_browserify.on('update', bundle);
watched_browserify.on('log', fancy_log);

