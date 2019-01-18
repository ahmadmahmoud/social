$(document).ready(function () {
  var chartColors = {
    red: vision.brandColor('danger'),
    orange: vision.brandColor('warning'),
    yellow: 'rgb(255, 205, 86)',
    green: vision.brandColor('success'),
    blue: vision.brandColor('info'),
    purple: vision.brandColor('primary'),
    gray: vision.brandColor('gray'),
    grayLight: vision.brandColor('grayLight'),
    grayLighter: vision.brandColor('grayLighter')
  }


  // easyPieChart
  $('.easyPieChart').each(function () {
    var $this = $(this)
    var barColor = $this.attr('data-barColor')
    var trackColor = $this.attr('data-trackColor')
    var scaleColor = $this.attr('data-scaleColor')
    var lineWidth = $this.attr('data-lineWidth')
    var size = $this.attr('data-size')
    var rotate = $this.attr('data-rotate')

    // default for undefined
    barColor = barColor || chartColors.green
    trackColor = trackColor || chartColors.grayLighter
    scaleColor = scaleColor || chartColors.grayLight
    lineWidth = (lineWidth) ? parseInt(lineWidth) : 3
    size = (size) ? parseInt(size) : 110
    rotate = (rotate) ? parseInt(rotate) : 0

    trackColor = (trackColor == 'false' || trackColor == '') ? false : trackColor
    scaleColor = (scaleColor == 'false' || scaleColor == '') ? false : scaleColor

    // initilize easy pie chart
    $this.easyPieChart({
      barColor: barColor,
      trackColor: trackColor,
      scaleColor: scaleColor,
      lineWidth: lineWidth,
      size: size,
      rotate: rotate,
      onStep: function (from, to, currentValue) {
        $(this.el).find('span').text(currentValue.toFixed(0) + '%')
      }
    })
  })

  // update pie chart
  $('#update-pie-charts').on('click', function (e) {
    $('.easyPieChart').each(function () {
      $(this).data('easyPieChart').update(Math.floor(100*Math.random()))
    })
  })


  // SPARKLINE
  // Line charts taking their values from the tag
  $('.sparkline').sparkline('html', {
    lineColor: chartColors.green,
    fillColor: '#E0F8F4'
  })
  // Bar charts using inline values
  $('.sparkbar').sparkline('html', {
    type: 'bar',
    barColor: chartColors.green,
    stackedBarColor: [chartColors.green, chartColors.purple, chartColors.blue, chartColors.yellow]
  })
  // Composite line charts, the second using values supplied via javascript
  $('#compositeline').sparkline('html', {
    fillColor: false,
    changeRangeMin: 0,
    chartRangeMax: 10,
    lineColor: chartColors.green
  })
  $('#compositeline').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
    composite: true,
    fillColor: false,
    lineColor: chartColors.red,
    changeRangeMin: 0,
    chartRangeMax: 10
  })
  // Line charts with normal range marker
  $('#normalline').sparkline('html', {
    fillColor: false,
    normalRangeMin: -1,
    normalRangeMax: 8,
    lineColor: chartColors.green,
    normalRangeColor: chartColors.grayLighter
  })
  $('#normalExample').sparkline('html', {
    fillColor: false,
    normalRangeMin: 80,
    normalRangeMax: 95,
    normalRangeColor: chartColors.orange
  })
  // Bar + line composite charts
  $('#compositebar').sparkline('html', {
    type: 'bar',
    barColor: chartColors.green
  })
  $('#compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
    composite: true,
    fillColor: false,
    lineColor: chartColors.red
  })
  // Discrete charts
  $('.discrete1').sparkline('html', {
    type: 'discrete',
    lineColor: chartColors.blue,
    xwidth: 18
  })
  $('#discrete2').sparkline('html', {
    type: 'discrete',
    lineColor: chartColors.blue,
    thresholdColor: chartColors.red,
    thresholdValue: 4
  })
  // Customized line chart
  $('#linecustom').sparkline('html', {
    height: '1.5em',
    width: '8em',
    lineColor: chartColors.purple,
    fillColor: '#C0F0E8',
    minSpotColor: false,
    maxSpotColor: false,
    spotColor: chartColors.yellow,
    spotRadius: 3
  })
  // Tri-state charts using inline values
  $('.sparktristate').sparkline('html', {
    type: 'tristate',
    posBarColor: chartColors.green,
    negBarColor: chartColors.red
  })
  $('.sparktristatecols').sparkline('html', {
    type: 'tristate',
    colorMap: {
      '-2': chartColors.red,
      '0': chartColors.purple,
      '1': chartColors.green,
      '2': chartColors.blue
    }
  })
  // Box plots
  $('.sparkboxplot').sparkline('html', {
    type: 'box',
    lineColor: chartColors.purple,
    boxLineColor: chartColors.purple,
    whiskerColor: chartColors.gray,
    outlierLineColor: chartColors.gray,
    outlierFillColor: chartColors.grayLighter,
    medianColor: chartColors.red,
    targetColor: chartColors.yellow
  })
  $('.sparkboxplotraw').sparkline([1, 3, 5, 8, 10, 15, 18], {
    type: 'box',
    raw: true,
    showOutliers: true,
    target: 6,
    lineColor: chartColors.blue,
    boxLineColor: chartColors.blue,
    whiskerColor: chartColors.gray,
    outlierLineColor: chartColors.gray,
    outlierFillColor: chartColors.grayLighter,
    medianColor: chartColors.red,
    targetColor: chartColors.yellow
  })
  // Bullet charts
  $('.sparkbullet').sparkline('html', {
    type: 'bullet',
    targetColor: chartColors.red,
    performanceColor: chartColors.green,
    rangeColors: ['#C0F0E8', '#A1E9DD', '#82E2D2']
  })

  // Pie charts
  $('.sparkpie').sparkline('html', {
    type: 'pie',
    height: '1.0em',
    sliceColors: [chartColors.purple, chartColors.green, chartColors.blue, chartColors.yellow]
  })
  /**
   ** Draw the little mouse speed animated graph
   ** This just attaches a handler to the mousemove event to see
   ** (roughly) how far the mouse has moved
   ** and then updates the display a couple of times a second via
   ** setTimeout()
   **/
  var drawMouseSpeedDemo = function () {
    var mrefreshinterval = 500 // update display every 500ms
    var lastmousex = -1
    var lastmousey = -1
    var lastmousetime
    var mousetravel = 0
    var mpoints = []
    var mpoints_max = 30
    $('html').mousemove(function (e) {
      var mousex = e.pageX
      var mousey = e.pageY
      if (lastmousex > -1) {
        mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey))
      }
      lastmousex = mousex
      lastmousey = mousey
    })
    var mdraw = function () {
        var md = new Date()
        var timenow = md.getTime()
        if (lastmousetime && lastmousetime != timenow) {
          var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000)
          mpoints.push(pps)
          if (mpoints.length > mpoints_max)
            mpoints.splice(0, 1)
          mousetravel = 0
          $('#mousespeed').sparkline(mpoints, {
            width: mpoints.length * 2,
            tooltipSuffix: ' pixels per second',
            lineColor: chartColors.green,
            fillColor: '#E0F8F4'
          })
        }
        lastmousetime = timenow
        setTimeout(mdraw, mrefreshinterval)
      }
      // We could use setInterval instead, but I prefer to do it this way
    setTimeout(mdraw, mrefreshinterval)
  }
  drawMouseSpeedDemo()


  // jQuery Knob
  $('.knob').knob({
    change: function (value) {
      console.log('change : ' + value)
    },
    release: function (value) {
      console.log('release : ' + value)
    },
    cancel: function () {
      console.log('cancel : ', this)
    },
    // format : function (value) {
    //  return value + '%'
    // },
    draw: function () {
      // 'tron' case
      if (this.$.data('skin') == 'tron') {
        this.cursorExt = 0.3
        var a = this.arc(this.cv) // Arc
        var pa // Previous arc
        var r = 1

        this.g.lineWidth = this.lineWidth

        if (this.o.displayPrevious) {
          pa = this.arc(this.v)
          this.g.beginPath()
          this.g.strokeStyle = this.pColor
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d)
          this.g.stroke()
        }

        this.g.beginPath()
        this.g.strokeStyle = r ? this.o.fgColor : this.fgColor
        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d)
        this.g.stroke()

        this.g.lineWidth = 2
        this.g.beginPath()
        this.g.strokeStyle = this.o.fgColor
        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false)
        this.g.stroke()

        return false
      }
    }
  })

  // Example of infinite knob, iPod click wheel
  var v, up = 0
  var down = 0
  var i = 0
  var $idir = $('div.idir')
  var $ival = $('div.ival')
  var incr = function () {
    i++
    $idir.show().html('+').fadeOut()
    $ival.html(i)
  }
  var decr = function () {
    i--
    $idir.show().html('-').fadeOut()
    $ival.html(i)
  }
  $('input.infinite').knob({
    min: 0,
    max: 20,
    stopper: false,
    change: function () {
      if (v > this.cv) {
        if (up) {
          decr()
          up = 0
        } else {
          up = 1
          down = 0
        }
      } else {
        if (v < this.cv) {
          if (down) {
            incr()
            down = 0
          } else {
            down = 1
            up = 0
          }
        }
      }
      v = this.cv
    }
  })
})