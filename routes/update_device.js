const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../services/db');
const notifications = require('../services/notifications');

const router = express.Router();

router.post(
  '/control/:deviceId',

  // This is sanitization and validation of input
  body('name').notEmpty().escape(),
  body('description').escape(),
  body('status').notEmpty().isIn(['ok', 'alert', 'opened', 'closed', 'error']),
  body('temperatureSensorValue').toInt(),
  body('temperatureTargetValue').toInt(),
  body('volume').toInt(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Display validation errors. During normal operation, this should not happen because
      // client-side validation should catch all errors even before a request.
      // But if it did happen, then this output can be used for debugging.
      return res.status(400).json({ errors: errors.array() });
    }

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
  },
);

module.exports = router;
