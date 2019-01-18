$(document).ready(function () {
  var picker = new Pikaday({
    field: document.getElementById('pikaday'),
    format: 'D MMM YYYY',
    firstDay: 1,
    minDate: new Date(),
    maxDate: new Date(2020, 12, 31),
    yearRange: [2000,2020]
  })
})