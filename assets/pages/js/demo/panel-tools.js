$(document).ready(function () {

  $('.panel').on('loading', function (e, panel, loading) {
    // stop propagation for nested panel
    e.stopPropagation()

    // your actions goes here

    // remove exist msg if any
    $(panel).children('.alert').remove()
    setTimeout(function () {
      var heading = $(panel).children('.panel-heading')
      var msg = $('<div>')
        .addClass('alert alert-success fade in')
        .html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
          + '<i class="alert-icon fa fa-check"></i> The content have been updated.')

      // display msg
      msg.insertAfter(heading)
      // stop loading
      loading.remove()
    }, 3000)
  })
})