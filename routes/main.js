const homeRouter = require('./home');
const aboutRouter = require('./about');
const devicesRouter = require('./devices');
const createDevice = require('./create_device');
const updateDevice = require('./update_device');
const deleteDevice = require('./delete_device');
const eventsRouter = require('./events');

module.exports = (app) => {
  app.use('/', homeRouter);
  app.use('/about', aboutRouter);
  app.use('/devices', devicesRouter);
  app.use('/devices', createDevice);
  app.use('/devices', updateDevice);
  app.use('/devices', deleteDevice);
  app.use('/events', eventsRouter);
};
