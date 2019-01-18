$(document).ready(function () {
  window.Parsley.addValidator('maxFileSize', {
    validateString: function (_value, maxSize, parsleyInstance) {
      if (!window.FormData) {
        toastr.warning('You are making all developpers in the world cringe. Upgrade your browser!')
        return true
      }
      var files = parsleyInstance.$element[0].files
      return files.length != 1  || files[0].size <= maxSize * 1024
    },
    requirementType: 'integer',
    messages: {
      en: 'This file should not be larger than %s Kb',
      fr: 'Ce fichier est plus grand que %s Kb.'
    }
  })

  // basic example
  $('#parsley-demo')
    .parsley()
    .on('form:submit', function () {
      toastr.info('The form was submited!')
      // Don't submit form for this demo
      return false
    })
})