$(document).ready(function () {
  var table = $('#table').DataTable({
    autoFill: true,
    ajax: vision.getAssetsPath() + 'pages/data/datatables.json'
  })

  // toggle columns
  $('a.toggle-vis').on( 'click', function (e) {
    e.preventDefault()
    // Get the column API object
    var column = table.column($(this).attr('data-column'))
    // Toggle the visibility
    column.visible(!column.visible())
  })

  // row selection
  $('#table tbody').on( 'click', 'tr', function () {
    $(this).toggleClass('state-selected')

    var disDeleteBtn = $('#table tbody tr.state-selected').length < 1

    $('#delete-row-btn').prop('disabled', disDeleteBtn)
  })
  // row removal
  $('#delete-row-btn').click( function () {
    swal({
      customClass: 'vision',
      title: 'Are you sure?',
      text: 'You will not be able to recover this row(s)!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: true
    }, function () {
      table.rows('.state-selected')
        .remove()
        .draw(false)
      $('#delete-row-btn').prop('disabled', true)
      toastr.success('The seleted row(s) has been deleted!')
    })
  })
})