$(function () {
  $('#confirm-recovery').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Reset password',
      type: 'input',
      allowOutsideClick: true,
      closeOnConfirm: false,
      confirmButtonText: 'Reset',
      animation: 'slide-from-top',
      inputPlaceholder: 'Enter your email address',
    }, function (inputValue) {
      if (inputValue === false) return false
      if (inputValue === '') {
        swal.showInputError('Please enter your email!')
        return false
      }
      swal('Success!', 'We send recovery email to ' + inputValue, 'success')
    })
  })
})