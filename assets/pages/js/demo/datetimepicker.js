$(document).ready(function () {
  // replace default icons as vision doesn't support glyphicon
  $.fn.datetimepicker.defaults.icons = {
    time: 'fa fa-clock-o',
    date: 'fa fa-calendar',
    up: 'fa fa-chevron-up',
    down: 'fa fa-chevron-down',
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-calendar-check-o',
    clear: 'fa fa-minus',
    close: 'fa fa-times'
  }

  // datetimepicker 1 & 3
  $('#datetimepicker1, #datetimepicker3').datetimepicker()

  // datetimepicker 2
  $('#datetimepicker2').datetimepicker({
    format: 'LT'
  })

  // datetimepicker 4
  $('#datetimepicker4').datetimepicker({
    defaultDate: '06/1/2017',
    disabledDates: [
      moment('06/25/2017'), new Date(2017, 11 - 1, 21), '07/22/2017 00:53'
    ]
  })

  // datetimepicker 5
  $('#datetimepicker5').datetimepicker({
    viewMode: 'years',
    format: 'MM/YYYY'
  })

  // datetimepicker 6
  $('#datetimepicker6').datetimepicker({
    inline: true,
    sideBySide: true
  })
})