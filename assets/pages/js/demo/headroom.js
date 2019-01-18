$(document).ready(function () {
  $(vision.getSelector('header')).headroom({
    offset: 205,
    tolerance: 5,
    classes: {
      pinned: 'slideInDown',
      unpinned: 'slideOutUp'
    },
    // callback when pinned, `this` is headroom object
    onPin: function () {
      vision.handleHeaderFixed(true)
    },
    // callback when unpinned, `this` is headroom object
    onUnpin: function () {
      $(this.elem).one(vision.whichAnimationEvent(), function () {
        vision.handleHeaderFixed(false)
      })
    }
  });
})