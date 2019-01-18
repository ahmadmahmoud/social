$(document).ready(function () {
  var resultElement = document.getElementById('result')
  var colorpicker = document.querySelector('#colorpicker')
  var sliders = colorpicker.querySelectorAll('div')
  // The setColor function
  var setColor = function () {
    // Get the slider values, stick them together.
    var color = 'rgb(' + sliders[0].noUiSlider.get() + ',' + sliders[1].noUiSlider.get() + ',' + sliders[2].noUiSlider.get() + ')'
    // Fill the color box.
    resultElement.style.background = color
    resultElement.style.color = color
  }
  // Initializing the slider
  for (var i = 0; i < sliders.length; i++) {
    noUiSlider.create(sliders[i], {
      start: 128,
      connect: [true, false],
      orientation: 'vertical',
      range: {
        'min': 0,
        'max': 255
      },
      format: wNumb({
        decimals: 0
      })
    })
    // Bind the color changing function
    // to the slide event.
    sliders[i].noUiSlider.on('slide', setColor)
    // sliders[i].setAttribute('disabled', true);
  }


  // Using HTML5 input elements
  // Appending <option> elements
  var select = document.getElementById('input-select')
  // Append the option elements
  for (var i = -20; i <= 40; i++){
    var option = document.createElement('option')
    option.text = i
    option.value = i

    select.appendChild(option)
  }
  // Initializing the slider
  var html5Slider = document.getElementById('html5')
  noUiSlider.create(html5Slider, {
    start: [ 10, 30 ],
    connect: true,
    range: {
      'min': -20,
      'max': 40
    }
  })
  // Linking the <select> and <input>
  var inputNumber = document.getElementById('input-number')
  html5Slider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle]
    if (handle) {
      inputNumber.value = value
    } else {
      select.value = Math.round(value)
    }
  })
  select.addEventListener('change', function () {
    html5Slider.noUiSlider.set([this.value, null])
  })
  inputNumber.addEventListener('change', function () {
    html5Slider.noUiSlider.set([null, this.value])
  })


  // Non linear slider
  // Setting up the slider
  var nonLinearSlider = document.getElementById('nonlinear')
  noUiSlider.create(nonLinearSlider, {
    connect: true,
    behaviour: 'tap',
    start: [ 500, 4000 ],
    range: {
      // Starting at 500, step the value by 500,
      // until 4000 is reached. From there, step by 1000.
      'min': [ 0 ],
      '10%': [ 500, 500 ],
      '50%': [ 4000, 1000 ],
      'max': [ 10000 ]
    }
  })
  // Read the slider value and the left offset
  var nodes = [
    document.getElementById('lower-value'), // 0
    document.getElementById('upper-value')  // 1
  ]
  // Display the slider value and how far the handle moved
  // from the left edge of the slider.
  nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
    nodes[handle].innerHTML = values[handle] + ', ' + positions[handle].toFixed(2) + '%'
  })


  // Locking sliders together
  // Setup and button clicks
  // Store the locked state and slider values.
  var lockedState = false
  var lockedSlider = false
  var lockedValues = [60, 80]
  var slider1 = document.getElementById('slider1')
  var slider2 = document.getElementById('slider2')
  var lockButton = document.getElementById('lockbutton')
  var slider1Value = document.getElementById('slider1-span')
  var slider2Value = document.getElementById('slider2-span')
  // When the button is clicked, the locked
  // state is inverted.
  lockButton.addEventListener('click', function () {
    lockedState = !lockedState
    this.textContent = lockedState ? 'unlock' : 'lock'
  })
  // The Crossupdate function
  var crossUpdate = function ( value, slider ) {
    // If the sliders aren't interlocked, don't
    // cross-update.
    if ( !lockedState ) return
    // Select whether to increase or decrease
    // the other slider value.
    var a = slider1 === slider ? 0 : 1, b = a ? 0 : 1
    // Offset the slider value.
    value -= lockedValues[b] - lockedValues[a]
    // Set the value
    slider.noUiSlider.set(value)
  }
  // Initializing the sliders
  noUiSlider.create(slider1, {
    start: 60,
    // Disable animation on value-setting,
    // so the sliders respond immediately.
    animate: false,
    range: {
      min: 50,
      max: 100
    }
  })
  noUiSlider.create(slider2, {
    start: 80,
    animate: false,
    range: {
      min: 50,
      max: 100
    }
  })
  slider1.noUiSlider.on('update', function (values, handle) {
    slider1Value.innerHTML = values[handle]
  })
  slider2.noUiSlider.on('update', function (values, handle) {
    slider2Value.innerHTML = values[handle]
  })
  // Linking the sliders together
  var setLockedValues = function () {
    lockedValues = [
      Number(slider1.noUiSlider.get()),
      Number(slider2.noUiSlider.get())
    ]
  }
  slider1.noUiSlider.on('change', setLockedValues)
  slider2.noUiSlider.on('change', setLockedValues)
  // The value will be send to the other slider,
  // using a custom function as the serialization
  // method. The function uses the global 'lockedState'
  // variable to decide whether the other slider is updated.
  slider1.noUiSlider.on('slide', function (values, handle){
    crossUpdate(values[handle], slider2)
  })
  slider2.noUiSlider.on('slide', function (values, handle){
    crossUpdate(values[handle], slider1)
  })


  // Colored Connect Elements
  var slider = document.getElementById('slider-color')
  noUiSlider.create(slider, {
    start: [4000, 8000, 12000, 16000],
    connect: [false, true, true, true, true],
    range: {
      'min': [2000],
      'max': [20000]
    }
  })
  var connect = slider.querySelectorAll('.noUi-connect')
  var classes = ['bg-primary', 'bg-info', 'bg-success', 'bg-warning', 'bg-danger']
  for (var i = 0; i < connect.length; i++) {
    connect[i].classList.add(classes[i])
  }


  // Changing the slider by keypress
  var keypressSlider = document.getElementById('keypress')
  var input0 = document.getElementById('input-with-keypress-0')
  var input1 = document.getElementById('input-with-keypress-1')
  var inputs = [input0, input1]
  // Initializing the slider and linking the input
  noUiSlider.create(keypressSlider, {
    start: [20, 80],
    connect: true,
    direction: 'rtl',
    tooltips: [true, wNumb({ decimals: 1 })],
    range: {
      'min': [0],
      '10%': [10, 10],
      '50%': [80, 50],
      '80%': 150,
      'max': 200
    }
  })
  keypressSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle]
  })
  // Listen to keypress on the input
  function setSliderHandle(i, value) {
    var r = [null,null]
    r[i] = value
    keypressSlider.noUiSlider.set(r)
  }
  // Listen to keydown events on the input field.
  inputs.forEach(function (input, handle) {
    input.addEventListener('change', function () {
      setSliderHandle(handle, this.value)
    })
    input.addEventListener('keydown', function (e) {
      var values = keypressSlider.noUiSlider.get()
      var value = Number(values[handle])
      // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
      var steps = keypressSlider.noUiSlider.steps()
      // [down, up]
      var step = steps[handle]
      var position
      // 13 is enter,
      // 38 is key up,
      // 40 is key down.
      switch ( e.which ) {
        case 13:
          setSliderHandle(handle, this.value)
          break
        case 38:
          // Get step to go increase slider value (up)
          position = step[1]
          // false = no step is set
          if ( position === false ) {
            position = 1
          }
          // null = edge of slider
          if ( position !== null ) {
            setSliderHandle(handle, value + position)
          }
          break
        case 40:
          position = step[0]
          if ( position === false ) {
            position = 1
          }
          if ( position !== null ) {
            setSliderHandle(handle, value - position)
          }
          break
      }
    })
  })


  // Skipping steps
  // Initialize a snapping slider
  var skipSlider = document.getElementById('skipstep')
  noUiSlider.create(skipSlider, {
    range: {
      'min': 0,
      '10%': 10,
      '20%': 20,
      '30%': 30,
      // Nope, 40 is no fun.
      '50%': 50,
      '60%': 60,
      '70%': 70,
      // I never liked 80.
      '90%': 90,
      'max': 100
    },
    snap: true,
    start: [20, 90]
  })
  // Read the slider values
  var skipValues = [
    document.getElementById('skip-value-lower'),
    document.getElementById('skip-value-upper')
  ]
  skipSlider.noUiSlider.on('update', function (values, handle) {
    skipValues[handle].innerHTML = values[handle]
  })


  // Huge numbers
  // Setup
  var bigValueSlider = document.getElementById('slider-huge')
  var bigValueSpan = document.getElementById('huge-value')
  noUiSlider.create(bigValueSlider, {
    start: 4,
    step: 1,
    format: wNumb({
      decimals: 0
    }),
    range: {
      min: 0,
      max: 13
    }
  })
  // Note how these are 'string' values, not numbers.
  var range = ['0', '2097152', '4194304', '8388608', '16777216', '33554432', '67108864', '134217728', '268435456', '536870912', '1073741824', '2147483648', '4294967296', '8589934592']
  bigValueSlider.noUiSlider.on('update', function (values, handle) {
    bigValueSpan.innerHTML = range[values[handle]]
  })


  // Adding keyboard support
  // Initializing the slider
  var slider = document.getElementById('keyboard')
  noUiSlider.create(slider, {
    start: 10,
    step: 10,
    range: {
      'min': 0,
      'max': 100
    }
  })
  // Listen to keypress on the handle
  var handle = slider.querySelector('.noUi-handle')
  handle.setAttribute('tabindex', 0)
  handle.addEventListener('click', function () {
    this.focus()
  })
  handle.addEventListener('keydown', function (e) {
    var value = Number(slider.noUiSlider.get())
    switch (e.which) {
      case 37: slider.noUiSlider.set(value - 10)
        break
      case 39: slider.noUiSlider.set(value + 10)
        break
    }
  })


  // Working with dates
  // Create a new date from a string, return as a timestamp.
  var timestamp = function (str) {
    return new Date(str).getTime()
  }
  // Setup
  var dateSlider = document.getElementById('slider-date')
  noUiSlider.create(dateSlider, {
    // Create two timestamps to define a range.
    range: {
      min: timestamp('2010'),
      max: timestamp('2016')
    },
    // Steps of one week
    step: (7 * 24 * 60 * 60 * 1000),
    // Two more timestamps indicate the handle starting positions.
    start: [timestamp('2011'), timestamp('2015')],
    // No decimals
    format: wNumb({
      decimals: 0
    })
  })
  // Helper functions and formatting
  // Create a list of day and monthnames.
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  // Append a suffix to dates.
  // Example: 23 => 23rd, 1 => 1st.
  var nth = function (d) {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1:  return 'st'
      case 2:  return 'nd'
      case 3:  return 'rd'
      default: return 'th'
    }
  }
  // Create a string representation of the date.
  var formatDate = function (date) {
    return weekdays[date.getDay()] + ', ' + date.getDate() + nth(date.getDate()) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
  }
  // Slider control
  var dateValues = [
    document.getElementById('event-start'),
    document.getElementById('event-end')
  ]
  dateSlider.noUiSlider.on('update', function (values, handle) {
    dateValues[handle].innerHTML = formatDate(new Date(+values[handle]))
  })


  // Soft limits
  // Setting up the slider
  var softSlider = document.getElementById('slider-soft')
  noUiSlider.create(softSlider, {
    start: 50,
    range: {
      min: 0,
      max: 100
    },
    pips: {
      mode: 'values',
      values: [20, 80],
      density: 4
    }
  })
  // Resetting using the change event
  softSlider.noUiSlider.on('change', function (values, handle) {
    if (values[handle] < 20) {
      softSlider.noUiSlider.set(20)
    } else if (values[handle] > 80) {
      softSlider.noUiSlider.set(80)
    }
  })
})