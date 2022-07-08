const express = require('express');
const db = require('../services/db');
const notifications = require('../services/notifications');

const router = express.Router();

router.post('/delete/:deviceId', async (req, res, next) => {
  await db.query('DELETE FROM devices WHERE id = ?;', [req.params.deviceId]);
  notifications.broadcast({ deleted: req.params.deviceId });

  req.flash('successMessage', 'A device was successfully deleted');
  res.redirect('/devices/delete');
});

module.exports = router;
