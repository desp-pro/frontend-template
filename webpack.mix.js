const mix = require("laravel-mix");

// https://laravel-mix.com/extensions/imagemin
require("laravel-mix-imagemin");

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    mix.imagemin(
        "assets/images/**/*.*",
        {
            context: "src",
        },
        {
            optipng: {
                optimizationLevel: 5,
            },
            jpegtran: null,
            plugins: [
                require("imagemin-mozjpeg")({
                    quality: 100,
                    progressive: true,
                }),
            ],
        }
    )
} else {
    mix.copy("src/assets/images", "dist/assets/images")
}

mix.setPublicPath("dist")
    .copy(["src/views", "src/static"], "dist")
    .copy("src/assets/fonts", "dist/assets/fonts")
    .js("src/assets/js/app.js", "dist/assets/js/app.js")
    .sass("src/assets/styles/app.scss", "dist/assets/css/")
    .options({
        processCssUrls: false,
        clearConsole: true,
        postCss: [
            require('autoprefixer'),
            require("tailwindcss")
        ],
    })
    .browserSync({
        server: "dist",
        port: 8080,
        files: [
            "dist/**/*.html",
            "dist/assets/css/**/*.css",
            "dist/assets/js/**/*.js",
        ],
    });
