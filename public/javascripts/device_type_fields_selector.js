// Hide fields for new and update form that is not related to the selected device type
(() => {
  // This function displays relevant fields according to the selected device type
  function ensureFields() {
    const volume = document.getElementById('volumeOptions');
    const targetTemp = document.getElementById('temperatureTargetOptions');
    const sensorTemp = document.getElementById('temperatureSensorOptions');

    // Default to hide all optional fields
    volume.style.display = 'none';
    targetTemp.style.display = 'none';
    sensorTemp.style.display = 'none';

    // reset values in input fields
    volume.getElementsByTagName('input')[0].value = '';
    targetTemp.getElementsByTagName('input')[0].value = '';
    sensorTemp.getElementsByTagName('input')[0].value = '';

    const deviceTypeSelector = document.getElementById('deviceTypeSelector');
    const selectedType = deviceTypeSelector.selectedOptions[0].value;

    if (selectedType === 'tv' || selectedType === 'door_chime') {
      volume.style.display = 'block';
    }

    if (selectedType === 'ac' || selectedType === 'heater') {
      targetTemp.style.display = 'block';
    }

    if (selectedType === 'ac' || selectedType === 'heater' || selectedType === 'thermometer_sensor') {
      sensorTemp.style.display = 'block';
    }
  }

  const deviceTypeSelector = document.getElementById('deviceTypeSelector');
  deviceTypeSelector.addEventListener('change', ensureFields);
  ensureFields();
})();
