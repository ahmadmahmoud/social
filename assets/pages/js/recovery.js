$(function () {
  $('#form-recovery').on('submit', function (e) {
    var data= $(this).serializeArray()[0]
    swal('Success!', 'We send recovery email to ' + data.value, 'success')
    $('[name="'+ data.name +'"]').val('')
    return false;
  })
})