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

  var randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100)
  }

  var color = Chart.helpers.color
  var colorNames = Object.keys(chartColors)

  // Chart Legend Poinstyle
  function createNormalConfig (colorName) {
    return {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
          backgroundColor: color(chartColors[colorName]).alpha(0.5).rgbString(),
          borderColor: chartColors[colorName],
          borderWidth: 1,
          pointStyle: 'rectRot',
          pointRadius: 5,
          pointBorderColor: 'rgb(0, 0, 0)'
        }]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            usePointStyle: false
          }
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        },
        title: {
          display: true,
          text: 'Normal Legend'
        }
      }
    }
  }
  // create point style config
  function createPointStyleConfig(colorName) {
    var config = createNormalConfig(colorName)
    config.options.legend.labels.usePointStyle = true
    config.options.title.text = 'Point Style Legend'
    return config
  }
  // settings
  var details = [{
    id: '#canvas-legend-normal',
    config: createNormalConfig('purple')
  }, {
    id: '#canvas-legend-pointstyle',
    config: createPointStyleConfig('green')
  }]
  // init charts legend
  $.each(details, function (i, detail) {
    var ctx = $(detail.id)[0].getContext('2d')
    new Chart(ctx, detail.config)
  })



  // Chart Position
  function createConfig (legendPosition, colorName) {
    return {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
          ],
          backgroundColor: color(chartColors[colorName]).alpha(0.5).rgbString(),
          borderColor: chartColors[colorName],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: legendPosition,
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        },
        title: {
          display: true,
          text: 'Legend Position: ' + legendPosition
        }
      }
    }
  }

  var details = [{
    id: '#canvas-legend-top',
    legendPosition: 'top',
    color: 'red'
  }, {
    id: '#canvas-legend-right',
    legendPosition: 'right',
    color: 'blue'
  }, {
    id: '#canvas-legend-bottom',
    legendPosition: 'bottom',
    color: 'green'
  }, {
    id: '#canvas-legend-left',
    legendPosition: 'left',
    color: 'yellow'
  }]
  $.each(details, function (i, detail) {
    var ctx = $(detail.id)[0].getContext('2d')
    var config = createConfig(detail.legendPosition, detail.color)
    new Chart(ctx, config)
  })



  // Chart Line Custom Tooltip
  Chart.defaults.global.pointHitDetectionRadius = 1
  var lineCustomTooltip = function (tooltip) {
    // Tooltip Element
    var tooltipEl = $('#line-custom-tooltip')
    if (!tooltipEl.length) {
      tooltipEl = $('<div>')
      tooltipEl.attr('id', 'line-custom-tooltip')
      $('body').append(tooltipEl)
    }
    tooltipEl.addClass('chartjs-custom-tooltip')
    tooltipEl.html('<table></table>')
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.css('opacity', 0)
      return
    }
    // Set caret Position
    tooltipEl.removeClass('above below no-transform')
    if (tooltip.yAlign) {
      tooltipEl.addClass(tooltip.yAlign)
    } else {
      tooltipEl.addClass('no-transform')
    }
    // Set Text
    if (tooltip.body) {
      var titleLines = tooltip.title || []
      var bodyLines = tooltip.body.map(function (bodyItem) {
        return bodyItem.lines
      })
      var innerHtml = '<thead>'
      titleLines.forEach(function (title) {
        innerHtml += '<tr><th style="font-weight: 500;">' + title + '</th></tr>'
      })
      innerHtml += '</thead><tbody>'
      bodyLines.forEach(function (body, i) {
        var colors = tooltip.labelColors[i]
        var style = 'background:' + colors.backgroundColor + ';'
        style += ' border-color:' + colors.borderColor + ';'
        style += ' border-width: 2px;'
        var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>'
        innerHtml += '<tr><td>' + span + body + '</td></tr>'
      })
      innerHtml += '</tbody>'
      var tableRoot = tooltipEl.find('table')
      tableRoot.html(innerHtml)
    }
    var position = this._chart.canvas.getBoundingClientRect()
    // Display, position, and set styles for font
    tooltipEl.css({
      opacity: 1,
      left: position.left + tooltip.caretX + 'px',
      top: position.top + tooltip.caretY + 'px',
      fontFamily: tooltip._fontFamily,
      fontSize: tooltip.fontSize,
      fontStyle: tooltip._fontStyle,
      padding: tooltip.yPadding + 'px ' + tooltip.xPadding + 'px'
    })
  }
  // line custom tooltip data
  var lineCustomTooltipData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      borderColor: chartColors.purple,
      pointBackgroundColor: chartColors.purple,
      fill: false,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }, {
      label: 'Dataset 2',
      borderColor: chartColors.green,
      pointBackgroundColor: chartColors.green,
      fill: false,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }]
  }
  // init chart line custom tooltip
  var canvasLineCustomTooltip = $('#canvas-line-custom-tooltip')
  var chartLineCustomTooltip = new Chart(canvasLineCustomTooltip, {
    type: 'line',
    data: lineCustomTooltipData,
    options: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Custom Tooltips'
      },
      tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest',
        custom: lineCustomTooltip
      }
    }
  })



  // Chart Datapoint Custom Tooltips
  var datapointCustomTooltips = function (tooltip) {
    $(this._chart.canvas).css('cursor', 'pointer')
    $('#tooltip-datapoint-0, #tooltip-datapoint-1').css({
      opacity: 0,
      position: 'absolute'
    })
    if (!tooltip || !tooltip.opacity) {
      return
    }
    if (tooltip.dataPoints.length > 0) {
      tooltip.dataPoints.forEach(function (dataPoint) {
        var content = [dataPoint.xLabel, dataPoint.yLabel].join(': ')
        var $tooltip = $('#tooltip-datapoint-' + dataPoint.datasetIndex)
        $tooltip.html(content)
        $tooltip.css({
          opacity: 1,
          top: dataPoint.y + 'px',
          left: dataPoint.x + 'px',
        })
      })
    }
  }
  // chart datapoint data
  var datapointCustomTooltipData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
      borderColor: chartColors.purple,
      pointBackgroundColor: chartColors.purple,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }, {
      label: 'Dataset 2',
      backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
      borderColor: chartColors.green,
      pointBackgroundColor: chartColors.green,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }]
  }
  // init chart datapoint custom tooltip
  var canvasDatapointCustomTooltip = $('#canvas-datapoint-custom-tooltip')
  var chartDatapointCustomTooltip = new Chart(canvasDatapointCustomTooltip, {
    type: 'line',
    data: datapointCustomTooltipData,
    options: {
      title: {
        display: true,
        text: 'Chart.js - Custom Tooltips using Data Points'
      },
      tooltips: {
        enabled: false,
        mode: 'index',
        intersect: false,
        custom: datapointCustomTooltips
      }
    }
  })



  // Chart Tooltip positions
  function createConfigTooltipPositions (position) {
    return {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          borderColor: chartColors.purple,
          backgroundColor: chartColors.purple,
          data: [10, 30, 46, 2, 8, 50, 0],
          fill: false,
        }, {
          label: 'Dataset 2',
          borderColor: chartColors.green,
          backgroundColor: chartColors.green,
          data: [7, 49, 46, 13, 25, 30, 22],
          fill: false,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Tooltip Position: ' + position
        },
        tooltips: {
          position: position,
          mode: 'index',
          intersect: false,
        },
      }
    }
  }
  // init charts tooltip position
  var $container = $('#tooltipPositions')
  var positions = ['average', 'nearest']
  $.each(positions, function (i, position) {
    var $col = $('<div>')
    $col.addClass('col-md-6')

    var $panel = $('<div>')
    $panel.addClass('panel')

    var $panelBody = $('<div>')
    $panelBody.addClass('panel-body')

    var $canvas = $('<canvas>')

    $panelBody.append($canvas)
    $panel.append($panelBody)
    $col.append($panel)
    $container.append($col)

    var ctx = $canvas[0].getContext('2d')
    var config = createConfigTooltipPositions(position)
    new Chart(ctx, config)
  })



  // Chart Tooltip Callback
  var configTooltipCallback = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        borderColor: chartColors.purple,
        backgroundColor: chartColors.purple,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        fill: false,
      }, {
        label: 'Dataset 2',
        borderColor: chartColors.green,
        backgroundColor: chartColors.green,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        fill: false,
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Custom Information in Tooltip'
      },
      tooltips: {
        mode: 'index',
        callbacks: {
          // Use the footer callback to display the sum of the items showing in the tooltip
          footer: function (tooltipItems, data) {
            var sum = 0
            $.each(tooltipItems, function (i, tooltipItem) {
              sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            })
            return 'Sum: ' + sum
          },
        },
        footerFontStyle: 'normal'
      },
      hover: {
        mode: 'index',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          }
        }]
      }
    }
  }
  // init chart tooltip callback
  var canvasTooltipCallback = $('#canvas-tooltip-callback')[0].getContext('2d')
  var tooltipCallback = new Chart(canvasTooltipCallback, configTooltipCallback)



  // Chart Pie Custom Tooltip
  var pieCustomTooltip = function (tooltip) {
    // Tooltip Element
    var tooltipEl = $('#pie-custom-tooltip')
    if (!tooltipEl.length) {
      tooltipEl = $('<div>')
      tooltipEl.attr('id', 'pie-custom-tooltip')
      $('body').append(tooltipEl)
    }
    tooltipEl.addClass('chartjs-custom-tooltip')
    tooltipEl.html('<table></table>')
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.css('opacity', 0)
      return
    }
    // Set caret Position
    tooltipEl.removeClass('above below no-transform')
    if (tooltip.yAlign) {
      tooltipEl.addClass(tooltip.yAlign)
    } else {
      tooltipEl.addClass('no-transform')
    }
    // Set Text
    if (tooltip.body) {
      var titleLines = tooltip.title || []
      var bodyLines = tooltip.body.map(function (bodyItem) {
        return bodyItem.lines
      })
      var innerHtml = '<thead>'
      titleLines.forEach(function (title) {
        innerHtml += '<tr><th style="font-weight: 500;">' + title + '</th></tr>'
      })
      innerHtml += '</thead><tbody>'
      bodyLines.forEach(function (body, i) {
        var colors = tooltip.labelColors[i]
        var style = 'background:' + colors.backgroundColor + ';'
        style += ' border-color:' + colors.borderColor + ';'
        style += ' border-width: 2px;'
        var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>'
        innerHtml += '<tr><td>' + span + body + '</td></tr>'
      })
      innerHtml += '</tbody>'
      var tableRoot = tooltipEl.find('table')
      tableRoot.html(innerHtml)
    }
    var position = this._chart.canvas.getBoundingClientRect()
    // Display, position, and set styles for font
    tooltipEl.css({
      opacity: 1,
      left: position.left + tooltip.caretX + 'px',
      top: position.top + tooltip.caretY + 'px',
      fontFamily: tooltip._fontFamily,
      fontSize: tooltip.fontSize,
      fontStyle: tooltip._fontStyle,
      padding: tooltip.yPadding + 'px ' + tooltip.xPadding + 'px'
    })
  }
  // pie custom tooltip config
  var configPieCustomTooltip = {
    type: 'pie',
    data: {
      datasets: [{
        data: [300, 50, 100, 40, 10],
        backgroundColor: [
          chartColors.red,
          chartColors.purple,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue,
        ],
      }],
      labels: [
        'Red',
        'Purple',
        'Yellow',
        'Green',
        'Blue'
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
        custom: pieCustomTooltip
      }
    }
  }
  // init chart pie custom tooltip
  var canvasPieCustomTooltip = $('#canvas-pie-custom-tooltip')[0].getContext('2d')
  var chartPieCustomTooltip = new Chart(canvasPieCustomTooltip, configPieCustomTooltip)



  // Chart Interaction Modes
  function createConfigInteractionModes (mode, intersect) {
    return {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          borderColor: chartColors.purple,
          backgroundColor: chartColors.purple,
          data: [10, 30, 46, 2, 8, 50, 0],
          fill: false,
        }, {
          label: 'Dataset 2',
          borderColor: chartColors.green,
          backgroundColor: chartColors.green,
          data: [7, 49, 46, 13, 25, 30, 22],
          fill: false,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Mode: ' + mode + ', intersect = ' + intersect
        },
        tooltips: {
          mode: mode,
          intersect: intersect,
        },
        hover: {
          mode: mode,
          intersect: intersect
        },
      }
    }
  }
  // init chart interaction modes
  var $interactionModesContainer = $('#interaction-modes')
  var details = [{
    mode: 'index',
    intersect: true,
  }, {
    mode: 'index',
    intersect: false,
  }, {
    mode: 'dataset',
    intersect: true,
  }, {
    mode: 'dataset',
    intersect: false,
  }, {
    mode: 'point',
    intersect: true,
  }, {
    mode: 'point',
    intersect: false,
  }, {
    mode: 'nearest',
    intersect: true,
  }, {
    mode: 'nearest',
    intersect: false,
  }, {
    mode: 'x',
    intersect: true
  }, {
    mode: 'x',
    intersect: false
  }, {
    mode: 'y',
    intersect: true
  }, {
    mode: 'y',
    intersect: false
  }]
  $.each(details, function(i, detail) {
    var $col = $('<div>')
    $col.addClass('col-md-6')

    var $panel = $('<div>')
    $panel.addClass('panel')

    var $panelBody = $('<div>')
    $panelBody.addClass('panel-body')

    var $canvas = $('<canvas>')

    $panelBody.append($canvas)
    $panel.append($panelBody)
    $col.append($panel)
    $interactionModesContainer.append($col)

    var ctx = $canvas[0].getContext('2d')
    var config = createConfigInteractionModes(detail.mode, detail.intersect)
    new Chart(ctx, config)
  })

})
