// This file implements notifications from the server-side to the client-side

// list of subscribed clients
if (!global.listeners) {
  global.listeners = [];
}

// send a message to all subscribed clients
function broadcast(data) {
  global.listeners.forEach((listener) => listener.response.write(`data: ${JSON.stringify(data)}\n\n`));
}

// add a new subscribed client (a response object)
function addListener(response) {
  const listenerId = Date.now();

  const newListener = {
    id: listenerId,
    response,
  };

  global.listeners.push(newListener);

  return listenerId;
}

// remove a client from the subscription list
function removeListener(listenerId) {
  global.listeners.filter((listener) => listener.id !== listenerId);
}

module.exports = {
  broadcast,
  addListener,
  removeListener,
};
