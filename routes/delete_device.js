const express = require('express');
const db = require('../services/db');
const notifications = require('../services/notifications');

const router = express.Router();

// purpose: delete a device
// inputs: deviceId
// outputs: redirects to /devices/delete with a success message
router.post('/delete/:deviceId', async (req, res, next) => {
  await db.query('DELETE FROM devices WHERE id = ?;', [req.params.deviceId]);

  // notify clients about changes
  notifications.broadcast({ deleted: req.params.deviceId });

  // This is a success feedback message
  req.flash('successMessage', 'A device was successfully deleted');
  res.redirect('/devices/delete');
});

module.exports = router;
