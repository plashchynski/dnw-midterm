const express = require('express');
const db = require('../services/db');
const notifications = require('../services/notifications');

const router = express.Router();

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

module.exports = router;
