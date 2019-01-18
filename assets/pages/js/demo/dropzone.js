// Disable auto discover for all elements:
Dropzone.autoDiscover = false

$(document).ready(function () {

  var dropzone = new Dropzone('#demo-upload', {
    previewTemplate: document.querySelector('#preview-template').innerHTML,
    parallelUploads: 2,
    thumbnailHeight: 120,
    thumbnailWidth: 120,
    maxFilesize: 3,
    filesizeBase: 1000,
    thumbnail: function (file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove('dz-file-preview')
        var images = file.previewElement.querySelectorAll('[data-dz-thumbnail]')
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i];
          thumbnailElement.alt = file.name;
          thumbnailElement.src = dataUrl;
        }
        setTimeout(function () { file.previewElement.classList.add('dz-image-preview') }, 1)
      }
    }
  })


  // Now fake the file upload
  var minSteps = 6
  var maxSteps = 60
  var timeBetweenSteps = 100
  var bytesPerStep = 100000

  dropzone.uploadFiles = function (files) {
    var self = this

    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)))

      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1)
        setTimeout(function (file, totalSteps, step) {
          return function () {
            file.upload = {
              progress: 100 * (step + 1) / totalSteps,
              total: file.size,
              bytesSent: (step + 1) * file.size / totalSteps
            }

            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent)
            if (file.upload.progress == 100) {
              file.status = Dropzone.SUCCESS
              self.emit('success', file, 'success', null)
              self.emit('complete', file)
              self.processQueue()
            }
          }
        }(file, totalSteps, step), duration)
      }
    }
  }



  // Alternative UX
  // Get the template HTML and remove it from the doument
  var previewNode = document.querySelector('#template')
  previewNode.id = ''
  var previewTemplate = previewNode.parentNode.innerHTML
  previewNode.parentNode.removeChild(previewNode)

  var altDropzone = new Dropzone($('#actions').parent()[0], { // Make the panel body a dropzone
    // url: 'http://www.torrentplease.com/dropzone.php', // Set the url
    url: '/',
    thumbnailWidth: 80,
    thumbnailHeight: 80,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: '#previews', // Define the container to display the previews
    clickable: '.fileinput-button' // Define the element that should be used as click trigger to select files.
  })

  altDropzone.on('addedfile', function(file) {
    // Hookup the start button
    file.previewElement.querySelector('.start').onclick = function() { altDropzone.enqueueFile(file) }
  })

  // Update the total progress bar
  altDropzone.on('totaluploadprogress', function(progress) {
    document.querySelector('#total-progress .progress-bar').style.width = progress + '%'
  })

  altDropzone.on('sending', function(file) {
    // Show the total progress bar when upload starts
    document.querySelector('#total-progress').style.opacity = '1'
    // And disable the start button
    file.previewElement.querySelector('.start').setAttribute('disabled', 'disabled')
  })

  // Hide the total progress bar when nothing's uploading anymore
  altDropzone.on('queuecomplete', function(progress) {
    document.querySelector('#total-progress').style.opacity = '0'
  })

  // Setup the buttons for all transfers
  // The 'add files' button doesn't need to be setup because the config
  // `clickable` has already been specified.
  document.querySelector('#actions .start').onclick = function() {
    altDropzone.enqueueFiles(altDropzone.getFilesWithStatus(Dropzone.ADDED))
  }
  document.querySelector('#actions .cancel').onclick = function() {
    altDropzone.removeAllFiles(true)
  }
})