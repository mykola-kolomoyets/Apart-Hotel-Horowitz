
// * ============= *
// * === PATHS === *
// * ============= *

const projectFolder = require("path").basename(__dirname); // or "dist"
const sourceFolder = "src";

const path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        cssLibs: projectFolder + "/css/libs/",
        js: projectFolder + "/js/",
        jsLibs: projectFolder + "/js/libs/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/",
    },
    src: {
        html: [
            sourceFolder + "/**/*.html",
            "!" + sourceFolder + "/**/_*.html",
            "!" + sourceFolder + '/html/*.html'
        ],
        css: [sourceFolder + "/scss/*.scss",
        "!" + sourceFolder + "/scss/_*.scss"],
        js: sourceFolder + "/js/script.js",
        jsLibs: sourceFolder + "/js/libs/*.js",
        img: sourceFolder + "/img/**/*.*",
        fonts: sourceFolder + "/fonts/*.ttf",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        jsLibs: sourceFolder + "/js/libs/*.js",
        img: sourceFolder + "/img/**/*.*",
    },
    clean: "./" + projectFolder + "/"
};
// * =================== *
// * === GULP ITSELF === *
// * =================== *
const gulp = require("gulp");
const { src, dest, series, parallel } = gulp;

// * =============== *
// * === PLUGINS === *
// * =============== *

// === COMMON PLUGINS ===
const browser_sync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const del = require("del");
const rename = require("gulp-rename");
const fs = require('fs');
// const sourcemaps = require('gulp-sourcemaps');

// === HTML PLUGINS ===
const webpHtml = require("gulp-webp-html");

// === SCSS-CSS PLUGINS ===
const scss = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const webpCss = require("gulp-webpcss");

// === JS PLUGINS ===
const uglify = require("gulp-uglify-es").default;
const babel = require('gulp-babel');

// === IMAGES PLUGINS ===
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

// === FONTS PLUGINS ===
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");

// =============
// === TASKS ===
// =============

const browserSync = params => {
    browser_sync.init({
        server: {
            baseDir: "./" + projectFolder + "/",
        },
        port: 3000,
        notify: false
    });
}

const clean = params => {
    return del(path.clean);
}

//  === HTML TASK ===
const html = () => {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(dest(path.build.html))
        .pipe(browser_sync.stream());
}

const cb = () => { } // FOR FONTSTYLES TASK

// === CSS TASK ===
const css = () => {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(groupMedia())
        .pipe(
            autoPrefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpCss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browser_sync.stream());
};

// === JS TASK ===
const js = () => {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browser_sync.stream());
}

const jsLibs = () => {
    return src(path.src.jsLibs)
        .pipe(dest(path.build.jsLibs))
        .pipe(browser_sync.stream());
}

// === IMAGES TASK ===
const images = () => {
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browser_sync.stream());
}

// === FONTS TASKS ===
const fonts = () => {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', () => {
    return src([sourceFolder + "/fonts/*.otf"])
        .pipe(
            fonter({
                formats: ['ttf']
            })
        )
        .pipe(dest(sourceFolder + "/fonts/"));
})

const fontsStyle = () => {
    let fileContent = fs.readFileSync(sourceFolder + "/scss/_fonts.scss");
    if (fileContent == "") {
        fs.writeFile(sourceFolder + "/scss/_fonts.scss", "", cb);
        return fs.readdir(path.build.fonts, (err, items) => {
            if (items) {
                let cFontName;
                for (let i = 0; i < items.length; i++) {
                    let fontName = items[i].split(".");
                    fontName = fontName[0];
                    if (cFontName != fontName) {
                        fs.appendFile(sourceFolder + '/scss/_fonts.scss', '@include font("' + fontName + '", "' + fontName + '", "400", "normal");\r\n', cb);
                    }
                    cFontName = fontName;
                }
            }
        })
    }
}


// ======================
// === WATCHING FILES ===
// ======================

const watchFiles = () => {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.jsLibs], jsLibs);
    gulp.watch([path.watch.img], images);
}

// =====================
// === DEFAULT TASKS ===
// =====================

const build = series(clean, parallel(html, css, js, jsLibs, images, fonts), fontsStyle);
const watch = parallel(build, watchFiles, browserSync);

// ===============
// === EXPORTS ===
// ===============

exports.html = html;
exports.css = css;
exports.js = js;
exports.jsLibs = jsLibs;
exports.images = images;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;

exports.build = build;
exports.watch = watch;
exports.default = watch;