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
  const {
    description, status, type, name, temperatureSensorValue, temperatureTargetValue, volume,
  } = req.body;

  const powerOn = (req.body.powerOn === '1') ? 1 : 0;

  const values = [name, type, description, powerOn, status, temperatureSensorValue,
    temperatureTargetValue, volume];

  const sql = `
  INSERT INTO devices (
    name,
    type,
    description,
    powerOn,
    status,
    temperatureSensorValue,
    temperatureTargetValue,
    volume
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  await db.query(sql, values);

  res.redirect('/devices/new');
});

router.get('/control', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/control_selector', { devices: data });
});

router.get('/control/:deviceId', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.render('devices/control', { device: data[0] });
});

// Update the device
router.post('/control/:deviceId', async (req, res, next) => {
  const {
    description, type, name, status, temperatureSensorValue,
    temperatureTargetValue, volume,
  } = req.body;

  const powerOn = (req.body.powerOn === '1') ? 1 : 0;

  const values = [name, type, description, powerOn, status, temperatureSensorValue,
    temperatureTargetValue, volume, req.params.deviceId];

  const sql = `
    UPDATE devices
    SET name = ?,
      type = ?,
      description = ?,
      powerOn = ?,
      status = ?,
      temperatureSensorValue = ?,
      temperatureTargetValue = ?,
      volume = ?
    WHERE id = ?`;

  await db.query(sql, values);

  res.redirect(`/devices/status/${req.params.deviceId}`);
});

router.get('/delete', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/delete_selector', { devices: data });
});

router.post('/delete/:deviceId', async (req, res, next) => {
  await db.query('DELETE FROM devices WHERE id = ?;', [req.params.deviceId]);
  res.redirect('/devices/delete');
});

module.exports = router;
