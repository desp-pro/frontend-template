const mix = require("laravel-mix");
const tailwindcss = require('tailwindcss');

// https://laravel-mix.com/extensions/imagemin
require("laravel-mix-imagemin");

mix
  .setPublicPath("dist")
  .copy(["src/views", "src/static"], "dist")
  .copy("src/assets/fonts", "dist/assets/fonts")
  .imagemin(
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
  .js("src/assets/js/app.js", "dist/assets/js/app.js")
  .sass("src/assets/styles/app.scss", "dist/assets/css/")
  .options({
    processCssUrls: false,
    postCss: [ tailwindcss('./tailwind.config.js') ],
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
