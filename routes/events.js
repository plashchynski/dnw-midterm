const express = require('express');
const notifications = require('../services/notifications');

const router = express.Router();

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  response.writeHead(200, headers);

  const listenerId = notifications.addListener(response);

  request.on('close', () => {
    console.log(`${listenerId} Connection closed`);
    notifications.removeListener(listenerId);
  });
}

router.get('/', eventsHandler);

module.exports = router;
