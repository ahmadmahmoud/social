$(document).ready(function () {
  $('[data-mask="date"]').mask('00/00/0000')
  $('[data-mask="time"]').mask('00:00:00')
  $('[data-mask="date_time"]').mask('00/00/0000 00:00:00')
  $('[data-mask="cep"]').mask('00000-000')
  $('[data-mask="phone"]').mask('0000-0000')
  $('[data-mask="phone_with_ddd"]').mask('(00) 0000-0000')
  $('[data-mask="phone_us"]').mask('(000) 000-0000')
  $('[data-mask="mixed"]').mask('AAA 000-S0S')
  $('[data-mask="ip_address"]').mask('099.099.099.099')
  $('[data-mask="percent"]').mask('##0,00%', { reverse: true })
  $('[data-mask="clear-if-not-match"]').mask('00/00/0000', { clearIfNotMatch: true })
  $('[data-mask="placeholder"]').mask('00/00/0000', { placeholder: '__/__/____' })
  $('[data-mask="fallback"]').mask('00r00r0000', {
    translation: {
      'r': {
        pattern: /[\/]/,
        fallback: '/'
      },
      placeholder: '__/__/____'
    }
  })

  $('[data-mask="selectonfocus"]').mask('00/00/0000', { selectOnFocus: true })

  $('[data-mask="cep_with_callback"]').mask('00000-000', {
    onComplete: function (cep) {
      console.log('Mask is done!:', cep)
    },
    onKeyPress: function (cep, event, currentField, options) {
      console.log('An key was pressed!:', cep, ' event: ', event, 'currentField: ', currentField.attr('class'), ' options: ', options)
    },
    onInvalid: function (val, e, field, invalid, options) {
      var error = invalid[0]
      console.log('Digit: ', error.v, ' is invalid for the position: ', error.p, '. We expect something like: ', error.e)
    }
  })

  $('[data-mask="crazy_cep"]').mask('00000-000', {
    onKeyPress: function (cep, e, field, options) {
      var masks = ['00000-000', '0-00-00-00']
      mask = (cep.length > 7) ? masks[1] : masks[0]
      $('[data-mask="crazy_cep"]').mask(mask, options)
    }
  })

  $('[data-mask="cnpj"]').mask('00.000.000/0000-00', { reverse: true })
  $('[data-mask="cpf"]').mask('000.000.000-00', { reverse: true })
  $('[data-mask="money"]').mask('000.000.000.000.000,00', { reverse: true })

  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'
  },
  spOptions = {
    onKeyPress: function (val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options)
    }
  }

  $('[data-mask="sp_celphones"]').mask(SPMaskBehavior, spOptions)

  $('#bt-mask-it').click(function () {
    var $this = $(this)
    $('#mask-on-div').mask('000.000.000-00')
    $('#mask-on-div')
      .fadeOut(500)
      .fadeIn(500, function () {
        $this.hide()
      })
  })
})
