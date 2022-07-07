// Display the confirmation modal when a user clicked on delete button on the
// Delete device page.

(function () {
  'use strict'

  var forms = document.querySelectorAll('.deleteDeviceForm');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!confirm("Are you sure you want to delete the device?")) {
          event.preventDefault()
          event.stopPropagation()
        }
      }, false);
    });
})();
