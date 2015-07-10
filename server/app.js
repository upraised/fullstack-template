'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var errorHandler = require('errorhandler');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var nunjucks = require('nunjucks');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var env = app.get('env');

console.log('starting app.js', __dirname);

app.set('view engine', 'html');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
// app.use(passport.initialize());


if (env === 'production') {
  // TODO FIGURE OUT HANDLING OF PRODUCTION TEMPLATES
// view engine setup
  nunjucks.configure(path.join(__dirname, '../../dist'), {
    express: app,
    watch: true
  });

  app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, '../dist')));

  app.use(morgan('dev'));

} else if (env === 'development' || env === 'test') {
  console.log('dev');

  nunjucks.configure(path.join(__dirname, '../.tmp/serve'), {
    express: app,
    watch: true
  });

  app.use(express.static(path.join(__dirname, '../.tmp/serve')));
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(express.static(path.join(__dirname, '..')));

  app.use(morgan('dev'));

  app.use(errorHandler()); // Error handler - has to be last
}


app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('not found:  ', req.path);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
