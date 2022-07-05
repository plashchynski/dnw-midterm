const config = {
  db: {
    host: 'localhost',
    user: 'gader',
    password: '12345678',
    database: 'gader_dev',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    debug: true,
  },
};

module.exports = config;
