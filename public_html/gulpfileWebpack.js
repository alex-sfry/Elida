import gulp from 'gulp';
import wpCompiler from 'webpack';
import wpCompiler2 from 'webpack';
import webpack from 'webpack-stream';
import wpConfigProd from './webpack-gulp.prod.js';
import wpConfigDev from './webpack-gulp.dev.js';
import wpConfigBsProd from './webpack-bs-gulp.prod.js';
import wpConfigBsDev from './webpack-bs-gulp.dev.js';
import sync from 'browser-sync';

export const webpackProd = () => {
    return gulp.src('./src/script/main.js')
        .pipe(webpack(wpConfigProd))
        .pipe(gulp.dest('./templates/'));
};

export const webpackDev = (cb) => {
    const browserSync = sync.get('localServer');
    return gulp.src('./src/script/main.js')
        .pipe(
            webpack(
                wpConfigDev,
                wpCompiler
            )
        )
        .on('error', () => {
            cb();
        })
        .pipe(gulp.dest('./templates/'))
        .pipe(browserSync.stream());
};

export const webpackBsDev = () => {
    return gulp.src('./src/script/bootstrapJS/bootstrap.js')
        .pipe(
            webpack(
                wpConfigBsDev,
                wpCompiler2
            )
        )
        .pipe(gulp.dest('./templates/'));
};

export const webpackBsProd = () => {
    return gulp.src('./src/script/bootstrapJS/bootstrap.js')
        .pipe(
            webpack(
                wpConfigBsProd
            )
        )
        .pipe(gulp.dest('./templates/'));
};