const homeRouter = require('./home');
const aboutRouter = require('./about');
const devicesRouter = require('./devices');
const createDevice = require('./create_device');
const updateDevice = require('./update_device');
const deleteDevice = require('./delete_device');
const eventsRouter = require('./events');

module.exports = (app) => {
  // purpose: display the home page /
  // inputs: no
  // outputs: html generated using template home.ejs
  app.use('/', homeRouter);

  // purpose: display the about page /
  // inputs: no
  // outputs: html generated using template about.ejs
  app.use('/about', aboutRouter);

  // purpose: create a new device
  // inputs: name, type, description, powerOn, status, temperatureSensorValue,
  //    temperatureTargetValue, volume
  // outputs: redirects to /devices/status/${newDeviceId} with a success message
  app.use('/devices', createDevice);

  // purpose: update a device
  // inputs: name, description, powerOn, status, temperatureSensorValue,
  //    temperatureTargetValue, volume, deviceId
  // outputs: redirects to /devices/status/${newDeviceId} with a success message
  app.use('/devices', updateDevice);

  // purpose: delete a device
  // inputs: deviceId
  // outputs: redirects to /devices/delete with a success message
  app.use('/devices', deleteDevice);

  // purpose: display the pages with information about devices
  // inputs: some routes accept deviceId as a parameter
  // outputs: html generated using templates in devices/
  app.use('/devices', devicesRouter);

  // purpose: send events to the client side for hot reloading (hot_reloading.js)
  // inputs: no
  // outputs: events once a device created, updated, or deleted.
  app.use('/events', eventsRouter);
};
