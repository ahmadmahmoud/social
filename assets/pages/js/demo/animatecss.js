$(document).ready(function () {
  var testAnim = function (x) {
    $('#animationSandbox')
      .removeClass()
      .addClass(x + ' animated')
      .one(vision.whichAnimationEvent(), function () {
        $(this).removeClass()
      })
  }

  $('.js-triggerAnimation').click(function (e) {
    e.preventDefault()
    var anim = $('.js-animations').val()
    testAnim(anim)
  })

  $('.js-animations').change(function () {
    var anim = $(this).val()
    testAnim(anim)
  })
})