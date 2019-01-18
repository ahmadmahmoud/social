$(document).ready(function () {
  // Date range picker
  $('#daterange1').daterangepicker()

  // Date and time
  $('#daterange2').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: 'MM/DD/YYYY h:mm A'
    }
  })

  // Single date picker
  $('#daterange3').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true
  }, function (start, end, label) {
    var years = moment().diff(start, 'years')
    toastr.info('You are ' + years + ' years old.')
  })

  // Predefined ranges
  var start = moment().subtract(29, 'days')
  var end = moment()
  var cb = function (start, end) {
    $('#daterange4 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  }
  $('#daterange4').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
       'Today': [moment(), moment()],
       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
       'This Month': [moment().startOf('month'), moment().endOf('month')],
       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb)
  cb(start, end)

  // Input initially empty
  $('#daterange5').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear'
    }
  })
  $('#daterange5').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'))
  })
  $('#daterange5').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('')
  })
})