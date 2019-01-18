$(document).ready(function () {
  var table = $('#table').DataTable({
    keys: true,
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
})