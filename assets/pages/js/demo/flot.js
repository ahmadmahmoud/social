$(document).ready(function () {
  var chartColors = {
    red: vision.brandColor('danger'),
    orange: vision.brandColor('warning'),
    yellow: 'rgb(255, 205, 86)',
    green: vision.brandColor('success'),
    blue: vision.brandColor('info'),
    purple: vision.brandColor('primary'),
    gray: vision.brandColor('gray'),
    grayLighter: vision.brandColor('grayLighter')
  }


  // Combine Chart
  var getDate = function(year, month, day) {
    return new Date(year, month - 1, day).getTime()
  }
  var wind = [
    [getDate(2012, 1, 1), 11], [getDate(2012, 1, 2), 9], [getDate(2012, 1, 3), 7], [getDate(2012, 1, 4), 13],
    [getDate(2012, 1, 5), 11], [getDate(2012, 1, 6), 11], [getDate(2012, 1, 7), 9], [getDate(2012, 1, 8), 10],
    [getDate(2012, 1, 9), 7], [getDate(2012, 1, 10), 11], [getDate(2012, 1, 11), 7], [getDate(2012, 1, 12), 6],
    [getDate(2012, 1, 13), 4], [getDate(2012, 1, 14), 5], [getDate(2012, 1, 15), 11], [getDate(2012, 1, 16), 8],
    [getDate(2012, 1, 17), 9], [getDate(2012, 1, 18), 16], [getDate(2012, 1, 19), 11], [getDate(2012, 1, 20), 18],
    [getDate(2012, 1, 21), 8], [getDate(2012, 1, 22), 17], [getDate(2012, 1, 23), 11], [getDate(2012, 1, 24), 13],
    [getDate(2012, 1, 25), 11], [getDate(2012, 1, 26), 11], [getDate(2012, 1, 27), 9], [getDate(2012, 1, 28), 8],
    [getDate(2012, 1, 29), 7], [getDate(2012, 1, 30), 8], [getDate(2012, 1, 31), 20]
  ]
  var pressure = [
    [getDate(2012, 1, 1), 320], [getDate(2012, 1, 2), 430], [getDate(2012, 1, 3), 540], [getDate(2012, 1, 4), 560],
    [getDate(2012, 1, 5), 964], [getDate(2012, 1, 6), 1022], [getDate(2012, 1, 7), 436], [getDate(2012, 1, 8), 750],
    [getDate(2012, 1, 9), 648], [getDate(2012, 1, 10), 639], [getDate(2012, 1, 11), 654], [getDate(2012, 1, 12), 300],
    [getDate(2012, 1, 13), 739], [getDate(2012, 1, 14), 748], [getDate(2012, 1, 15), 768], [getDate(2012, 1, 16), 1023],
    [getDate(2012, 1, 17), 869], [getDate(2012, 1, 18), 489], [getDate(2012, 1, 19), 987], [getDate(2012, 1, 20), 980],
    [getDate(2012, 1, 21), 580], [getDate(2012, 1, 22), 387], [getDate(2012, 1, 23), 345], [getDate(2012, 1, 24), 560],
    [getDate(2012, 1, 25), 405], [getDate(2012, 1, 26), 876], [getDate(2012, 1, 27), 543], [getDate(2012, 1, 28), 650],
    [getDate(2012, 1, 29), 600], [getDate(2012, 1, 30), 900], [getDate(2012, 1, 31), 531]
  ]
  var temp = [
    [getDate(2012, 1, 1), 1], [getDate(2012, 1, 2), -2], [getDate(2012, 1, 3), -2], [getDate(2012, 1, 4), 1],
    [getDate(2012, 1, 5), 3], [getDate(2012, 1, 6), 4], [getDate(2012, 1, 7), 5], [getDate(2012, 1, 8), 6],
    [getDate(2012, 1, 9), 7], [getDate(2012, 1, 10), 7], [getDate(2012, 1, 11), 6], [getDate(2012, 1, 12), 7],
    [getDate(2012, 1, 13), 8], [getDate(2012, 1, 14), 8], [getDate(2012, 1, 15), 3], [getDate(2012, 1, 16), 2],
    [getDate(2012, 1, 17), 4], [getDate(2012, 1, 18), -1], [getDate(2012, 1, 19), 5], [getDate(2012, 1, 20), 6],
    [getDate(2012, 1, 21), -2], [getDate(2012, 1, 22), -7], [getDate(2012, 1, 23), -9], [getDate(2012, 1, 24), -8],
    [getDate(2012, 1, 25), -7], [getDate(2012, 1, 26), -6], [getDate(2012, 1, 27), -3], [getDate(2012, 1, 28), 1],
    [getDate(2012, 1, 29), 6], [getDate(2012, 1, 30), 9], [getDate(2012, 1, 31), 8]
  ]
  // dataset
  var dataset_combine = [
    {
      label: 'Sea Level Pressure',
      data: pressure,
      color: chartColors.grayLighter,
      bars: {
        show: true,
        align: 'center',
        barWidth: 24 * 60 * 60 * 600,
        lineWidth:1
      }
    }, {
      label: 'Wind Speed',
      data: wind,
      yaxis: 2,
      color: chartColors.purple,
      points: { fillColor: chartColors.purple, show: true },
      lines: {show:true}
    }, {
      label: 'Temperature',
      data: temp,
      yaxis: 3,
      color: chartColors.green,
      points: { fillColor: chartColors.green, show: true },
      lines: { show: true }
    }
  ]
  // init chart combine
  $('#flot-combine').plot(dataset_combine, {
    xaxis: {
      mode: 'time',
      tickSize: [3, 'day'],
      tickLength: 0,
      axisLabel: 'Date',
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Open Sans, Arial',
      axisLabelColour: chartColors.gray,
      axisLabelPadding: 10
    },
    yaxes: [{
        position: 'left',
        max: 1070,
        axisLabel: 'Sea Level Pressure (hPa)',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Open Sans, Arial',
        axisLabelColour: chartColors.gray,
        axisLabelPadding: 3
      }, {
        position: 'right',
        axisLabel: 'Wind Speed (km/hr)',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Open Sans, Arial',
        axisLabelColour: chartColors.gray,
        axisLabelPadding: 3
      },{
        position: 'right',
        axisLabel: 'Temperature (°C)',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Open Sans, Arial',
        axisLabelColour: chartColors.gray,
        axisLabelPadding: 3
      }
    ],
    legend: {
      noColumns: 1,
      position: 'nw'
    },
    grid: {
      hoverable: true,
      borderWidth: 0,
      color: chartColors.gray
    }
  })


  // Flot Line
  var sin = []
  var cos = []
  for (var i = 0; i < 14; i += 0.5) {
    sin.push([i, Math.sin(i)])
    cos.push([i, Math.cos(i)])
  }
  $('#flot-line').plot([
    { data: sin, label: 'sin(x)'},
    { data: cos, label: 'cos(x)'}
  ],
  {
    series: {
      lines: {
        show: true
      },
      points: {
        show: true
      }
    },
    colors: [chartColors.purple, chartColors.green],
    grid: {
      hoverable: true,
      borderWidth: 0,
      color: chartColors.gray
    },
    legend: {
      position: 'se'
    },
    xaxis: {
      tickLength: 0
    },
    yaxis: {
      min: -1.2,
      max: 1.2,
      tickSize: 1,
      tickColor: '#ecf0f1'
    }
  })


  // Flot Bar
  var data_bar = [['January', 10], ['February', 8], ['March', 4], ['April', 13], ['May', 17], ['June', 9]]

  $('#flot-bar').plot([data_bar], {
    series: {
      bars: {
        show: true,
        barWidth: 0.5,
        align: 'center',
        fillColor: {
          colors: [{ opacity: 0.9 }, { opacity: 0.1 }]
        }
      }
    },
    colors: [chartColors.green],
    grid: {
      hoverable: true,
      borderWidth: 0,
      color: chartColors.gray
    },
    xaxis: {
      mode: 'categories',
      tickLength: 0
    },
    yaxis: {
      tickColor: chartColors.grayLighter
    }
  })


  // Area chart
  var year = function(year) {
    return new Date(year, 1, 1).getTime()
  }
  // raw data
  var america = [
    [year(1800), 700], [year(1850), 2600], [year(1900), 8200], [year(1950), 17162], [year(1955), 18688],
    [year(1960), 20415], [year(1965), 21957], [year(1970), 23194], [year(1975), 24343], [year(1980), 25607],
    [year(1985), 26946], [year(1990), 28355], [year(1995), 29944], [year(2000), 31592], [year(2005), 33216],
    [year(2010), 34412]
  ]
  var uerope = [
    [year(1800), 20300], [year(1850), 27600], [year(1900), 40800], [year(1950), 54740], [year(1955), 57518],
    [year(1960), 60140], [year(1965), 63403], [year(1970), 65586], [year(1975), 67554], [year(1980), 69243],
    [year(1985), 70601], [year(1990), 72158], [year(1995), 72741], [year(2000), 72799], [year(2005), 72472],
    [year(2010), 72708]
  ]
  var asia = [
    [year(1800), 63500], [year(1850), 80900], [year(1900), 94700], [year(1950), 139849], [year(1955), 154195],
    [year(1960), 167434], [year(1965), 189942], [year(1970), 214312], [year(1975), 239751], [year(1980), 263234],
    [year(1985), 288755], [year(1990), 316781], [year(1995), 343005], [year(2000), 367974], [year(2005), 391751],
    [year(2010), 411963]
  ]
  // dataset
  var dataSet_area = [
    { label: 'Asia', data: asia, color: chartColors.purple },
    { label: 'Europe', data: uerope, color: chartColors.green },
    { label: 'North America', data: america, color: chartColors.blue }
  ]
  // init chart area
  $('#flot-area').plot(dataSet_area, {
    series: {
      lines: {
        show: true,
        fill: true
      }
    },
    xaxis: {
      tickLength: 0,
      axisLabel: 'Year',
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelPadding: 10,
      axisLabelFontFamily: 'Open Sans, sans-serif',
      axisLabelColour: chartColors.gray,
      mode: 'time',
      tickSize: [20, 'year'],
      timeformat: '%Y'
    },
    yaxis: {
      axisLabel: 'Population (multiply by 10,000)',
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelPadding: 3,
      axisLabelFontFamily: 'Open Sans, sans-serif',
      axisLabelColour: chartColors.gray,
      tickFormatter: function (v, axis) {
        return v
      }
    },
    legend: {
      noColumns: 3,
      position: 'nw'
    },
    grid: {
      hoverable: true,
      borderWidth: 0,
      color: chartColors.gray
    }
  })


  // HORIZONTAL BAR CHART
  var data_barhor = [
    [1582.3, 0], //Gold/oz
    [28.95, 1],  //Silver/oz
    [1603, 2],   //PLATINUM /oz
    [774, 3],    //PALLADIUM /oz
    [1245, 4],   //Rhodium
    [85, 5],     //Ruthenium
    [1025, 6]    //Iridium
  ]
  var dataSet_barhor = [
    { label: 'Precious Metal Price', data: data_barhor, color: chartColors.green }
  ]
  var ticks_barhor = [
    [0, 'Gold'], [1, 'Silver'], [2, 'Platinum'], [3, 'Palldium'], [4, 'Rhodium'], [5, 'Ruthenium'], [6, 'Iridium']
  ]
  // init chart barhor
  $('#flot-barhor').plot(dataSet_barhor, {
    series: {
      bars: {
        show: true
      }
    },
    bars: {
      align: 'center',
      barWidth: 0.5,
      horizontal: true,
      fillColor: { colors: [{ opacity: 1 }, { opacity: 1}] },
      lineWidth: 1
    },
    xaxis: {
      axisLabel: 'Price (USD/oz)',
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelPadding: 10,
      axisLabelFontFamily: 'Open Sans, sans-serif',
      axisLabelColour: chartColors.gray,
      tickFormatter: function (v, axis) {
        return v
      },
      max: 2000
    },
    yaxis: {
      axisLabel: 'Precious Metals',
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelPadding: 3,
      axisLabelFontFamily: 'Open Sans, sans-serif',
      axisLabelColour: chartColors.gray,
      tickLength: 0,
      ticks: ticks_barhor
    },
    legend: {
      noColumns: 0,
      position: 'ne'
    },
    grid: {
      hoverable: true,
      borderWidth: 0,
      color: chartColors.gray
    }
  })


  // Realtime
  var getRandomData = function () {
    data_realtime = data_realtime.slice(1)
    // Do a random walk
    while (data_realtime.length < totalPoints) {
      var prev = data_realtime.length > 0 ? data_realtime[data_realtime.length - 1] : 50
      var y = prev + Math.random() * 10 - 5

      if (y < 0) {
        y = 0
      } else if (y > 100) {
        y = 100
      }
      data_realtime.push(y)
    }
    // Zip the generated y values with the x values
    var res = []
    for (var i = 0; i < data_realtime.length; ++i) {
      res.push([i, data_realtime[i]])
    }
    return res
  }
  var update = function () {
    flotRealtime.setData([{ data: getRandomData(), color: chartColors.green }])
    // Since the axes don't change, we don't need to call plot.setupGrid()
    flotRealtime.draw()
    setTimeout(update, updateInterval)
  }

  var data_realtime = []
  var totalPoints = 300

  // init chart realtime
  var updateInterval = 30
  var flotRealtime = $.plot('#flot-realtime', [{ data: getRandomData(), color: chartColors.green }], {
    series: {
      lines: {
        show: true,
        fill: true
      },
      shadowSize: 0   // Drawing is faster without shadows
    },
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    },
    grid: {
      borderWidth: 0,
      color: chartColors.gray
    }
  })

  update()



  // Chart Tooltips
  // line and bar
  $('<div id="flot-tooltip" class="flot-tooltip"></div>').appendTo('body')
  $(document).on('plothover', '#flot-line, #flot-bar', function(event, pos, item) {
    if (item) {
      var x = item.datapoint[0].toFixed(2)
      var y = item.datapoint[1].toFixed(2)
      var series = (item.series.label === undefined) ? item.series.data[item.dataIndex][0] : item.series.label + ' of ' + x

      $('#flot-tooltip').html(series + ' = ' + y)
        .css({ top: item.pageY + 5, left: item.pageX + 5 })
        .fadeIn(300)
    } else {
      $('#flot-tooltip').hide()
    }
  })
  // flot area
  $('<div id="flot-tooltip2" class="flot-tooltip"></div>').appendTo('body')
  $(document).on('plothover', '#flot-area', function(event, pos, item) {
    if (item) {
      var x = item.datapoint[0]
      var y = item.datapoint[1]
      var color = item.series.color

      $('#flot-tooltip2').html('<strong>' + item.series.label + '</strong><br>' + new Date(x).getFullYear() +
          ' : <strong>Population : ' + y + '</strong> <br> <em>(multiply by 10,000)</em>')
        .css({ top: item.pageY + 5, left: item.pageX + 5, borderColor: color, color: chartColors.gray, backgroundColor: '#ffffff' })
        .fadeIn(300)
    } else {
      $('#flot-tooltip2').hide()
    }
  })
  // barhor
  $('<div id="flot-tooltip3" class="flot-tooltip"></div>').appendTo('body')
  $(document).on('plothover', '#flot-barhor', function(event, pos, item) {
    if (item) {
      var x = item.datapoint[0]
      var y = item.datapoint[1]
      var color = item.series.color

      $('#flot-tooltip3').html('<strong>' + item.series.label + ': </strong>' + x)
        .css({ top: item.pageY + 9, left: item.pageX - 100, borderColor: color, color: chartColors.gray, backgroundColor: '#ffffff' })
        .fadeIn(300)
    } else {
      $('#flot-tooltip3').hide()
    }
  })
  // combine
  $('<div id="flot-tooltip4" class="flot-tooltip"></div>').appendTo('body')
  $(document).on('plothover', '#flot-combine', function(event, pos, item) {
    if (item) {
      var x = item.datapoint[0]
      var y = item.datapoint[1]
      var color = item.series.color
      var date = 'Jan ' + new Date(x).getDate()
      var unit = ''

      if (item.series.label == 'Sea Level Pressure') {
        unit = 'hPa'
      } else if (item.series.label == 'Wind Speed') {
        unit = 'km/hr'
      } else if (item.series.label == 'Temperature') {
        unit = '°C'
      }

      $('#flot-tooltip4').html('<strong>' + item.series.label + '</strong><br>' + date + ' : <strong>' + y + '</strong> ' + unit)
        .css({ top: item.pageY + 5, left: item.pageX + 5, borderColor: color, color: chartColors.gray, backgroundColor: '#ffffff' })
        .fadeIn(300)
    } else {
      $('#flot-tooltip4').hide()
    }
  })
})