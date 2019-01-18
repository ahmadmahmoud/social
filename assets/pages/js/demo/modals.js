$(document).ready(function () {
  // native bootstrap modal
  $('.modal').on('shown.bs.modal', function () {
    $(this).find('input.autofocus').focus()
  })

  toastr.options = {
    'progressBar': true,
    'positionClass': 'toast-bottom-right',
    'preventDuplicates': false,
    'showDuration': '300',
    'hideDuration': '300',
    'timeOut': '4000',
    'showMethod': 'slideDown',
    'hideMethod': 'fadeOut'
  }

  // Bootbox
  // Alerts
  $('#alert-default').on('click', function () {
    bootbox.alert('This is the default alert!')
    toastr.success('Default alert')
  })
  $('#alert-callback').on('click', function () {
    bootbox.alert('This is an alert with a callback!', function () {
      toastr.success('This was logged in the callback!')
    })
  })
  $('#alert-options').on('click', function () {
    bootbox.alert({
      message: 'This is an alert with a callback!',
      callback: function () {
        toastr.success('This was logged in the callback!')
      }
    })
  })
  $('#alert-small').on('click', function () {
    bootbox.alert({
      message: 'This is the small alert!',
      size: 'small'
    })
    toastr.success('Small alert shown')
  })
  $('#alert-large').on('click', function () {
    bootbox.alert({
      message: 'This is the large alert!',
      size: 'large'
    })
    toastr.success('Large alert shown')
  })
  $('#alert-custom-class').on('click', function () {
    bootbox.alert({
      message: 'This is an alert with an additional class!',
      className: 'rubberBand animated'
    })
    toastr.success('Custom class alert shown')
  })
  $('#alert-overlay-click').on('click', function () {
    bootbox.alert({
      message: 'This alert can be dismissed by clicking on the background!',
      backdrop: true
    })
    toastr.success('Dismissable background alert shown')
  })

  // Confirms
  $('#confirm-default').on('click', function () {
    bootbox.confirm('This is the default confirm.', function (result) {
      toastr.success('This was logged in the callback: ' + result)
    })
  })
  $('#confirm-options').on('click', function () {
    bootbox.confirm({
      message: 'This is a confirm with custom button text and color! Do you like it?',
      buttons: {
        confirm: {
          label: 'Yes',
          className: 'btn-success'
        },
        cancel: {
          label: 'No',
          className: 'btn-danger'
        }
      },
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#confirm-button-text').on('click', function () {
    bootbox.confirm({
      title: 'Destroy planet?',
      message: 'Do you want to activate the Deathstar now? This cannot be undone.',
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Confirm'
        }
      },
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })

  // Prompt
  $('#prompt-default').on('click', function () {
    bootbox.prompt('This is the default prompt!', function (result) {
      toastr.success('This was logged in the callback: ' + result)
    })
  })
  $('#prompt-checkbox').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with a set of checkbox inputs!',
      inputType: 'checkbox',
      inputOptions: [{
        text: 'Choice One',
        value: '1',
      }, {
        text: 'Choice Two',
        value: '2',
      }, {
        text: 'Choice Three',
        value: '3',
      }],
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-date').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with a date input!',
      inputType: 'date',
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-email').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with an email input!',
      inputType: 'email',
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-number').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with a number input!',
      inputType: 'number',
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-password').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with a password input!',
      inputType: 'password',
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-select').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with select!',
      inputType: 'select',
      inputOptions: [{
        text: 'Choose one...',
        value: '',
      }, {
        text: 'Choice One',
        value: '1',
      }, {
        text: 'Choice Two',
        value: '2',
      }, {
        text: 'Choice Three',
        value: '3',
      }],
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-textarea').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with a textarea!',
      inputType: 'textarea',
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })
  $('#prompt-time').on('click', function () {
    bootbox.prompt({
      title: 'This is a prompt with a time input!',
      inputType: 'time',
      callback: function (result) {
        toastr.success('This was logged in the callback: ' + result)
      }
    })
  })

  // Custom dialogs
  $('#custom-dialog-as-overlay').on('click', function () {
    var timeout = 3000 // 3 seconds
    var dialog = bootbox.dialog({
      message: '<p class="text-center">Please wait while we do something...</p>',
      closeButton: false
    })

    setTimeout(function () {
      dialog.modal('hide')
    }, timeout)
  })
  $('#custom-dialog-init').on('click', function () {
    var dialog = bootbox.dialog({
      title: 'A custom dialog with init',
      message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
    })

    dialog.init(function () {
      setTimeout(function () {
        dialog.find('.bootbox-body').html('I was loaded after the dialog was shown!')
      }, 3000)
    })
  })
})
