const express = require('express');
const db = require('../services/db');
const notifications = require('../services/notifications');

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

// Create a new device
router.post('/', async (req, res, next) => {
  const {
    description, status, type, name, temperatureSensorValue, temperatureTargetValue, volume,
  } = req.body;

  const powerOn = (req.body.powerOn === '1') ? 1 : 0;

  const values = [name, type, description, powerOn, status, temperatureSensorValue,
    temperatureTargetValue, volume].map((v) => ((v === undefined) ? null : v));

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

  const result = await db.query(sql, values);
  const newDeviceId = result.insertId;

  notifications.broadcast({ created: newDeviceId });

  req.flash('successMessage', 'A new device was successfully added');
  res.redirect(`/devices/status/${newDeviceId}`);
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
  const { deviceId } = req.params;

  const {
    description, name, status, temperatureSensorValue,
    temperatureTargetValue, volume,
  } = req.body;

  const powerOn = (req.body.powerOn === '1') ? 1 : 0;

  const values = [name, description, powerOn, status, temperatureSensorValue,
    temperatureTargetValue, volume, deviceId].map((v) => ((v === undefined) ? null : v));

  const sql = `
    UPDATE devices
    SET name = ?,
      description = ?,
      powerOn = ?,
      status = ?,
      temperatureSensorValue = ?,
      temperatureTargetValue = ?,
      volume = ?
    WHERE id = ?`;

  await db.query(sql, values);

  notifications.broadcast({ updated: deviceId });

  req.flash('successMessage', 'A device was successfully updated');

  res.redirect(`/devices/status/${deviceId}`);
});

router.get('/delete', async (req, res, next) => {
  const data = await db.query('SELECT * FROM devices;');
  res.render('devices/delete_selector', { devices: data, successMessage: req.flash('successMessage') });
});

router.post('/delete/:deviceId', async (req, res, next) => {
  await db.query('DELETE FROM devices WHERE id = ?;', [req.params.deviceId]);
  notifications.broadcast({ deleted: req.params.deviceId });

  req.flash('successMessage', 'A device was successfully deleted');
  res.redirect('/devices/delete');
});

module.exports = router;
