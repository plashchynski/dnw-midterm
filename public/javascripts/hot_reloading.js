// This files implement notifications from the server-side to the client-side

(() => {
  const evtSource = new EventSource('/events');
  evtSource.onmessage = (event) => {
    console.log(`onmessage: ${event.data}`);
    window.location.reload();
  };

  evtSource.onerror = (err) => {
    console.error('EventSource failed:', err);
  };
})();
