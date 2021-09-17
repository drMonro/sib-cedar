const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const objectFit = require(`postcss-object-fit-images`);
const server = require(`browser-sync`).create();
const rename = require(`gulp-rename`);
const del = require(`del`);
const uglify = require(`gulp-uglify`);
const imagemin = require(`gulp-imagemin`);
const webp = require("gulp-webp");
const babel = require(`rollup-plugin-babel`);
const rollup = require(`rollup`);
const nodeResolve = require(`rollup-plugin-node-resolve`);
const sourcemaps = require(`gulp-sourcemaps`);
const commonjs = require(`rollup-plugin-commonjs`);
const svgstore = require(`gulp-svgstore`);
const pug = require(`gulp-pug`);
const posthtml = require(`gulp-posthtml`);
const include = require("posthtml-include");
const data = require(`gulp-data`);
const fs = require(`fs`);
const mozjpeg = require(`imagemin-mozjpeg`);
const inlineCss = require(`gulp-inline-css`);
const concat = require(`gulp-concat`);
const minify = require(`gulp-csso`);
const cache = require(`gulp-cache`);


// const localhost = `http://sib-cedar/`, // Local domain
const localhost = `sib-cedar`, // Local domain
    preprocessor = `scss`, // Preprocessor (sass, scss, less, styl) / Preprocessor folder name / Module require const name. Example: themes/mytheme/assets/scss/
    theme = `cedar`, // Theme folder name
    fileswatch = `html,htm,php,txt,yaml,twig,json,md`; // List of files extensions for watching & hard reload (comma separated)

const config = {
    // dist: `build`,
    // src: `src`,
    fonts: `catalog/view/theme/` + theme + `/fonts/**/*.{woff,woff2}`,
    img: {
        watch: `catalog/view/theme/` + theme + `/image/*.{png,jpg,svg}`,
        dist: `catalog/view/theme/` + theme + `/image/`,
        raster: `catalog/view/theme/` + theme + `/image/**/*.{png,jpg}`
    },
    // img: `src/img/**/*.{png,jpg,svg}`,
    // imgRaster: `catalog/view/theme/` + theme + `/image/**/*.{png,jpg}`,
    video: `catalog/view/theme/` + theme + `/video/**/*.{mp4,webm}`,
    // html: `src/*.html`,
    libs: `catalog/view/theme/` + theme + `/js/vendor/**/*.{js,css}`,
    css: {
        src: `catalog/view/theme/` + theme + `/stylesheet/main.scss`,
        watch: `catalog/view/theme/` + theme + `/stylesheet/**/*.scss`,
        // inlineCss: `src/email-style/**/*.css`,
        dist: `catalog/view/theme/` + theme + `/stylesheet/`,
        min: `style.min.css`
    },
    // sprite: {
    //     src: `catalog/view/theme/` + theme + `/image/icons-sprite/*.svg`,
    //     dist: `catalog/view/theme/` + theme + `/image/`,
    //     name: `sprite.svg`
    // },
    js: {
        src: `catalog/view/theme/` + theme + `/js/main.js`,
        srcLibs: `catalog/view/theme/` + theme + `/js/vendor/**/*.js`,
        watch: `catalog/view/theme/` + theme + `/js/**/*.js`,
        mode: `iife`,
        dist: `catalog/view/javascript/`,
        distLibs: `catalog/view/javascript/`,
        name: `scripts.js`,
        nameLibs: `vendor.js`

    },
    twig: {
        views: `catalog/view/theme/` + theme + `/template/**/*.twig`,
    },
    svg: {
        src: `catalog/view/theme/` + theme + `/image/svg/**/*.svg`,
        dist: `catalog/view/theme/` + theme + `/image/`,
        name: `sprite.svg`,
        partial: `catalog/view/theme/` + theme + `/template/partial/sprite.twig`,
        partialDist: `catalog/view/theme/` + theme + `/template/partial/`,
        partialFull: `catalog/view/theme/` + theme + `/template/partial/sprite_full.twig`,

    },
    data: {
        src: `src/json/data.json`
    }
};

gulp.task(`style`, () => {
    return gulp
        .src(config.css.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), objectFit()]))
        // .pipe(gulp.dest(config.css.dist))
        .pipe(minify())
        .pipe(rename(config.css.min))
        .pipe(gulp.dest(config.css.dist));
});

gulp.task(`styleDev`, () => {
    return gulp
        .src(config.css.src)
        // .pipe(server.cache.clear())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), objectFit()]))
        // .pipe(gulp.dest(config.css.dist))
        .pipe(rename(config.css.min))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.css.dist))
        .pipe(server.stream());
});

gulp.task(`scripts`, () => {
    return gulp
        .src(config.js.src)
        .pipe(plumber())
        .pipe(
            rollup(
                {
                    plugins: [commonjs(), nodeResolve(), babel()]
                },
                config.js.mode
            )
        )
        .pipe(uglify())
        .pipe(plumber())
        .pipe(gulp.dest(config.js.dist));
});

gulp.task('scriptsDev', function (done) {
    return rollup.rollup({
        input: config.js.src,
        plugins: [
            commonjs(), nodeResolve(), babel()
        ]
    }).then(bundle => {
        return bundle.write({
            file: config.js.dist + config.js.name,
            format: 'cjs',
            name: 'scripts.js',
            // sourcemap: true
        })
    });
});

gulp.task(`scriptsLibs`, () => {
    return gulp
        .src(config.js.srcLibs)
        .pipe(plumber())
        .pipe(concat(config.js.nameLibs))
        // .pipe(uglify())
        .pipe(rename({suffix: `.min`}))
        .pipe(gulp.dest(config.js.distLibs));
});


gulp.task('image', function () {
    return gulp
        .src(config.img.watch)
        .pipe(cache(imagemin([
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            })
        ])))
        .pipe(gulp.dest(config.img.dist));
});


gulp.task('clearImageCache', () =>
    cache.clearAll()
);

gulp.task("webp", () =>
    gulp
        .src(config.img.raster)
        .pipe(cache(webp(
            {quality: 50}
        )))
        .pipe(gulp.dest(config.img.dist))
);

gulp.task("sprite", () => {
    return gulp
        .src([config.svg.src])
        .pipe(
            svgstore({
                inlineSvg: true
            })
        )
        .pipe(rename(config.svg.name))
        .pipe(gulp.dest(config.svg.dist));
});


gulp.task("copySpritePartial", () => {
    return gulp
        .src(config.svg.partial)
        .pipe(rename('sprite_full.twig'))
        .pipe(gulp.dest(config.svg.partialDist))
});

gulp.task("includeSprite", () => {
    return gulp
        .src(config.svg.partialFull)
        .pipe(posthtml([include()]))
        .pipe(gulp.dest(config.svg.partialDist));
});


gulp.task(`serve`, () => {
    server.init({
        proxy: localhost,
        notify: false,

        cors: true,
        ui: false,
    });

    gulp.watch(config.css.watch, gulp.series(`styleDev`));
    gulp.watch(config.js.watch, gulp.series(`scriptsDev`));
    gulp.watch(config.js.srcLibs, gulp.series(`scriptsLibs`));
    gulp.watch(config.img.watch, gulp.series(`image`));
    gulp.watch(config.img.raster, gulp.series(`webp`));
    gulp.watch(config.twig.views, server.reload);
});

gulp.task(
    `spriteInject`,
    gulp.series(
        `sprite`,
        `copySpritePartial`,
        `includeSprite`,
        done => done()
    )
);

gulp.task(
    `build`,
    gulp.series(
        // `clean`,
        // `copy`,
        `image`,
        `webp`,
        // `video`,
        `style`,
        `sprite`,
        `scripts`,
        `scriptsLibs`,
        // `pug`,
        // `inline-css-build`,
        done => done()
    )
);

gulp.task(
    `buildDev`,
    gulp.series(
        // `clean`,
        // `copy`,
        `image`,
        `webp`,
        // `video`,
        `styleDev`,
        `sprite`,
        `scriptsDev`,
        `scriptsLibs`,
        // `pug`,
        // `pug-inline-css`,
        done => done()
    )
);

gulp.task(
    `buildDevLight`,
    gulp.series(
        // `clean`,
        // `copy`,
        `styleDev`,
        `sprite`,
        `scriptsDev`,
        `scriptsLibs`,
        // `pug`,
        // `pug-inline-css`,
        done => done()
    )
);
