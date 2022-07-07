if (!global.listeners) {
  global.listeners = [];
}

function broadcast(data) {
  global.listeners.forEach((listener) => listener.response.write(`data: ${JSON.stringify(data)}\n\n`));
}

function addListener(response) {
  const listenerId = Date.now();

  const newListener = {
    id: listenerId,
    response,
  };

  global.listeners.push(newListener);

  return listenerId;
}

function removeListener(listenerId) {
  global.listeners.filter((listener) => listener.id !== listenerId);
}

module.exports = {
  broadcast,
  addListener,
  removeListener,
};
