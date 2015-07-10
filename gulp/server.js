'use strict';

var path = require('path');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

// var proxyMiddleware = require('http-proxy-middleware');

// function browserSyncInit(baseDir, browser) {
//   browser = browser === undefined ? 'default' : browser;

//   var routes = null;
//   if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
//     routes = {
//       '/bower_components': 'bower_components'
//     };
//   }

//   var server = {
//     baseDir: baseDir,
//     routes: routes
//   };


//    * You can add a proxy to your backend by uncommenting the line bellow.
//    * You just have to configure a context which will we redirected and the target url.
//    * Example: $http.get('/users') requests will be automatically proxified.
//    *
//    * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md

//   // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

//   browserSync.instance = browserSync.init({
//     startPath: '/',
//     server: server,
//     browser: browser
//   });
// }

// browserSync.use(browserSyncSpa({
//   selector: '[ng-app]'// Only needed for angular apps
// }));

// gulp.task('serve', ['watch'], function () {
//   browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
// });

// gulp.task('serve:dist', ['build'], function () {
//   browserSyncInit(conf.paths.dist);
// });

// gulp.task('serve:e2e', ['inject'], function () {
//   browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
// });

// gulp.task('serve:e2e-dist', ['build'], function () {
//   browserSyncInit(conf.paths.dist, []);
// });

gulp.task('serve:nodemon', ['nodemon', 'watch'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    // files: [conf.paths.tmp + '/serve', conf.paths.src],
    browser: "google chrome",
    port: 7000,
  });
});


gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'server/bin/www'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
