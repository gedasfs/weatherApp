const mix = require('laravel-mix');

mix.setPublicPath('public');

mix.version();

if (mix.inProduction()) {
	mix.sourceMaps();
}

mix.js('resources/js/app.js', 'public/js/app.js');
mix.js('resources/js/bootstrap.js', 'public/js/bootstrap.js');
mix.sass('resources/scss/app.scss', 'public/css/app.css');
mix.sass('resources/scss/weathericons.scss', 'public/css/weathericons/icons.css');