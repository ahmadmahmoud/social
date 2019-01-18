$(document).ready(function () {
  // Audio
  var audio = plyr.setup('#audio')
  // Video
  var video = plyr.setup('#video')
  // Youtube
  var youtube = plyr.setup('#youtube')
  // Vimeo
  var vimeo = plyr.setup('#vimeo')

  // Loop through each instance
  // controls video
  $(document).on('click', '.controls-video > .btn', function () {
    var fn = $(this).data('plyr')
    video[0][fn]()
  })
  // controls youtube
  .on('click', '.controls-youtube > .btn', function () {
    var fn = $(this).data('plyr')
    youtube[0][fn]()
  })
  // controls vimeo
  .on('click', '.controls-vimeo > .btn', function () {
    var fn = $(this).data('plyr')
    vimeo[0][fn]()
  })
})