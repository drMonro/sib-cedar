const { src, dest, parallel, series, watch } = require('gulp');
const rsync = require('gulp-rsync');

function deployMain() {
    return src('public_html/')
    // return gulp.src('public_html/', 'storage/')
    // return gulp.src('/**')
    .pipe(rsync({
        root: 'public_html/',
        hostname: 'ckseveql_admin@ckseveql.beget.tech',
        destination: 'sib-cedar.ru/public_html/',
        progress: true,
        recursive: true,
        archive: true,
        silent: false,
        compress: true,
        exclude: ['/config.php', 'admin/config.php', 'node_modules/', '.git/']
    }));
}

function deployStorage() {
    return src('storage/')
    .pipe(rsync({
        root: 'storage/',
        hostname: 'ckseveql_admin@ckseveql.beget.tech',
        destination: 'sib-cedar.ru/storage/',
        progress: true,
        recursive: true,
        archive: true,
        silent: false,
        compress: true
        // exclude: ['**/*config.php', 'node_modules/']
    }));
}       

exports.storage = deployStorage;
exports.default = parallel(deployMain, deployStorage);