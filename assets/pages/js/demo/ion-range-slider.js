$(document).ready(function () {
  // Simple start and customising basic params
  $('#range_01').ionRangeSlider()
  $('#range_02').ionRangeSlider({
    min: 100,
    max: 1000,
    from: 550
  })
  $('#range_03').ionRangeSlider({
    type: 'double',
    grid: true,
    min: 0,
    max: 1000,
    from: 200,
    to: 800,
    prefix: '$'
  })

  // Set up range and step
  $('#range_04').ionRangeSlider({
    type: 'double',
    grid: true,
    min: -1000,
    max: 1000,
    from: -500,
    to: 500
  })
  $('#range_05').ionRangeSlider({
    type: 'double',
    grid: true,
    min: -1000,
    max: 1000,
    from: -500,
    to: 500,
    step: 250
  })
  $('#range_06').ionRangeSlider({
    type: 'double',
    grid: true,
    min: -12.8,
    max: 12.8,
    from: -3.2,
    to: 3.2,
    step: 0.1
  })

  // Using custom values array
  $('#range_07').ionRangeSlider({
    type: 'double',
    grid: true,
    from: 1,
    to: 5,
    values: [0, 10, 100, 1000, 10000, 100000, 1000000]
  })
  $('#range_08').ionRangeSlider({
    grid: true,
    from: 5,
    values: [
      'zero', 'one',
      'two', 'three',
      'four', 'five',
      'six', 'seven',
      'eight', 'nine',
      'ten'
    ]
  })
  $('#range_09').ionRangeSlider({
    grid: true,
    from: 3,
    values: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  })

  // Prettify visual look of numbers
  $('#range_10').ionRangeSlider({
    grid: true,
    min: 1000,
    max: 1000000,
    from: 100000,
    step: 1000,
    prettify_enabled: false
  })
  $('#range_11').ionRangeSlider({
    grid: true,
    min: 1000,
    max: 1000000,
    from: 200000,
    step: 1000,
    prettify_enabled: true
  })
  $('#range_12').ionRangeSlider({
    grid: true,
    min: 1000,
    max: 1000000,
    from: 300000,
    step: 1000,
    prettify_enabled: true,
    prettify_separator: '.'
  })
  $('#range_13').ionRangeSlider({
    grid: true,
    min: 1000,
    max: 1000000,
    from: 400000,
    step: 1000,
    prettify_enabled: true,
    prettify: function (num) {
      return (Math.random() * num).toFixed(0)
    }
  })

  // Decorating numbers
  $('#range_14').ionRangeSlider({
    type: 'double',
    grid: true,
    min: 0,
    max: 10000,
    from: 1000,
    step: 9000,
    prefix: '$'
  })
  $('#range_15').ionRangeSlider({
    type: 'single',
    grid: true,
    min: -90,
    max: 90,
    from: 0,
    postfix: '°'
  })
  $('#range_16').ionRangeSlider({
    grid: true,
    min: 18,
    max: 70,
    from: 30,
    prefix: 'Age ',
    max_postfix: '+'
  })
  $('#range_17').ionRangeSlider({
    type: 'double',
    min: 100,
    max: 200,
    from: 145,
    to: 155,
    prefix: 'Weight: ',
    postfix: ' million pounds',
    decorate_both: true
  })
  $('#range_18').ionRangeSlider({
    type: 'double',
    min: 100,
    max: 200,
    from: 145,
    to: 155,
    prefix: 'Weight: ',
    postfix: ' million pounds',
    decorate_both: false
  })
  $('#range_19').ionRangeSlider({
    type: 'double',
    min: 100,
    max: 200,
    from: 148,
    to: 152,
    prefix: 'Weight: ',
    postfix: ' million pounds',
    values_separator: ' &rarr; '
  })
  $('#range_20').ionRangeSlider({
    type: 'double',
    min: 100,
    max: 200,
    from: 148,
    to: 152,
    prefix: 'Range: ',
    postfix: ' light years',
    decorate_both: false,
    values_separator: ' to '
  })

  // Visual details
  $('#range_21').ionRangeSlider({
    type: 'double',
    min: 1000,
    max: 2000,
    from: 1200,
    to: 1800,
    hide_min_max: true,
    hide_from_to: true,
    grid: false
  })
  $('#range_22').ionRangeSlider({
    type: 'double',
    min: 1000,
    max: 2000,
    from: 1200,
    to: 1800,
    hide_min_max: true,
    hide_from_to: true,
    grid: true
  })
  $('#range_23').ionRangeSlider({
    type: 'double',
    min: 1000,
    max: 2000,
    from: 1200,
    to: 1800,
    hide_min_max: false,
    hide_from_to: true,
    grid: false
  })
  $('#range_24').ionRangeSlider({
    type: 'double',
    min: 1000,
    max: 2000,
    from: 1200,
    to: 1800,
    hide_min_max: true,
    hide_from_to: false,
    grid: false
  })


  /**
   * Advanced
   * =====================================================
   */

  // Keeping range slider inside it's container
  $('#range_25').ionRangeSlider({
    type: 'double',
    min: 1000000,
    max: 2000000,
    grid: true
  })
  $('#range_26').ionRangeSlider({
    type: 'double',
    min: 1000000,
    max: 2000000,
    grid: true,
    force_edges: true
  })

  // The grid
  $('#range_27').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 10000,
    grid: true
  })
  $('#range_28').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 10000,
    grid: true,
    grid_num: 10
  })
  $('#range_29').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 10000,
    step: 500,
    grid: true,
    grid_snap: true
  })
  $('#range_30').ionRangeSlider({
    type: 'single',
    min: 0,
    max: 10,
    step: 2.34,
    grid: true,
    grid_snap: true
  })

  // Lock handles
  $('#range_31').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    from_fixed: true
  })
  $('#range_32').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    from_fixed: true,
    to_fixed: true
  })

  // Movement limits
  $('#range_33').ionRangeSlider({
    min: 0,
    max: 100,
    from: 30,
    from_min: 10,
    from_max: 50
  })
  $('#range_34').ionRangeSlider({
    min: 0,
    max: 100,
    from: 30,
    from_min: 10,
    from_max: 50,
    from_shadow: true
  })
  $('#range_35').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 20,
    from_min: 10,
    from_max: 30,
    from_shadow: true,
    to: 80,
    to_min: 70,
    to_max: 90,
    to_shadow: true,
    grid: true,
    grid_num: 10
  })

  // Disable the slider
  $('#range_36').ionRangeSlider({
    min: 0,
    max: 100,
    from: 30,
    disable: true
  })

  // Keyboard controls
  $('#range_37').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    keyboard: true
  })
  $('#range_38').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    keyboard: true,
    keyboard_step: 20
  })

  // Working with dates and time, using moment.js
  $('#range_39').ionRangeSlider({
    min: +moment().subtract(1, 'years').format('X'),
    max: +moment().format('X'),
    from: +moment().subtract(6, 'months').format('X'),
    prettify: function (num) {
      return moment(num, 'X').locale('en').format('LL')
    }
  })
  $('#range_40').ionRangeSlider({
    min: +moment().subtract(12, 'hours').format('X'),
    max: +moment().format('X'),
    from: +moment().subtract(6, 'hours').format('X'),
    prettify: function (num) {
      return moment(num, 'X').locale('en').format('MMM Do, hh:mm A')
    }
  })
  $('#range_41').ionRangeSlider({
    min: +moment().subtract(12, 'hours').format('X'),
    max: +moment().format('X'),
    from: +moment().subtract(6, 'hours').format('X'),
    grid: true,
    force_edges: true,
    prettify: function (num) {
      var m = moment(num, 'X').locale('ru')
      return m.format('Do MMMM, HH:mm')
    }
  })
  $('#range_42').ionRangeSlider({
    min: +moment().subtract(12, 'hours').format('X'),
    max: +moment().format('X'),
    from: +moment().subtract(6, 'hours').format('X'),
    grid: true,
    force_edges: true,
    prettify: function (num) {
      var m = moment(num, 'X').locale('ja')
      return m.format('Do MMMM, LT')
    }
  })

  // Manipulating interval
  $('#range_43').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    min_interval: 20
  })
  $('#range_44').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    max_interval: 50
  })
  $('#range_45').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 30,
    to: 70,
    drag_interval: true
  })


  /**
   * Interactions
   * =====================================================
   */

  // Sliders callbacks demo
  var $range47 = $('#range_47')
  var $update47 = $('.js-update-47')
  var $r1 = $('.js-reaction-1')
  var $r2 = $('.js-reaction-2')
  var $r3 = $('.js-reaction-3')
  var $r4 = $('.js-reaction-4')
  var tm
  var removeState47 = function () {
    $r1.removeClass('state-success')
    $r2.removeClass('state-success')
    $r3.removeClass('state-success')
    $r4.removeClass('state-success')
  }
  $range47.ionRangeSlider({
    type: 'single',
    min: 0,
    max: 100,
    from: 50,
    keyboard: true,
    onStart: function (data) {
      $r1.addClass('state-success')
      clearTimeout(tm)
      tm = setTimeout(removeState47, 150)
    },
    onChange: function (data) {
      $r2.addClass('state-success')
      clearTimeout(tm)
      tm = setTimeout(removeState47, 150)
    },
    onFinish: function (data) {
      $r3.addClass('state-success')
      clearTimeout(tm)
      tm = setTimeout(removeState47, 150)
    },
    onUpdate: function (data) {
      $r4.addClass('state-success')
      clearTimeout(tm)
      tm = setTimeout(removeState47, 150)
    }
  })
  var slider47 = $range47.data('ionRangeSlider')
  $update47.on('click', function () {
    slider47.update({
      from: 10
    })
  })

  // Tracking range slider values:
  var $range48 = $('#range_48')
  var $result48 = $('#result_48')
  var track48 = function (data) {
    delete data.input
    delete data.slider
    if (JSON) {
      $result48.html(JSON.stringify(data, null, 2))
    } else {
      $result48.html(data.toString())
    }
  }
  $range48.ionRangeSlider({
    type: 'double',
    min: 1000,
    max: 5000,
    from: 2000,
    to: 4000,
    step: 100,
    onStart: track48,
    onChange: track48,
    onFinish: track48,
    onUpdate: track48
  })

  // Another example of using callbacks:
  var $range49 = $('#range_49')
  var $result49 = $('#result_49')
  var track49 = function (data) {
    delete data.input
    delete data.slider
    if (JSON) {
      $result49.html(JSON.stringify(data, null, 2))
    } else {
      $result49.html(data.toString())
    }
  }
  $range49.ionRangeSlider({
    type: 'double',
    values: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    onStart: track49,
    onChange: track49,
    onFinish: track49,
    onUpdate: track49
  })

  // Tracking only slider value:
  var $range50 = $('#range_50')
  var $result50 = $('#result_50')
  var track50 = function (data) {
    $result50.html('Value: ' + data.from)
  }
  $range50.ionRangeSlider({
    type: 'single',
    min: 1000,
    max: 5000,
    from: 2000,
    step: 100,
    onStart: track50,
    onChange: track50,
    onFinish: track50,
    onUpdate: track50
  })

  // Using onChange event, triggered on base input element
  var $range51 = $('#range_51')
  var $result51 = $('#result_51')
  var track51 = function () {
    var $this = $(this)
    var value = $this.prop('value')
    $result51.html('Value: ' + value)
  }
  $range51.ionRangeSlider({
    type: 'single',
    min: 0,
    max: 100,
    from: 50
  })
  $range51.on('change', track51)

  // Reading values for double slider
  var $range52 = $('#range_52')
  var $result52 = $('#result_52')
  var track52 = function () {
    var $this = $(this)
    var value = $this.prop('value').split(';')
    $result52.html(value[0] + ' - ' + value[1])
  }
  $range52.ionRangeSlider({
    type: 'double',
    min: 0,
    max: 100,
    from: 20,
    to: 80
  })
  $range52.on('change', track52)

  // Reading values from data attributes
  var $range53 = $('#range_53')
  var $result53 = $('#result_53')
  var track53 = function () {
    var $this = $(this)
    var from = $this.data('from')
    var to = $this.data('to')
    $result53.html(from + ' - ' + to)
  }
  $range53.ionRangeSlider({
    type: 'double',
    min: 1000,
    max: 5000,
    from: 2000,
    to: 4000
  })
  $range53.on('change', track53)

  // Update range slider to some random values
  var $range54 = $('#range_54')
  var $update_btn54 = $('.js-update-54')
  var rand = function (start, end) {
    var r = end - start
    r = Math.random() * r
    r = start + r
    return Math.round(r)
  }
  $range54.ionRangeSlider({
    type: 'double',
    min: 0,
    max: 1000,
    from: 200,
    to: 500,
    grid: true
  })
  var slider54 = $range54.data('ionRangeSlider')
  $update_btn54.on('click', function () {
    var result = {
      min: rand(0, 1000),
      max: rand(9000, 10000),
      from: rand(2000, 3000),
      to: rand(7000, 8000),
      step: rand(1, 50),
      grid_num: rand(4, 12)
    }
    slider54.update(result)
  })

  // Update range slider to values array
  var $range55 = $('#range_55')
  var $update_btn55 = $('.js-update-55')
  $range55.ionRangeSlider({
    type: 'single',
    grid: true,
    values: ['one', 'two', 'three']
  })
  var slider55 = $range55.data('ionRangeSlider')
  $update_btn55.on('click', function () {
    slider55.update({
      values: ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
    })
  })

  // Reset range slider
  var $range56 = $('#range_56')
  var $reset_btn56 = $('.js-reset-56')
  $range56.ionRangeSlider({
    type: 'double',
    min: 0,
    max: 1000,
    from: 200,
    to: 500,
    grid: true
  })
  var slider56 = $range56.data('ionRangeSlider')
  $reset_btn56.on('click', function () {
    slider56.reset()
  })

  // destroy method
  var $range57 = $('#range_57')
  var $create_btn57 = $('.js-create-57')
  var $destroy_btn57 = $('.js-destroy-57')
  var $update_btn57 = $('.js-update-57')
  var slider57
  var create57 = function () {
    $range57.ionRangeSlider({
      type: 'double',
      min: 0,
      max: 1000,
      grid: true
    })
    slider57 = $range57.data('ionRangeSlider');
  }
  $create_btn57.on('click', function () {
    create57()
  })
  $destroy_btn57.on('click', function () {
    slider57 && slider57.destroy()
  })
  $update_btn57.on('click', function () {
    slider57 && slider57.update({
      from: 100,
      to: 900
    })
  })

  // read value from input
  var $range58 = $('#range_58')
  var $create_btn58 = $('.js-create-58')
  var $destroy_btn58 = $('.js-destroy-58')
  var $update_btn58 = $('.js-update-58')
  var slider58
  var create58 = function () {
    $range58.ionRangeSlider({
      type: 'double',
      values: ['A','B','C','D','E','F','G','H','I','J'],
      grid: true
    })
    slider58 = $range58.data('ionRangeSlider')
  }
  $create_btn58.on('click', function () {
    create58()
  })
  $destroy_btn58.on('click', function () {
    slider58 && slider58.destroy()
  })
  $update_btn58.on('click', function () {
    slider58 && slider58.update({
      from: 1,
      to: 8
    })
  })

  // Testing input
  var $range59 = $('#range_59')
  var $create_btn59 = $('.js-create-59')
  var $destroy_btn59 = $('.js-destroy-59')
  var $update_btn59 = $('.js-update-59')
  var slider59
  var create59 = function () {
    $range59.ionRangeSlider({
      type: 'double',
      values: [1, 10, 100, 1000, 10000],
      grid: true
    })
    slider59 = $range59.data('ionRangeSlider')
  }
  $create_btn59.on('click', function () {
    create59()
  })
  $destroy_btn59.on('click', function () {
    slider59 && slider59.destroy()
  })
  $update_btn59.on('click', function () {
    slider59 && slider59.update({
      from: 2,
      to: 4
    })
  })
})