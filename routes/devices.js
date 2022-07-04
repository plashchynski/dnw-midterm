const express = require('express');

const router = express.Router();

router.get('/status', (req, res, next) => {
  res.render('devices/status');
});

router.get('/new', (req, res, next) => {
  res.render('devices/new');
});

router.get('/control', (req, res, next) => {
  res.render('devices/control');
});

router.get('/delete', (req, res, next) => {
  res.render('devices/delete');
});

module.exports = router;
