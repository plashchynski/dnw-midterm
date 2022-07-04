const express = require('express');
const mysql = require('mysql');



const router = express.Router();

router.get('/status', (req, res, next) => {
  res.render('devices/status');
});

router.get('/new', (req, res, next) => {
  res.render('devices/new');
});

// Create a new device
router.post('/', (req, res, next) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'gader',
    password: '12345678',
    database: 'gader_dev',
  });

  connection.connect((err) => {
    if (err) {
      res.status(500).send(`Database error: ${err}`);
      return;
    }

    const sql = 'INSERT INTO devices (name, type, description, status) VALUES (?, ?, ?, ?)';
    const status = 'off';

    console.log(JSON.stringify(req.body));

    const name = req.body.name;
    const type = req.body.type;
    const description = req.body.description;

    connection.query(sql, [name, type, description, status], (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Database error: ${err}`);
        return;
      }

      res.redirect('/devices/new');
    });
  });
});

router.get('/control', (req, res, next) => {
  res.render('devices/control');
});

router.get('/delete', (req, res, next) => {
  res.render('devices/delete');
});

module.exports = router;
