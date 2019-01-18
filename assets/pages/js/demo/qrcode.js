$(document).ready(function() {
  // the QR generator
  var makeQR = function (qr, input) {
    var $input = $(input)
    var $group = $(input).parent()
    var str = $input.val()

    if (!str) {
      $group
        .children('.help-block').remove()
      $group
        .addClass('has-error')
        .append('<p class="help-block">Please input a text.</p>')
      return
    }
    $group
      .removeClass('has-error')
      .children('.help-block').remove()
    qr.makeCode(str)
  }

  // basic QRcode
  var qrBasic = new QRCode('qr-basic', {
    width: 160,
    height: 160
  })
  makeQR(qrBasic, '#qrinput-basic')

  $('#qrinput-basic').on('blur', function() {
      makeQR(qrBasic, '#qrinput-basic')
    }).
    on('keydown', function(e) {
      // on enter
      if (e.keyCode == 13) {
        makeQR(qrBasic, '#qrinput-basic')
      }
    })

  // custom QRcode
  var qrCustom = new QRCode('qr-custom', {
    width: 160,
    height: 160,
    colorDark : vision.brandColor('success'),
    colorLight : '#fff'
  })
  makeQR(qrCustom, '#qrinput-custom')

  $('#qrinput-custom').on('blur', function() {
      makeQR(qrCustom, '#qrinput-custom')
    }).
    on('keydown', function(e) {
      // on enter
      if (e.keyCode == 13) {
        makeQR(qrCustom, '#qrinput-custom')
      }
    })
})
