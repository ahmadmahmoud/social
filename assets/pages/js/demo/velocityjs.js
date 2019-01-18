$(document).ready(function () {
  var $UIPackEffect = $('#UIPackSelEffect')
  var $UIPackStagger = $('#UIPackSelStagger')
  var $UIPackDrag = $('#UIPackSelDrag')
  var $UIPackDummiesContainer = $('#UIPackDummiesContainer')

  for (var sequenceName in $.Velocity.Redirects) {
    if (/\./.test(sequenceName)) {
      $UIPackEffect.append($('<option value="' + sequenceName + '">' + sequenceName + '</option>'))
    }
  }

  $UIPackDummiesContainer.css({
    position: 'relative',
    maxWidth: 320,
    height: $UIPackDummiesContainer.outerHeight()
  })

  $UIPackEffect.add($UIPackStagger).add($UIPackDrag).on('change', function () {
    var $UIPackDummies = $('#UIPackDummiesContainer').children()
    var effect = $UIPackEffect.val()
    var stagger = $UIPackStagger.val()
    var drag = $UIPackDrag.val()

    if (effect !== '') {
      $.Velocity({
        e: $UIPackDummies,
        p: effect,
        o: {
          stagger: stagger,
          drag: drag
        }
      }).then(function (elements) {
        $(elements).each(function () {
          $(this).data('velocity').transformCache = {}
        }).removeAttr('style')
      })
    }
  })
})