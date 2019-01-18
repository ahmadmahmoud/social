$(document).ready(function () {
  var chartColors = {
    red: vision.brandColor('danger'),
    orange: vision.brandColor('warning'),
    yellow: 'rgb(255, 205, 86)',
    green: vision.brandColor('success'),
    blue: vision.brandColor('info'),
    purple: vision.brandColor('primary'),
    gray: vision.brandColor('gray')
  }


  // Graph Donut
  var morrisjsDonut = Morris.Donut({
    element: 'morrisjs-donut',
    data: [
      {value: 70, label: 'foo'},
      {value: 15, label: 'bar'},
      {value: 10, label: 'baz'},
      {value: 5, label: 'A really really long label'}
    ],
    colors: [
      chartColors.green
    ],
    formatter: function (x) { return x + '%'},
    resize: true
  }).on('click', function(i, row){
    toastr.info(i, row)
  })


  // Graph Donut Formatter
  var morrisjsDonutFormatter = Morris.Donut({
    element: 'morrisjs-donut-formatter',
    data: [
      {value: 70, label: 'foo', formatted: 'at least 70%' },
      {value: 15, label: 'bar', formatted: 'approx. 15%' },
      {value: 10, label: 'baz', formatted: 'approx. 10%' },
      {value: 5, label: 'A really really long label', formatted: 'at most 5%' }
    ],
    colors: [
      chartColors.purple
    ],
    formatter: function (x, data) { return data.formatted },
    resize: true
  })


  // Graph Donut Colors
  var morrisjsDonutColors = Morris.Donut({
    element: 'morrisjs-donut-colors',
    data: [
      {value: 50, label: 'foo'},
      {value: 25, label: 'bar'},
      {value: 15, label: 'baz'},
      {value: 10, label: 'A really really long label'}
    ],
    backgroundColor: '#fff',
    labelColor: vision.brandColor('danger'),
    colors: [
      chartColors.blue,
      chartColors.green,
      chartColors.purple,
      chartColors.yellow
    ],
    formatter: function (x) { return x + '%' },
    resize: true
  })


  // redraw charts when drawer toggle show/hide and compact
  $(visionDrawer.selector).on('drawer:open drawer:close drawer:compact', function () {
    $(this).one(vision.whichTransitionEvent(), function () {
      morrisjsDonut.redraw()
      morrisjsDonutFormatter.redraw()
      morrisjsDonutColors.redraw()
    })
  })
})