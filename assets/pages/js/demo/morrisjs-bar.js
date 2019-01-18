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


  // Graph Bar
  var morrisjsBar = Morris.Bar({
    element: 'morrisjs-bar',
    data: [
      {x: '2011 Q1', y: 3, z: 2, a: 3},
      {x: '2011 Q2', y: 2, z: null, a: 1},
      {x: '2011 Q3', y: 0, z: 2, a: 4},
      {x: '2011 Q4', y: 2, z: 4, a: 3}
    ],
    xkey: 'x',
    ykeys: ['y', 'z', 'a'],
    labels: ['Y', 'Z', 'A'],
    barColors: [chartColors.purple, chartColors.green, chartColors.blue],
    resize: true
  }).on('click', function(i, row){
    toastr.info(i, row)
  })


  // Graph Bar No Axes
  var morrisjsBarNoAxes = Morris.Bar({
    element: 'morrisjs-bar-noaxes',
    axes: false,
    data: [
      {x: '2011 Q1', y: 3, z: 2, a: 3},
      {x: '2011 Q2', y: 2, z: null, a: 1},
      {x: '2011 Q3', y: 0, z: 2, a: 4},
      {x: '2011 Q4', y: 2, z: 4, a: 3}
    ],
    xkey: 'x',
    ykeys: ['y', 'z', 'a'],
    labels: ['Y', 'Z', 'A'],
    barColors: [chartColors.purple, chartColors.green, chartColors.blue],
    resize: true
  })


  // Graph Bar Colors
  var morrisjsBarColors = Morris.Bar({
    element: 'morrisjs-bar-colors',
    data: [
      {x: '2011 Q1', y: 0},
      {x: '2011 Q2', y: 1},
      {x: '2011 Q3', y: 2},
      {x: '2011 Q4', y: 3},
      {x: '2012 Q1', y: 4},
      {x: '2012 Q2', y: 5},
      {x: '2012 Q3', y: 6},
      {x: '2012 Q4', y: 7},
      {x: '2013 Q1', y: 8}
    ],
    xkey: 'x',
    ykeys: ['y'],
    labels: ['Y'],
    barColors: function (row, series, type) {
      if (type === 'bar') {
        var green = Math.ceil(196 * row.y / this.ymax)
        return 'rgb(4,' + green + ',165)'
      }
      else {
        return '#000'
      }
    },
    resize: true
  })


  // Graph Bar Diagonals X-label
  var day_data = [
    {'period': '2012-10-01', 'licensed': 3407, 'sorned': 660},
    {'period': '2012-09-30', 'licensed': 3351, 'sorned': 629},
    {'period': '2012-09-29', 'licensed': 3269, 'sorned': 618},
    {'period': '2012-09-20', 'licensed': 3246, 'sorned': 661},
    {'period': '2012-09-19', 'licensed': 3257, 'sorned': 667},
    {'period': '2012-09-18', 'licensed': 3248, 'sorned': 627},
    {'period': '2012-09-17', 'licensed': 3171, 'sorned': 660},
    {'period': '2012-09-16', 'licensed': 3171, 'sorned': 676},
    {'period': '2012-09-15', 'licensed': 3201, 'sorned': 656},
    {'period': '2012-09-10', 'licensed': 3215, 'sorned': 622}
  ]
  var morrisjsBarDiagonal = Morris.Bar({
    element: 'morrisjs-bar-diagonal',
    data: day_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    xLabelAngle: 60,
    barColors: [chartColors.purple, chartColors.green, chartColors.blue],
    resize: true
  })


  // Graph Bar Stacked
  var morrisjsBarStacked = Morris.Bar({
    element: 'morrisjs-bar-stacked',
    data: [
      {x: '2011 Q1', y: 3, z: 2, a: 3},
      {x: '2011 Q2', y: 2, z: null, a: 1},
      {x: '2011 Q3', y: 0, z: 2, a: 4},
      {x: '2011 Q4', y: 2, z: 4, a: 3}
    ],
    xkey: 'x',
    ykeys: ['y', 'z', 'a'],
    labels: ['Y', 'Z', 'A'],
    stacked: true,
    barColors: [chartColors.purple, chartColors.green, chartColors.blue],
    resize: true
  })


  // redraw charts when drawer toggle show/hide and compact
  $(visionDrawer.selector).on('drawer:open drawer:close drawer:compact', function () {
    $(this).one(vision.whichTransitionEvent(), function () {
      morrisjsBar.redraw()
      morrisjsBarNoAxes.redraw()
      morrisjsBarColors.redraw()
      morrisjsBarDiagonal.redraw()
      morrisjsBarStacked.redraw()
    })
  })
})