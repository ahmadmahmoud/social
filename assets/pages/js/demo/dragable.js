$(document).ready(function () {
  var drake = $('[data-drag-group="listEvents"]').data('dragable')

  drake.on('drag', function (el) {
    $(el).removeClass('state-success state-info')
  }).on('drop', function (el, target) {
    var elParent = $(el).data('parent')
    var target = $(target).attr('id')

    if (elParent !== target) {
      var state = (target === 'right') ? 'info' : 'success'
      $(el).addClass('state-' + state)
    }
  }).on('over', function (el, container) {
    $(container).closest('.panel').addClass('panel-filled-inverse')
  }).on('out', function (el, container) {
    $(container).closest('.panel').removeClass('panel-filled-inverse')
  })
})