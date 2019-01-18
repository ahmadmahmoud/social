// horizontal default
$(document).on('click', '#h-default-basic-start', function () {
  var $pb = $('#h-default-basic .progress-bar')
  $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
  $pb.progressbar()
})
$(document).on('click', '#h-default-basic-reset', function () {
  $('#h-default-basic .progress-bar').attr('data-transitiongoal', 0).progressbar()
})

// horizontal right
$(document).on('click', '#h-right-basic-start', function () {
  var $pb = $('#h-right-basic .progress-bar')
  $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
  $pb.progressbar()
})
$(document).on('click', '#h-right-basic-reset', function () {
  $('#h-right-basic .progress-bar').attr('data-transitiongoal', 0).progressbar()
})

// horizontal filled text
$(document).on('click', '#h-fill-basic-start', function () {
  var $pb = $('#h-fill-basic .progress-bar')
  $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
  $pb.progressbar({display_text: 'fill'})
})
$(document).on('click', '#h-fill-basic-reset', function () {
  $('#h-fill-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'fill'})
})

// horizontal filled text (nonpercentage)
$(document).on('click', '#h-fill-nonpercentage-basic-start', function () {
  var $pb = $('#h-fill-nonpercentage-basic .progress-bar')
  $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
  $pb.progressbar({display_text: 'fill', use_percentage: false})
})
$(document).on('click', '#h-fill-nonpercentage-basic-reset', function () {
  $('#h-fill-nonpercentage-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'fill', use_percentage: false})
})

// horizontal centered text
$(document).on('click', '#h-center-basic-start', function () {
  var $pb = $('#h-center-basic .progress-bar')
  $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
  $pb.progressbar({display_text: 'center'})
})
$(document).on('click', '#h-center-basic-reset', function () {
  $('#h-center-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'center'})
})

// horizontal centered text (nonpercentage)
$(document).on('click', '#h-center-nonpercentage-basic-start', function () {
  var $pb = $('#h-center-nonpercentage-basic .progress-bar')
  $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
  $pb.progressbar({display_text: 'center', use_percentage: false})
})
$(document).on('click', '#h-center-nonpercentage-basic-reset', function () {
  $('#h-center-nonpercentage-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'center', use_percentage: false})
})

// vertical default
$(document).on('click', '#v-default-basic-start', function () {
  $('#v-default-basic .progress-bar').each(function () {
    var $pb = $(this)
    $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
    $pb.progressbar()
  })
})
$(document).on('click', '#v-default-basic-reset', function () {
  $('#v-default-basic .progress-bar').attr('data-transitiongoal', 0).progressbar()
})

// vertical bottom
$(document).on('click', '#v-bottom-basic-start', function () {
  $('#v-bottom-basic .progress-bar').each(function () {
    var $pb = $(this)
    $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
    $pb.progressbar()
  })
})
$(document).on('click', '#v-bottom-basic-reset', function () {
  $('#v-bottom-basic .progress-bar').attr('data-transitiongoal', 0).progressbar()
})

// filled text
$(document).on('click', '#v-fill-basic-start', function () {
  $('#v-fill-basic .progress-bar').each(function () {
    var $pb = $(this)
    $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
    $pb.progressbar({display_text: 'fill'})
  })
})
$(document).on('click', '#v-fill-basic-reset', function () {
  $('#v-fill-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'fill'})
})

// filled text (nonpercentage)
$(document).on('click', '#v-fill-nonpercentage-basic-start', function () {
  $('#v-fill-nonpercentage-basic .progress-bar').each(function () {
    var $pb = $(this)
    $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
    $pb.progressbar({display_text: 'fill', use_percentage: false})
  })
})
$(document).on('click', '#v-fill-nonpercentage-basic-reset', function () {
  $('#v-fill-nonpercentage-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'fill', use_percentage: false})
})

// centered text
$(document).on('click', '#v-center-basic-start', function () {
  $('#v-center-basic .progress-bar').each(function () {
    var $pb = $(this)
    $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
    $pb.progressbar({display_text: 'center'})
  })
})
$(document).on('click', '#v-center-basic-reset', function () {
  $('#v-center-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'center'})
})

// centered text (nonpercentage)
$(document).on('click', '#v-center-nonpercentage-basic-start', function () {
  $('#v-center-nonpercentage-basic .progress-bar').each(function () {
    var $pb = $(this)
    $pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'))
    $pb.progressbar({display_text: 'center', use_percentage: false})
  })
})
$(document).on('click', '#v-center-nonpercentage-basic-reset', function () {
  $('#v-center-nonpercentage-basic .progress-bar').attr('data-transitiongoal', 0).progressbar({display_text: 'center', use_percentage: false})
})
