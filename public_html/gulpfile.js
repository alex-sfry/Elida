import gulp from 'gulp';
import { webpackDev, webpackProd } from './gulpfileWebpack.js';
export { webpackDev, webpackProd } from './gulpfileWebpack.js';
import { scriptsYii2, widgetsScripts } from './gulpfileSripts.js';
export { scriptsYii2, widgetsScripts } from './gulpfileSripts.js';
import { bsStyles, bsStylesMin, purgeCSS, widgetsStyles } from './gulpfileStyles.js';
export { bsStyles, bsStylesMin, purgeCSS, widgetsStyles } from './gulpfileStyles.js';
import { webpackBsDev } from './gulpfileWebpack.js';
export { webpackBsDev } from './gulpfileWebpack.js';
import { webpackBsProd } from './gulpfileWebpack.js';
export { webpackBsProd } from './gulpfileWebpack.js';
import { vendorJS } from './gulpfileSripts.js';
export { vendorJS } from './gulpfileSripts.js';
import sync from 'browser-sync';
import { deleteAsync } from 'del';

const browserSync = sync.create('localServer');
let syncMode = false;

const enableSync = () => {
    return Promise.resolve(syncMode = true);
};

export const clean = async () => {
    return await deleteAsync([
        './templates/css/*',
        './templates/js/*',
        './templates/fonts/*',
        './templates/iamges/*',
    ]);
};

export const watch = () => {
    console.log('syncMode - ', syncMode);
    syncMode && browserSync.init({
        proxy: "elida:8080"
    });

    gulp.watch('./src/script/*.js', () => webpackDev())
        .on('change', (path) => console.log(`File ${path} was changed`))
        .on('unlink', (path) => console.log(`File ${path} was removed`))
        .on('add', (path) => console.log(`File ${path} was added`));

    gulp.watch('./src/styles/scss/*.scss', () => webpackDev())
        .on('change', (path) => console.log(`File ${path} was changed`))
        .on('unlink', (path) => console.log(`File ${path} was removed`))
        .on('add', (path) => console.log(`File ${path} was added`));

    gulp.watch([
        '../widgets/**/*.js',
        '../widgets/**/*.css',
        '!../widgets/**/*.min.js',
        '!../widgets/**/*.min.css'
    ])
        .on('change', (path) => {
            console.log(`File ${path} was changed`);
            browserSync.reload();
        })
        .on('unlink', (path) => {
            console.log(`File ${path} was removed`);
            browserSync.reload();
        })
        .on('add', (path) => {
            console.log(`File ${path} was added`);
            browserSync.reload();
        });
};

export const dev = gulp.series(gulp.parallel(vendorJS, webpackBsDev, webpackDev), watch);
export const devSync = gulp.series(enableSync, gulp.parallel(webpackBsDev, webpackDev), watch);

export const bsProd = gulp.series(
    gulp.parallel(webpackBsDev, webpackDev), gulp.parallel(bsStyles, webpackBsProd), purgeCSS, bsStylesMin
);
export const widgets = gulp.parallel(widgetsStyles, widgetsScripts);
export const build = gulp.series(
    clean,
    gulp.parallel(vendorJS, webpackBsDev, webpackDev),
    bsProd,
    gulp.parallel(bsStyles, widgets, scriptsYii2, webpackProd)
);

export default dev;