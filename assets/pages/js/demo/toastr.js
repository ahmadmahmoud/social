$(document).ready(function () {
  var i = -1

  var getMessage = function () {
    var msgs = [
      'My name is Inigo Montoya. You killed my father. Prepare to die!',
      'Are you the six fingered man?',
      'Inconceivable!',
      'I do not think that means what you think it means.',
      'Have fun storming the castle!'
    ]
    i++
    if (i === msgs.length) {
      i = 0
    }

    return msgs[i]
  }
  var ucfirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $('#showtoast').click(function () {
    var shortCutFunction = $("#toastTypeGroup").val()
    var $showDuration = $('#showDuration')
    var $hideDuration = $('#hideDuration')
    var $timeOut = $('#timeOut')
    var $extendedTimeOut = $('#extendedTimeOut')
    var $showEasing = $('#showEasing')
    var $hideEasing = $('#hideEasing')
    var $showMethod = $('#showMethod')
    var $hideMethod = $('#hideMethod')

    toastr.options = {
      closeButton: $('#closeButton').prop('checked'),
      progressBar: $('#progressBar').prop('checked'),
      positionClass: $('#positionGroup').val() || 'toast-top-right'
    }

    if ($showDuration.val().length) {
      toastr.options.showDuration = $showDuration.val()
    }

    if ($hideDuration.val().length) {
      toastr.options.hideDuration = $hideDuration.val()
    }

    if ($timeOut.val().length) {
      toastr.options.timeOut = $timeOut.val()
    }

    if ($extendedTimeOut.val().length) {
      toastr.options.extendedTimeOut = $extendedTimeOut.val()
    }

    if ($showEasing.val().length) {
      toastr.options.showEasing = $showEasing.val()
    }

    if ($hideEasing.val().length) {
      toastr.options.hideEasing = $hideEasing.val()
    }

    if ($showMethod.val().length) {
      toastr.options.showMethod = $showMethod.val()
    }

    if ($hideMethod.val().length) {
      toastr.options.hideMethod = $hideMethod.val()
    }

    var $toast = toastr[shortCutFunction](getMessage(i), ucfirst(shortCutFunction)) // Wire up an event handler to a button in the toast, if it exists
  })

  $('#cleartoasts').click(function () {
    toastr.clear()
  })
})
