const express = require('express');
const db = require('../services/db');

const router = express.Router();

// purpose: display the device status page with a list of dvices
// inputs: no
// outputs: html
router.get('/status', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/status_selector', { devices: data });
});

// purpose: display the device status page
// inputs: deviceId
// outputs: html
router.get('/status/:deviceId', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.render('devices/display_status', { device: data[0], successMessage: req.flash('successMessage') });
});

// purpose: display the new device page
// inputs: no
// outputs: html
router.get('/new', (req, res, next) => {
  res.render('devices/new');
});

// purpose: display the device controll page with a list of dvices
// inputs: no
// outputs: html
router.get('/control', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/control_selector', { devices: data });
});

// purpose: display the device controll page form
// inputs: deviceId
// outputs: html
router.get('/control/:deviceId', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.render('devices/control', { device: data[0] });
});

// purpose: display the delete device page with a list of dvices
// inputs: deviceId
// outputs: html
router.get('/delete', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/delete_selector', { devices: data, successMessage: req.flash('successMessage') });
});

module.exports = router;
