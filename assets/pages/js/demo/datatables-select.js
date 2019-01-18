$(document).ready(function () {
  var table = $('#table').DataTable({
    select: {
      style: 'os',
      className: 'state-selected'
    },
    ajax: vision.getAssetsPath() + 'pages/data/datatables2.json'
  })

  // toggle columns
  $('a.toggle-vis').on( 'click', function (e) {
    e.preventDefault()
    // Get the column API object
    var column = table.column($(this).attr('data-column'))
    // Toggle the visibility
    column.visible(!column.visible())
  })

  // select row
  table.on('select deselect', function () {
    var disDeleteBtn = table.rows({selected: true}).count() < 1
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
      table.rows({selected: true})
        .remove()
        .draw(true)
      $('#delete-row-btn').prop('disabled', true)
      toastr.success('The seleted row(s) has been deleted!')
    })
  })
})