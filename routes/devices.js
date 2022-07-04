const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('devices/index');
});

router.get('/new', (req, res, next) => {
  res.render('devices/new');
});

module.exports = router;
