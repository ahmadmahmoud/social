$(document).ready(function () {

  // default theme
  $('#try1').on('click', function () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'info',
      showCancelButton: true,
      confirmButtonClass: 'btn-primary',
      confirmButtonText: 'Primary!'
    })
  })
  $('#try2').on('click', function () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'info',
      showCancelButton: true,
      confirmButtonClass: 'btn-info',
      confirmButtonText: 'Info!'
    })
  })
  $('#try3').on('click', function () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'success',
      showCancelButton: true,
      confirmButtonClass: 'btn-success',
      confirmButtonText: 'Success!'
    })
  })
  $('#try4').on('click', function () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-warning',
      confirmButtonText: 'Warning!'
    })
  })
  $('#try5').on('click', function () {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'error',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Danger!'
    })
  })

  // vision theme
  $('#try-vision1').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'info',
      showCancelButton: true,
      confirmButtonClass: 'btn-primary',
      confirmButtonText: 'Primary!'
    })
  })
  $('#try-vision2').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'info',
      showCancelButton: true,
      confirmButtonClass: 'btn-info',
      confirmButtonText: 'Info!'
    })
  })
  $('#try-vision3').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'success',
      showCancelButton: true,
      confirmButtonClass: 'btn-success',
      confirmButtonText: 'Success!'
    })
  })
  $('#try-vision4').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-warning',
      confirmButtonText: 'Warning!'
    })
  })
  $('#try-vision5').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'error',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Danger!'
    })
  })


  $('#message').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Here\'s a message!'
    })
  })

  $('#title-text').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Here\'s a message!',
      text: 'It\'s pretty, isn\'t it?'
    })
  })

  $('#success').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Good job!',
      text: 'You clicked the button!',
      type: 'success'
    })
  })

  $('#warning-confirm').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, function () {
      swal('Deleted!', 'Your imaginary file has been deleted!', 'success')
    })
  })

  $('#warning-cancel').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, function (isConfirm) {
      if (isConfirm) {
        swal({
          customClass: 'vision',
          title: 'Deleted!',
          text: 'Your imaginary file has been deleted!',
          type: 'success'
        })
      } else {
        swal({
          customClass: 'vision',
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          type: 'error'
        })
      }
    })
  })

  $('#custom-icon').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Sweet!',
      text: 'Here\'s a custom image.',
      imageUrl: 'assets/globals/img/drop.png'
    })
  })

  $('#message-html').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'HTML <sup>Title</sup>',
      text: 'A custom <a href="#">html message</a>.',
      html: true
    })
  })

  $('#timer').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000
    })
  })

  $('#input').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'An input!',
      text: 'Write something interesting:',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      animation: 'slide-from-top',
      inputPlaceholder: 'Write something',
    }, function (inputValue) {
      if (inputValue === false) return false
      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return false
      }
      swal('Nice!', 'You wrote: ' + inputValue, 'success')
    })
  })

  $('#ajax').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Ajax request example',
      text: 'Submit to run ajax request',
      type: 'info',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
    }, function () {
      setTimeout(function () {
        swal({
          customClass: 'vision',
          title: 'Ajax request finished!'
        })
      }, 2000)
    })
  })
})
