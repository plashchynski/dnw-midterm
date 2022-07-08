const express = require('express');
const db = require('../services/db');
const notifications = require('../services/notifications');

const router = express.Router();

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

module.exports = router;
