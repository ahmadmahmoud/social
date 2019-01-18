$(document).ready(function () {

  // Pro tips: it better to use layout fixed
  vision.handleLayoutFixed(true)

  // reference details layout
  $('body').on('click', '[data-reference-content="open"]', function () {
    $('.reference-details').addClass('has-open-content')
    $('.reference-list, .reference-content').removeClass('animated fadeIn fadeOut')
    if (vision.isToggleScreenDown()) {
      $('.reference-list').addClass('animated fadeOut')
      $('.reference-content').addClass('animated fadeIn')
    }
  })
  $('body').on('click', '[data-reference-content="close"]', function () {
    $('.reference-details').removeClass('has-open-content')
    $('.reference-list, .reference-content').removeClass('animated fadeIn fadeOut')
    if (vision.isToggleScreenDown()) {
      $('.reference-list').addClass('animated fadeIn')
      $('.reference-content').addClass('animated fadeOut')
    }
  })
  $(window).on('resize', function () {
    if (vision.isToggleScreenUp()) {
      $('.reference-list, .reference-content').removeClass('animated fadeIn fadeOut')
    }
  })

  // do action to load the details content dinamically below
  $('#reference-list .list-group-item').on('click', function (e) {
    e.preventDefault()
    var id = $(this).data('id')

    // your action here
    // show loading while retrieving data
    var loading = visionComponents.loading('#reference-content .reference-inner', {
      type: 'block',
      top: '20%',
      scale: .7
    })
    $('#dummy-content').hide()
    setTimeout(function () {
      // stop loading
      loading.remove()
      // update content
      $('#reference-content')
        .find('.page-header')
        .html('Details item #' + id)
      $('#dummy-content').show()
    }, 1000)
  })
})