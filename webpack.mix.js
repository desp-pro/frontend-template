const mix = require("laravel-mix");

// Extensions
// https://laravel-mix.com/extensions/imagemin
require("laravel-mix-imagemin");
// https://laravel-mix.com/extensions/tailwindcss
require("mix-tailwindcss");

// Set default path
mix.setPublicPath("dist/");

// Copy
mix.copy("src/views/", "dist/");
mix.copy("src/static/", "dist/");
mix.copy("src/assets/fonts/", "dist/assets/fonts");

// Images
mix.imagemin(
  "assets/images/**.*",
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
);

// Js
mix.js("src/assets/js/app.js", "dist/assets/js/app.js").sourceMaps();

// Styles
mix.sass("src/assets/styles/app.scss", "dist/assets/css/");
mix.tailwind("./tailwind.config.js");

// BrowserSync
mix.browserSync({
  server: "dist",
  port: 8080,
  files: ["**/*.html", "**/*.css", "**/*.js"],
});
