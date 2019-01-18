$(document).ready(function () {

  // initialize detail view drawer
  var detailsView = new Drawerjs({
    selector: '#table-view-details',
    holder: false,
    nested: true,
    holderBehavior: false,
    width: 400,
    align: 'right',
    pinned: false,
    open: false,
    useCustom: {
      drawer: {
        backgroundColor: '#f8f8f8',
        color: '#303030'
      }
    }
  })

  // handle detail view drawer
  $('[data-table-view="show-details"]').on('click', function (e) {
    e.preventDefault()
    var id = $(this).data('record')
    // show drawer
    detailsView.open()
    // fetch content action goes here...

    // simulation
    $(detailsView.selector).find('h4').html('Record ' + id)
  })
  $('[data-table-view="hide-details"]').on('click', function (e) {
    e.preventDefault()
    // hide drawer
    detailsView.close()
  })
})