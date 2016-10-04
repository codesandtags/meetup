'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import nodemon from 'gulp-nodemon';
import gulpConfig from './gulp.config';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
const BROWSER_SYNC_RELOAD_DELAY = 500;

// Lint JavaScript
gulp.task('lint', () =>
    gulp.src(gulpConfig.app.path + gulpConfig.app.scripts.src)
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// Optimize images
gulp.task('images', () =>
    gulp.src(gulpConfig.app.path + gulpConfig.app.images.src)
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.images.des))
        .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
    gulp.src([
        'app/*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess',
        'app/favicon.ico'
    ], {
        dot: true
    }).pipe(gulp.dest(gulpConfig.dist))
        .pipe($.size({title: 'copy'}))
);

gulp.task('copy-vendor-files', function () {
    //fonts
    gulp.src('./bower_components/font-awesome' + gulpConfig.app.fonts.src)
        .pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.fonts.des));

    //scripts
    gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/holderjs/holder.min.js'
    ]).pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.scripts.vendor));

    //styles
    gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.min.css'
    ]).pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.styles.vendor));

});

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src(gulpConfig.app.styles.src)
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.size({title: 'styles'}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.styles.des));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
// Note: Since we are not using useref in the scripts build pipeline,
//       you need to explicitly list your scripts here in the right order
//       to be correctly concatenated
gulp.task('scripts', () =>
    gulp.src(gulpConfig.app.scripts.src)
        .pipe($.newer('.tmp/scripts'))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe($.concat('main.min.js'))
        .pipe($.uglify({preserveComments: 'some'}))
        // Output files
        .pipe($.size({title: 'scripts'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.scripts.des))
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
    gulp.src(gulpConfig.app.views.src)
        .pipe($.useref({
            searchPath: '{.tmp,app}',
            noAssets: true
        }))

        // Minify any HTML
        .pipe($.if('*.html', $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
        })))
        // Output files
        .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
        .pipe(gulp.dest(gulpConfig.dist));

    //Copy views Folder
    gulp.src(gulpConfig.app.views.path)
        .pipe(gulp.dest(gulpConfig.dist + gulpConfig.app.views.des));

});

gulp.task('browser-sync', ['nodemon'], function () {
    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({
        notify: false,

        // Customize the Browsersync console logging prefix
        logPrefix: 'WSK',

        // watch the following files; changes will be injected (css & images) or cause browser to refresh
        files: ['.tmp', 'app'],

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,

        // open the proxied app in chrome
        //browser: ['google chrome']
    });
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        // nodemon our expressjs server
        script: 'app/www',

        // watch core server file(s) that require server restart on change
        ext: '*.js *.jade'
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false   //
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});


// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['clean', ], (cb) => {
    runSequence(
        'styles',
        ['copy', 'images', 'html', 'lint', 'copy-vendor-files', 'scripts', 'browser-sync'],
        cb
    );
    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/views/**/*.hbs'], reload);
    gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
    gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
    gulp.watch(['app/images/**/*'], reload);
});

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
    runSequence(
        'styles',
        ['lint', 'html', 'scripts', 'images', 'copy', 'copy-vendor-files'],
        'generate-service-worker',
        cb
    )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
    // Update the below URL to the public URL of your site
    pagespeed('example.com', {
        strategy: 'mobile'
        // By default we use the PageSpeed Insights free (no API key) tier.
        // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
        // key: 'YOUR_API_KEY'
    }, cb)
);