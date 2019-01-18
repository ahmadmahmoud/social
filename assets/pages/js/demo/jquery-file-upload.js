$(document).ready(function() {
  // Change this to the location of your server-side upload handler:
  var url = 'http://stilearning.com/prototype/jquery-file-upload'

  // Basic plus ui
  $('#fileupload').fileupload({
    url: url,
    // Enable image resizing, except for Android and Opera,
    // which actually support image resizing, but fail to
    // send Blob objects via XHR requests:
    disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
    maxFileSize: 999000,
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
  })
})
