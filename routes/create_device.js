const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../services/db');
const notifications = require('../services/notifications');

const router = express.Router();

// purpose: create a new device
// inputs: name, type, description, powerOn, status, temperatureSensorValue,
//    temperatureTargetValue, volume
// outputs: redirects to /devices/status/${newDeviceId} with a success message
router.post(
  '/',

  // This is sanitization and validation of input
  body('name').notEmpty().escape(),
  body('description').escape(),
  body('status').notEmpty().isIn(['ok', 'alert', 'opened', 'closed', 'error']),
  body('type').notEmpty().isIn(['ac', 'heater', 'curtain', 'lighting', 'tv', 'camera',
    'door_chime', 'thermometer_sensor', 'motion_sensor', 'door_open_sensor']),
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

    const {
      name, description, status, type, temperatureSensorValue, temperatureTargetValue, volume,
    } = req.body;

    const powerOn = (req.body.powerOn === '1') ? 1 : 0;

    // set all undefined to NULL as mysql2 requires
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

    // notify clients about changes
    notifications.broadcast({ created: newDeviceId });

    // This is a success feedback message
    req.flash('successMessage', 'A new device was successfully added');
    res.redirect(`/devices/status/${newDeviceId}`);
  },
);

module.exports = router;
