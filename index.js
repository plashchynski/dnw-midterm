#!/usr/bin/env node

const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const PORT = 8089;

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const devicesRouter = require('./routes/devices');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add bootstrap dist files as a virtual subdirectory for static files
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/devices', devicesRouter);

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
