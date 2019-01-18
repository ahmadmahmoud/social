$(document).ready(function () {
  var chartColors = {
    red: vision.brandColor('danger'),
    orange: vision.brandColor('warning'),
    yellow: 'rgb(255, 205, 86)',
    green: vision.brandColor('success'),
    blue: vision.brandColor('info'),
    purple: vision.brandColor('primary'),
    grayDark: vision.brandColor('grayDark'),
    gray: vision.brandColor('gray'),
    grayLight: vision.brandColor('grayLight'),
    grayLighter: vision.brandColor('grayLighter')
  }


  // stats 1
  $('.stats1').sparkline('html', {
    type: 'bar',
    height: '32',
    barWidth: 8,
    barSpacing: 2,
    barColor: chartColors.purple
  })
  // stats 2
  $('.stats2').sparkline('html', {
    fillColor: false,
    width: '70',
    height: '32',
    lineColor: chartColors.red
  })
  $('.stats2').sparkline([3709,3330,4145,4758,4702,3982,4035], {
    composite: true,
    fillColor: false,
    lineColor: chartColors.yellow
  })
  // stats 3
  $('.stats3').sparkline('html', {
    type: 'line',
    width: '70',
    height: '32',
    lineColor: chartColors.blue,
    fillColor: '#A6CEEF'
  })
  // stats 4
  $('.stats4').sparkline('html', {
    type: 'bar',
    height: '32',
    barWidth: 8,
    barSpacing: 2,
    barColor: chartColors.green
  })

  var sparklineStats = function () {
    $('#stat-sparkline').sparkline([3793,3345,3836,3410,3710,4615,3151,3709,3330,4145,4758,4702,3982,4035,3082,3435,3571,3763,4521,4778,4988,3557,4184,4485,4054,4959,3805,3679,3810,3127], {
      type: 'line',
      width: '100%',
      height: '19',
      lineColor: chartColors.green,
      fillColor: chartColors.green,
      spotColor: false,
      minSpotColor: false,
      maxSpotColor: false
    })
  }
  sparklineStats()
  $(window).resize(vision.debounce(function () {
    sparklineStats()
  }, 300))
})