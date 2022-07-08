const express = require('express');
const db = require('../services/db');

const router = express.Router();

router.get('/status', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/status_selector', { devices: data });
});

router.get('/status/:deviceId', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.render('devices/display_status', { device: data[0], successMessage: req.flash('successMessage') });
});

router.get('/new', (req, res, next) => {
  res.render('devices/new');
});

router.get('/control', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/control_selector', { devices: data });
});

router.get('/control/:deviceId', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.render('devices/control', { device: data[0] });
});

router.get('/delete', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/delete_selector', { devices: data, successMessage: req.flash('successMessage') });
});

module.exports = router;
