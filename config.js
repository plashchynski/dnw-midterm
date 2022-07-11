// This file stores a persistent configuration for the whole project

const config = {
  // Database connection options
  db: {
    host: 'localhost',
    user: 'gader',
    password: '12345678',
    database: 'gader_dev',
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
  // This is for an express-session module
  sessionSecret: 'IgENGunEtiMetERonFEcHeFast',
};

module.exports = config;
