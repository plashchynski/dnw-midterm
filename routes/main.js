const homeRouter = require('./home');
const aboutRouter = require('./about');
const devicesRouter = require('./devices');
const eventsRouter = require('./events');

module.exports = (app) => {
  app.use('/', homeRouter);
  app.use('/about', aboutRouter);
  app.use('/devices', devicesRouter);
  app.use('/events', eventsRouter);
};
