$(document).ready(function () {
  // basic
  $('#slider1').slider({
    formatter: function (value) {
      return 'Current value: ' + value
    }
  })

  // small
  $('#slider2').slider({
    formatter: function (value) {
      return 'Current value: ' + value
    }
  })

  // events
  var RGBChange = function () {
    $('#rgb').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
    $('#rgbValue').text('rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
  }
  var r = $('#R').slider()
    .on('change', RGBChange)
    .data('slider')
  var g = $('#G').slider()
    .on('change', RGBChange)
    .data('slider')
  var b = $('#B').slider()
    .on('change', RGBChange)
    .data('slider')

  // vertical
  $('.slider4').slider({
    reversed : true
  })

  // range
  $('#slider5').slider()

  // destroy
  $('#slider6').slider()
  $('#destroySlider6').on('click', function () {
    $('#slider6').slider('destroy')
  })

  // custom label
  $('#slider7').slider()
  $('#slider7').on('slide', function(slideEvt) {
    $('#slider7SliderVal').text(slideEvt.value)
  })

  // enable/disable
  $('#slider8').slider()
  $('#slider8-enabled').on('change', function () {
    if ($(this).is(':checked')) {
      $('#slider8').slider('enable')
    } else {
      $('#slider8').slider('disable')
    }
  })

  // tooltip no-hide
  $('#slider9').slider({
    tooltip: 'always'
  })

  // tooltip position
  $('#slider10').slider({
    min: 0,
    max: 10,
    value: 0,
    tooltip_position:'bottom',
    focus: true
  })

  // tick
  $('#slider11').slider({
    ticks: [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
  })

  // custom tick
  $('#slider12').slider({
    ticks: [0, 100, 200, 300, 400],
    ticks_positions: [0, 30, 60, 70, 90, 100],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
  })
})