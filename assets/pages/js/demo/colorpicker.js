$(document).ready(function () {
  // Simple input field
  $('#colorpicker1').colorpicker()

  // As a component
  $('#colorpicker2').colorpicker()

  // With custom options
  $('#colorpicker3').colorpicker({
    color: '#4D9DE0',
    format: 'rgb'
  })

  // Working with events
  $('#colorpicker4').colorpicker()
    .on('changeColor', function (e) {
      $(this).closest('.panel').css('background-color', e.color.toString('rgba'))
    })

  // Transparent color support
  $('#colorpicker5').colorpicker({
    color: 'transparent',
    format: 'hex'
  })

  // Horizontal mode
  $('#colorpicker6').colorpicker({
    color: '#C5906C',
    horizontal: true
  })

  // Inline mode
  $('#colorpicker7').colorpicker({
    color: '#C56C6C',
    container: true,
    inline: true
  })

  // Aliased color palette
  $('#colorpicker8').colorpicker({
    colorSelectors: {
      'black': '#000000',
      'white': '#ffffff',
      'dark': '#303030',
      'default': '#969696',
      'primary': '#9474a9',
      'success': '#04C4A5',
      'info': '#4D9DE0',
      'warning': '#C5906C',
      'danger': '#C56C6C'
    }
  })

  // Customized widget size
  $('#colorpicker9').colorpicker({
    customClass: 'colorpicker-2x',
    sliders: {
      saturation: {
        maxLeft: 200,
        maxTop: 200
      },
      hue: {
        maxTop: 200
      },
      alpha: {
        maxTop: 200
      }
    }
  })

  // Disabled / enabled status
  $('#cp-disable-button').click(function (e) {
    e.preventDefault()
    $('#colorpicker10').colorpicker('disable')
  })
  $('#cp-enable-button').click(function (e) {
    e.preventDefault()
    $('#colorpicker10').colorpicker('enable')
  })
  $('#colorpicker10').colorpicker()

  // Inside a modal
  $('#colorpicker11').colorpicker()
})