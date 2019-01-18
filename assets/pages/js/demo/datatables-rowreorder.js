$(document).ready(function () {
  var table = $('#table').DataTable({
    rowReorder: {
      selector: 'tr'
    },
    initComplete: function () {
      vision.handleHolderHeight()
    }
  })

  // toggle columns
  $('a.toggle-vis').on( 'click', function (e) {
    e.preventDefault()
    // Get the column API object
    var column = table.column($(this).attr('data-column'))
    // Toggle the visibility
    column.visible(!column.visible())
  })
})