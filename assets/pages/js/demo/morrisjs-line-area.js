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


  // Graph Days
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
  var morrisjsDays = Morris.Line({
    element: 'morrisjs-days',
    data: day_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Months
  var month_data = [
    {'period': '2012-10', 'licensed': 3407, 'sorned': 660},
    {'period': '2011-08', 'licensed': 3351, 'sorned': 629},
    {'period': '2011-03', 'licensed': 3269, 'sorned': 618},
    {'period': '2010-08', 'licensed': 3246, 'sorned': 661},
    {'period': '2010-05', 'licensed': 3257, 'sorned': 667},
    {'period': '2010-03', 'licensed': 3248, 'sorned': 627},
    {'period': '2010-01', 'licensed': 3171, 'sorned': 660},
    {'period': '2009-12', 'licensed': 3171, 'sorned': 676},
    {'period': '2009-10', 'licensed': 3201, 'sorned': 656},
    {'period': '2009-09', 'licensed': 3215, 'sorned': 622}
  ]
  var morrisjsMonths = Morris.Line({
    element: 'morrisjs-months',
    data: month_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    smooth: false,
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Years
  var year_data = [
    {'period': '2012', 'licensed': 3407, 'sorned': 660},
    {'period': '2011', 'licensed': 3351, 'sorned': 629},
    {'period': '2010', 'licensed': 3269, 'sorned': 618},
    {'period': '2009', 'licensed': 3246, 'sorned': 661},
    {'period': '2008', 'licensed': 3257, 'sorned': 667},
    {'period': '2007', 'licensed': 3248, 'sorned': 627},
    {'period': '2006', 'licensed': 3171, 'sorned': 660},
    {'period': '2005', 'licensed': 3171, 'sorned': 676},
    {'period': '2004', 'licensed': 3201, 'sorned': 656},
    {'period': '2003', 'licensed': 3215, 'sorned': 622}
  ]
  var morrisjsYears = Morris.Line({
    element: 'morrisjs-years',
    data: year_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })



  // Graph Weeks
  var week_data = [
    {'period': '2011 W27', 'licensed': 3407, 'sorned': 660},
    {'period': '2011 W26', 'licensed': 3351, 'sorned': 629},
    {'period': '2011 W25', 'licensed': 3269, 'sorned': 618},
    {'period': '2011 W24', 'licensed': 3246, 'sorned': 661},
    {'period': '2011 W23', 'licensed': 3257, 'sorned': 667},
    {'period': '2011 W22', 'licensed': 3248, 'sorned': 627},
    {'period': '2011 W21', 'licensed': 3171, 'sorned': 660},
    {'period': '2011 W20', 'licensed': 3171, 'sorned': 676},
    {'period': '2011 W19', 'licensed': 3201, 'sorned': 656},
    {'period': '2011 W18', 'licensed': 3215, 'sorned': 622},
    {'period': '2011 W17', 'licensed': 3148, 'sorned': 632},
    {'period': '2011 W16', 'licensed': 3155, 'sorned': 681},
    {'period': '2011 W15', 'licensed': 3190, 'sorned': 667},
    {'period': '2011 W14', 'licensed': 3226, 'sorned': 620},
    {'period': '2011 W13', 'licensed': 3245, 'sorned': null},
    {'period': '2011 W12', 'licensed': 3289, 'sorned': null},
    {'period': '2011 W11', 'licensed': 3263, 'sorned': null},
    {'period': '2011 W10', 'licensed': 3189, 'sorned': null},
    {'period': '2011 W09', 'licensed': 3079, 'sorned': null},
    {'period': '2011 W08', 'licensed': 3085, 'sorned': null},
    {'period': '2011 W07', 'licensed': 3055, 'sorned': null},
    {'period': '2011 W06', 'licensed': 3063, 'sorned': null},
    {'period': '2011 W05', 'licensed': 2943, 'sorned': null},
    {'period': '2011 W04', 'licensed': 2806, 'sorned': null},
    {'period': '2011 W03', 'licensed': 2674, 'sorned': null},
    {'period': '2011 W02', 'licensed': 1702, 'sorned': null},
    {'period': '2011 W01', 'licensed': 1732, 'sorned': null}
  ]
  var morrisjsWeeks = Morris.Line({
    element: 'morrisjs-weeks',
    data: week_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Quarters
  var quarter_data = [
    {'period': '2011 Q3', 'licensed': 3407, 'sorned': 660},
    {'period': '2011 Q2', 'licensed': 3351, 'sorned': 629},
    {'period': '2011 Q1', 'licensed': 3269, 'sorned': 618},
    {'period': '2010 Q4', 'licensed': 3246, 'sorned': 661},
    {'period': '2010 Q3', 'licensed': 3257, 'sorned': 667},
    {'period': '2010 Q2', 'licensed': 3248, 'sorned': 627},
    {'period': '2010 Q1', 'licensed': 3171, 'sorned': 660},
    {'period': '2009 Q4', 'licensed': 3171, 'sorned': 676},
    {'period': '2009 Q3', 'licensed': 3201, 'sorned': 656},
    {'period': '2009 Q2', 'licensed': 3215, 'sorned': 622},
    {'period': '2009 Q1', 'licensed': 3148, 'sorned': 632},
    {'period': '2008 Q4', 'licensed': 3155, 'sorned': 681},
    {'period': '2008 Q3', 'licensed': 3190, 'sorned': 667},
    {'period': '2007 Q4', 'licensed': 3226, 'sorned': 620},
    {'period': '2006 Q4', 'licensed': 3245, 'sorned': null},
    {'period': '2005 Q4', 'licensed': 3289, 'sorned': null},
    {'period': '2004 Q4', 'licensed': 3263, 'sorned': null},
    {'period': '2003 Q4', 'licensed': 3189, 'sorned': null},
    {'period': '2002 Q4', 'licensed': 3079, 'sorned': null},
    {'period': '2001 Q4', 'licensed': 3085, 'sorned': null},
    {'period': '2000 Q4', 'licensed': 3055, 'sorned': null},
    {'period': '1999 Q4', 'licensed': 3063, 'sorned': null},
    {'period': '1998 Q4', 'licensed': 2943, 'sorned': null},
    {'period': '1997 Q4', 'licensed': 2806, 'sorned': null},
    {'period': '1996 Q4', 'licensed': 2674, 'sorned': null},
    {'period': '1995 Q4', 'licensed': 1702, 'sorned': null},
    {'period': '1994 Q4', 'licensed': 1732, 'sorned': null}
  ]
  var morrisjsQuarters = Morris.Line({
    element: 'morrisjs-quarters',
    data: quarter_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Timestamp
  var timestamp_data = [
    {'period': 1349046000000, 'licensed': 3407, 'sorned': 660},
    {'period': 1313103600000, 'licensed': 3351, 'sorned': 629},
    {'period': 1299110400000, 'licensed': 3269, 'sorned': 618},
    {'period': 1281222000000, 'licensed': 3246, 'sorned': 661},
    {'period': 1273446000000, 'licensed': 3257, 'sorned': 667},
    {'period': 1268524800000, 'licensed': 3248, 'sorned': 627},
    {'period': 1263081600000, 'licensed': 3171, 'sorned': 660},
    {'period': 1260403200000, 'licensed': 3171, 'sorned': 676},
    {'period': 1254870000000, 'licensed': 3201, 'sorned': 656},
    {'period': 1253833200000, 'licensed': 3215, 'sorned': 622}
  ]
  var morrisjsTimestamp = Morris.Line({
    element: 'morrisjs-timestamp',
    data: timestamp_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    dateFormat: function (x) { return new Date(x).toDateString() },
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Non Date
  var nondate_data = [
    {'elapsed': 'I', 'value': 34},
    {'elapsed': 'II', 'value': 24},
    {'elapsed': 'III', 'value': 3},
    {'elapsed': 'IV', 'value': 12},
    {'elapsed': 'V', 'value': 13},
    {'elapsed': 'VI', 'value': 22},
    {'elapsed': 'VII', 'value': 5},
    {'elapsed': 'VIII', 'value': 26},
    {'elapsed': 'IX', 'value': 12},
    {'elapsed': 'X', 'value': 19}
  ]
  var morrisjsNonDate = Morris.Line({
    element: 'morrisjs-nondate',
    data: nondate_data,
    xkey: 'elapsed',
    ykeys: ['value'],
    labels: ['value'],
    parseTime: false,
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Decimal Data
  var decimal_data = []
  for (var x = 0; x <= 360; x += 10) {
    decimal_data.push({
      x: x,
      y: 1.5 + 1.5 * Math.sin(Math.PI * x / 180).toFixed(4)
    })
  }
  var morrisjsDecimalData = Morris.Line({
    element: 'morrisjs-decimals',
    data: decimal_data,
    xkey: 'x',
    ykeys: ['y'],
    labels: ['sin(x)'],
    parseTime: false,
    hoverCallback: function (index, options, default_content, row) {
      return default_content.replace('sin(x)', '1.5 + 1.5 sin(' + row.x + ')')
    },
    xLabelMargin: 10,
    integerYLabels: true,
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph No Grid
  var nogrid_data = [
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
  var morrisjsNogrid = Morris.Line({
    element: 'morrisjs-nogrid',
    grid: false,
    data: nogrid_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Time Events
  var events_data = [
    {'period': '2011 W27', 'licensed': 3407, 'sorned': 660},
    {'period': '2011 W26', 'licensed': 3351, 'sorned': 629},
    {'period': '2011 W25', 'licensed': 3269, 'sorned': 618},
    {'period': '2011 W24', 'licensed': 3246, 'sorned': 661},
    {'period': '2011 W23', 'licensed': 3257, 'sorned': 667},
    {'period': '2011 W22', 'licensed': 3248, 'sorned': 627},
    {'period': '2011 W21', 'licensed': 3171, 'sorned': 660},
    {'period': '2011 W20', 'licensed': 3171, 'sorned': 676},
    {'period': '2011 W19', 'licensed': 3201, 'sorned': 656},
    {'period': '2011 W18', 'licensed': 3215, 'sorned': 622},
    {'period': '2011 W17', 'licensed': 3148, 'sorned': 632},
    {'period': '2011 W16', 'licensed': 3155, 'sorned': 681},
    {'period': '2011 W15', 'licensed': 3190, 'sorned': 667},
    {'period': '2011 W14', 'licensed': 3226, 'sorned': 620},
    {'period': '2011 W13', 'licensed': 3245, 'sorned': null},
    {'period': '2011 W12', 'licensed': 3289, 'sorned': null},
    {'period': '2011 W11', 'licensed': 3263, 'sorned': null},
    {'period': '2011 W10', 'licensed': 3189, 'sorned': null},
    {'period': '2011 W09', 'licensed': 3079, 'sorned': null},
    {'period': '2011 W08', 'licensed': 3085, 'sorned': null},
    {'period': '2011 W07', 'licensed': 3055, 'sorned': null},
    {'period': '2011 W06', 'licensed': 3063, 'sorned': null},
    {'period': '2011 W05', 'licensed': 2943, 'sorned': null},
    {'period': '2011 W04', 'licensed': 2806, 'sorned': null},
    {'period': '2011 W03', 'licensed': 2674, 'sorned': null},
    {'period': '2011 W02', 'licensed': 1702, 'sorned': null},
    {'period': '2011 W01', 'licensed': 1732, 'sorned': null}
  ]
  var morrisjsEvents = Morris.Line({
    element: 'morrisjs-events',
    data: events_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    events: [
      '2011-04',
      '2011-08'
    ],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Value Goals
  var goals_data = [];
  for (var x = 0; x <= 360; x += 10) {
    goals_data.push({
      x: x,
      y: Math.sin(Math.PI * x / 180).toFixed(4)
    })
  }
  var morrisjsGoals = Morris.Line({
    element: 'morrisjs-goals',
    data: goals_data,
    xkey: 'x',
    ykeys: ['y'],
    labels: ['sin(x)'],
    parseTime: false,
    goals: [-1, 0, 1],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Value Goals
  var neg_data = [
    {'period': '2011-08-12', 'a': 100},
    {'period': '2011-03-03', 'a': 75},
    {'period': '2010-08-08', 'a': 50},
    {'period': '2010-05-10', 'a': 25},
    {'period': '2010-03-14', 'a': 0},
    {'period': '2010-01-10', 'a': -25},
    {'period': '2009-12-10', 'a': -50},
    {'period': '2009-10-07', 'a': -75},
    {'period': '2009-09-25', 'a': -100}
  ]
  var morrisjsNegative = Morris.Line({
    element: 'morrisjs-negative',
    data: neg_data,
    xkey: 'period',
    ykeys: ['a'],
    labels: ['Series A'],
    units: '%',
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph NoNon-continuous Data
  var skip_data = [
    {'period': '2012-10-01', 'licensed': 3407},
    {'period': '2012-09-30', 'sorned': 0},
    {'period': '2012-09-29', 'sorned': 618},
    {'period': '2012-09-20', 'licensed': 3246, 'sorned': 661},
    {'period': '2012-09-19', 'licensed': 3257, 'sorned': null},
    {'period': '2012-09-18', 'licensed': 3248, 'other': 1000},
    {'period': '2012-09-17', 'sorned': 0},
    {'period': '2012-09-16', 'sorned': 0},
    {'period': '2012-09-15', 'licensed': 3201, 'sorned': 656},
    {'period': '2012-09-10', 'licensed': 3215}
  ]
  var morrisjsSkip = Morris.Line({
    element: 'morrisjs-skip',
    data: skip_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned', 'other'],
    labels: ['Licensed', 'SORN', 'Other'],
    /* custom label formatting with `xLabelFormat` */
    xLabelFormat: function(d) { return (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear() },
    /* setting `xLabels` is recommended when using xLabelFormat */
    xLabels: 'day',
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Displaying X Labels Diagonally
  var diagonal_data = [
    {'period': '2012-10-30', 'licensed': 3407, 'sorned': 660},
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
  var morrisjsDiagonal = Morris.Line({
    element: 'morrisjs-diagonal',
    data: diagonal_data,
    xkey: 'period',
    ykeys: ['licensed', 'sorned'],
    labels: ['Licensed', 'SORN'],
    xLabelAngle: 60,
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Realtime
  var nReloads = 0
  function data (offset) {
    var ret = []
    for (var x = 0; x <= 360; x += 10) {
      var v = (offset + x) % 360
      ret.push({
        x: x,
        y: Math.sin(Math.PI * v / 180).toFixed(4),
        z: Math.cos(Math.PI * v / 180).toFixed(4)
      })
    }
    return ret
  }
  var morrisjsRealtime = Morris.Line({
    element: 'morrisjs-realtime',
    data: data(0),
    xkey: 'x',
    ykeys: ['y', 'z'],
    labels: ['sin()', 'cos()'],
    parseTime: false,
    ymin: -1.0,
    ymax: 1.0,
    hideHover: true,
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })
  function update () {
    nReloads++
    morrisjsRealtime.setData(data(5 * nReloads))
    $('#reloadStatus').text(nReloads + ' reloads')
  }
  setInterval(update, 30)


  // Graph Area
  var morrisjsArea = Morris.Area({
    element: 'morrisjs-area',
    data: [
      {x: '2010 Q4', y: 3, z: 7},
      {x: '2011 Q1', y: 3, z: 4},
      {x: '2011 Q2', y: null, z: 1},
      {x: '2011 Q3', y: 2, z: 5},
      {x: '2011 Q4', y: 8, z: 2},
      {x: '2012 Q1', y: 4, z: 4}
    ],
    xkey: 'x',
    ykeys: ['y', 'z'],
    labels: ['Y', 'Z'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  }).on('click', function(i, row){
    toastr.info(i, row)
  })


  // Graph Area as line
  var morrisjsAreaAsLine = Morris.Area({
    element: 'morrisjs-areaasline',
    behaveLikeLine: true,
    data: [
      {x: '2011 Q1', y: 3, z: 3},
      {x: '2011 Q2', y: 2, z: 1},
      {x: '2011 Q3', y: 2, z: 4},
      {x: '2011 Q4', y: 3, z: 3}
    ],
    xkey: 'x',
    ykeys: ['y', 'z'],
    labels: ['Y', 'Z'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // Graph Daylight-savings time
  var morrisjsDst = Morris.Area({
    element: 'morrisjs-dst',
    data: [
      {x: '2013-03-30 22:00:00', y: 3, z: 3},
      {x: '2013-03-31 00:00:00', y: 2, z: 0},
      {x: '2013-03-31 02:00:00', y: 0, z: 2},
      {x: '2013-03-31 04:00:00', y: 4, z: 4}
    ],
    xkey: 'x',
    ykeys: ['y', 'z'],
    labels: ['Y', 'Z'],
    lineColors: [chartColors.purple, chartColors.green],
    resize: true
  })


  // redraw charts when drawer toggle show/hide and compact
  $(visionDrawer.selector).on('drawer:open drawer:close drawer:compact', function () {
    $(this).one(vision.whichTransitionEvent(), function () {
      morrisjsDays.redraw()
      morrisjsMonths.redraw()
      morrisjsYears.redraw()
      morrisjsWeeks.redraw()
      morrisjsQuarters.redraw()
      morrisjsTimestamp.redraw()
      morrisjsNonDate.redraw()
      morrisjsDecimalData.redraw()
      morrisjsDecimalData.redraw()
      morrisjsNogrid.redraw()
      morrisjsEvents.redraw()
      morrisjsGoals.redraw()
      morrisjsNegative.redraw()
      morrisjsSkip.redraw()
      morrisjsDiagonal.redraw()
      morrisjsRealtime.redraw()
      morrisjsArea.redraw()
      morrisjsAreaAsLine.redraw()
      morrisjsDst.redraw()
    })
  })
})