$(document).ready(function () {
  // bootstrap datepicker range
  $('#datepicker-range').datepicker({
    todayHighlight: true
  })

  // bootstrap timepicker default icon
  $.fn.timepicker.defaults.icons = {
    up: 'fa fa-chevron-up',
    down: 'fa fa-chevron-down'
  }
})