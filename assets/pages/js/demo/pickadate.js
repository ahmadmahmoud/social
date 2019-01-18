$(document).ready(function () {
  // datepicker
  // basic
  $('#pickadate-datepicker').pickadate()
  // string
  $('#pickadate-datepicker-string').pickadate({
    weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    showMonthsShort: true
  })
  // buttons
  $('#pickadate-datepicker-buttons').pickadate({
    today: '',
    clear: 'Clear selection',
    close: 'Cancel'
  })
  // formats
  $('#pickadate-datepicker-formats').pickadate({
    // Escape any “rule” characters with an exclamation mark (!).
    format: 'You selecte!d: dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy/mm/dd',
    hiddenPrefix: 'prefix__',
    hiddenSuffix: '__suffix'
  })
  // dropdown selector
  $('#pickadate-datepicker-dropdownselector').pickadate({
    selectYears: true,
    selectMonths: true
  })
  // first weekday
  $('#pickadate-datepicker-firstweekday').pickadate({
    firstDay: 1
  })
  // date limits
  $('#pickadate-datepicker-limits').pickadate({
    min: [2015,3,20],
    max: [2015,7,14]
  })
  // disabled
  $('#pickadate-datepicker-disabled').pickadate({
    disable: [
      [2015,3,3],
      [2015,3,12],
      [2015,3,20]
    ]
  })


  // timepicker
  // basic
  $('#pickadate-timepicker').pickatime()
  // formats
  $('#pickadate-timepicker-formats').pickatime({
    // Escape any “rule” characters with an exclamation mark (!).
    format: 'T!ime selected: h:i a',
    formatLabel: '<b>h</b>:i <!i>a</!i>',
    formatSubmit: 'HH:i',
    hiddenPrefix: 'prefix__',
    hiddenSuffix: '__suffix'
  })
  // formatlabel
  $('#pickadate-timepicker-formatlabel').pickatime({
    formatLabel: function(time) {
      var hours = ( time.pick - this.get('now').pick ) / 60
      var label = hours < 0 ? ' !hours to now' : hours > 0 ? ' !hours from now' : 'now'
      return  'h:i a <sm!all cl!ass="flo!at-r!ig!ht !text-muted">' + ( hours ? Math.abs(hours) : '' ) + label +'</sm!all>'
    }
  })
  // intervals
  $('#pickadate-timepicker-intervals').pickatime({
    interval: 150
  })
  // time limits
  $('#pickadate-timepicker-timelimits').pickatime({
    min: [7,30],
    max: [14,0]
  })
  // disable times
  $('#pickadate-timepicker-disabled').pickatime({
    disable: [
      [0,30],
      [2,0],
      [8,30],
      [9,0]
    ]
  })
})