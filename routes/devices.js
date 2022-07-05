const express = require('express');
const db = require('../services/db');

const router = express.Router();

router.get('/status', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/status_selector', { devices: data });
});

router.get('/status/:deviceId', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.render('devices/display_status', { device: data[0] });
});

router.get('/new', (req, res, next) => {
  res.render('devices/new');
});

// Create a new device
router.post('/', async (req, res, next) => {
  const { description, type, name } = req.body;
  const status = 'off';
  const fields = [name, type, description, status];

  await db.query('INSERT INTO devices (name, type, description, status) VALUES (?, ?, ?, ?)', fields);

  res.redirect('/devices/new');
});

router.get('/control', (req, res, next) => {
  res.render('devices/control');
});

router.get('/delete', (req, res, next) => {
  res.render('devices/delete');
});

module.exports = router;
