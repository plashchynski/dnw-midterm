#!/usr/bin/env node

const http = require('http');
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const config = require('./config');

const PORT = 8089;

const app = express();

// Setup express-session module to store sessions
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true,
}));

// Setup connect-flash module to store flash messages
// https://www.geeksforgeeks.org/how-to-display-flash-messages-using-connect-flash-module-in-node-js/
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set layout
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add bootstrap dist files as a virtual subdirectory for static files
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/bootstrap-icons', express.static(path.join(__dirname, '/node_modules/bootstrap-icons')));

require('./routes/main')(app);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});
