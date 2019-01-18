$(document).ready(function () {
  var table = $('#table').DataTable({
    lengthChange: false,
    stateSave: true,
    buttons: [{
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i>',
      titleAttr: 'Copy'
    }, {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i>',
      titleAttr: 'Excel'
    }, {
      extend:    'pdf',
      text:      '<i class="fa fa-file-pdf-o"></i>',
      titleAttr: 'PDF'
    }, {
      extend:    'print',
      text:      '<i class="fa fa-print"></i>',
      titleAttr: 'Print',
      exportOptions: {
        columns: ':visible'
      }
    }, {
      extend:    'colvis',
      text:      '<i class="fa fa-columns"></i>',
      titleAttr: 'Column Visibility'
    }],
    ajax: vision.getAssetsPath() + 'pages/data/datatables.json',
    initComplete: function () {
      table.buttons().container()
        .appendTo('#table_wrapper .float-sm-left')
    }
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