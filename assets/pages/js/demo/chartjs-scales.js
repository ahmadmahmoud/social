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

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var colorNames = Object.keys(chartColors)

  // Chart Multiline Labels
  var randomScalingMultiline = function () {
    return Math.round(Math.random() * 100)
  }
  var configMultilineLabels = {
    type: 'line',
    data: {
      labels: [
        ['June', '2015'], 'July', 'August', 'September', 'October', 'November', 'December', ['January', '2016'], 'February', 'March', 'April', 'May'
      ],
      datasets: [{
        label: 'Dataset 1',
        fill: false,
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        data: [
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline()
        ]
      }, {
        label: 'Dataset 2',
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: [
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline(),
          randomScalingMultiline()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart with Multiline Labels'
      },
    }
  }
  // init chart multiline labels
  var canvasMultilineLabels = $('#canvas-multiline-labels')[0].getContext('2d')
  var multilineLabels = new Chart(canvasMultilineLabels, configMultilineLabels)



  // Chart Line Non Numeric Y
  var configLineNonNumericY = {
    type: 'line',
    data: {
      xLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      yLabels: ['', 'Request Added', 'Request Viewed', 'Request Accepted', 'Request Solved', 'Solving Confirmed'],
      datasets: [{
        label: 'Dataset 1',
        data: ['', 'Request Added', 'Request Added', 'Request Added', 'Request Viewed', 'Request Viewed', 'Request Viewed'],
        fill: false,
        borderColor: chartColors.green,
        backgroundColor: chartColors.green
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart with Non Numeric Y Axis'
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
          type: 'category',
          position: 'left',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Request State'
          },
          ticks: {
            reverse: true
          }
        }]
      }
    }
  }
  // init line non numeric y
  var canvasLineNonNumericY = $('#canvas-line-non-numeric-y')[0].getContext('2d')
  var lineNonNumericY = new Chart(canvasLineNonNumericY, configLineNonNumericY)



  // Gridlines
  var configGridlines = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        data: [10, 30, 39, 20, 25, 34, -10],
        fill: false,
      }, {
        label: 'Dataset 2',
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: [18, 33, 22, 19, 11, 39, 30],
      }]
    },
    options: {
      responsive: true,
      title:{
        display: true,
        text: 'Grid Line Settings'
      },
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false,
            color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
          },
          ticks: {
            min: 0,
            max: 100,
            stepSize: 10
          }
        }]
      }
    }
  }
  // init chart gridlines
  var canvasGridlines = $('#canvas-gridlines')[0].getContext('2d')
  var gridlines = new Chart(canvasGridlines, configGridlines)



  // Filtering Labels
  var randomScalingFilteringLabels = function () {
    return Math.round(Math.random() * 50 * (Math.random() > 0.5 ? 1 : 1)) + 50
  }
  var configFilteringLabels = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        fill: false,
        borderColor: chartColors.purple,
        backgroundColor: chartColors.purple,
        data: [
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels()
        ]
      }, {
        label: 'Dataset 2',
        fill: false,
        borderColor: chartColors.green,
        backgroundColor: chartColors.green,
        data: [
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels(),
          randomScalingFilteringLabels()
        ]
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - X-Axis Filter'
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            callback: function (dataLabel, index) {
              // Hide the label of every 2nd dataset. return null to hide the grid line too
              return index % 2 === 0 ? dataLabel : ''
            }
          }
        }],
        yAxes: [{
          display: true,
          beginAtZero: false
        }]
      }
    }
  }
  // init chart filtering labels
  var canvasFilteringLabels = $('#canvas-filtering-labels')[0].getContext('2d')
  var filteringLabels = new Chart(canvasFilteringLabels, configFilteringLabels)



  // Display Settings
  function createConfig(gridlines, title) {
    return {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          backgroundColor: chartColors.purple,
          borderColor: chartColors.purple,
          data: [10, 30, 39, 20, 25, 34, 0],
          fill: false,
        }, {
          label: 'Dataset 2',
          fill: false,
          backgroundColor: chartColors.green,
          borderColor: chartColors.green,
          data: [18, 33, 22, 19, 11, 39, 30],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: title
        },
        scales: {
          xAxes: [{
            gridLines: gridlines
          }],
          yAxes: [{
            gridLines: gridlines,
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10
            }
          }]
        }
      }
    }
  }

  var $container = $('#display-settings')
  var displaySettings = [{
    title: 'Display: true',
    gridLines: {
      display: true
    }
  }, {
    title: 'Display: false',
    gridLines: {
      display: false
    }
  }, {
    title: 'Display: false, no border',
    gridLines: {
      display: false,
      drawBorder: false
    }
  }, {
    title: 'DrawOnChartArea: false',
    gridLines: {
      display: true,
      drawBorder: true,
      drawOnChartArea: false,
    }
  }, {
    title: 'DrawTicks: false',
    gridLines: {
      display: true,
      drawBorder: true,
      drawOnChartArea: true,
      drawTicks: false,
    }
  }]
  $.each(displaySettings, function (i, details) {
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
    var config = createConfig(details.gridLines, details.title)
    new Chart(ctx, config)
  })


  // Chart linear min/max settings
  var configLinearMinMax = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        data: [10, 30, 50, 20, 25, 44, -10],
        fill: false,
      }, {
        label: 'Dataset 2',
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: [100, 33, 22, 19, 11, 49, 30],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Min and Max Settings'
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 10,
            max: 50
          }
        }]
      }
    }
  }
  // init chart linear min max settings
  var canvasLinearMinMax = $('#canvas-linear-min-max-settings')[0].getContext('2d')
  var linearMinMaxSettings = new Chart(canvasLinearMinMax, configLinearMinMax)



  // Chart linear suggested min/max settings
  var configLinearSuggestedMinMax = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        data: [10, 30, 39, 20, 25, 34, -10],
        fill: false,
      }, {
        label: 'Dataset 2',
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: [18, 33, 22, 19, 11, 39, 30],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Min and Max Settings'
      },
      scales: {
        yAxes: [{
          ticks: {
            // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
            suggestedMin: 10,
            // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
            suggestedMax: 50
          }
        }]
      }
    }
  }
  // init chart linear suggested min max settings
  var canvasLinearSuggestedMinMax = $('#canvas-linear-suggested-min-max-settings')[0].getContext('2d')
  var linearSuggestedMinMaxSettings = new Chart(canvasLinearSuggestedMinMax, configLinearSuggestedMinMax)



  // Chart linear step size
  var randomScalingLinearStepSize = function () {
    return Math.round(Math.random() * 100)
  }
  var configLinearStepSize = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 0',
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        data: [
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize()
        ],
        fill: false,
      }, {
        label: 'Dataset 1',
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        data: [
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize(),
          randomScalingLinearStepSize()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Step Size'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
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
          },
          ticks: {
            min: 0,
            max: 100,
            // forces step size to be 5 units
            stepSize: 5
          }
        }]
      }
    }
  }
  // init chart linear step size
  var canvasLinearStepSize = $('#canvas-linear-step-size')[0].getContext('2d')
  var linearStepSize = new Chart(canvasLinearStepSize, configLinearStepSize)
  // randomize data
  $('#randomizeDataLinearStepSize').on('click', function () {
    configLinearStepSize.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingLinearStepSize()
      })
    })
    linearStepSize.update()
  })
  // add dataset
  $('#addDatasetLinearStepSize').on('click', function () {
    var colorName = colorNames[configLinearStepSize.data.datasets.length % colorNames.length]
    var newColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + configLinearStepSize.data.datasets.length,
      backgroundColor: newColor,
      borderColor: newColor,
      data: [],
      fill: false
    }
    for (var index = 0; index < configLinearStepSize.data.labels.length; ++index) {
      newDataset.data.push(randomScalingLinearStepSize())
    }
    configLinearStepSize.data.datasets.push(newDataset)
    linearStepSize.update()
  })
  // remove dataset
  $('#removeDatasetLinearStepSize').on('click', function () {
    configLinearStepSize.data.datasets.splice(0, 1)
    linearStepSize.update()
  })
  // add data
  $('#addDataLinearStepSize').on('click', function () {
    if (configLinearStepSize.data.datasets.length > 0) {
      var month = MONTHS[configLinearStepSize.data.labels.length % MONTHS.length]
      configLinearStepSize.data.labels.push(month)
      configLinearStepSize.data.datasets.forEach(function (dataset) {
        dataset.data.push(randomScalingLinearStepSize())
      })
      linearStepSize.update()
    }
  })
  // remove data
  $('#removeDataLinearStepSize').on('click', function () {
    configLinearStepSize.data.labels.splice(-1, 1) // remove the label first
    configLinearStepSize.data.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    linearStepSize.update()
  })



  // Chart Logarithmic Line
  var randomScalingLogarithmicLine = function () {
    return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
  };

  var configLogarithmicLine = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        fill: false,
        data: [
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine()
        ],
      }, {
        label: 'Dataset 2',
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        fill: false,
        data: [
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine(),
          randomScalingLogarithmicLine()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Logarithmic'
      },
      scales: {
        xAxes: [{
          display: true,
        }],
        yAxes: [{
          display: true,
          type: 'logarithmic',
        }]
      }
    }
  }
  // init chart logarithmic line
  var canvasLogarithmicLine = $('#canvas-logarithmic-line')[0].getContext('2d')
  var logarithmicLine = new Chart(canvasLogarithmicLine, configLogarithmicLine)



  // Chart Logarithmic Scatter LogX
  var color = Chart.helpers.color
  var logarithmicScatterChartData = {
    datasets: [{
      borderColor: chartColors.green,
      backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
      label: 'V(node2)',
      data: [{
        x: 1,
        y: -1.711e-2,
      }, {
        x: 1.26,
        y: -2.708e-2,
      }, {
        x: 1.58,
        y: -4.285e-2,
      }, {
        x: 2.0,
        y: -6.772e-2,
      }, {
        x: 2.51,
        y: -1.068e-1,
      }, {
        x: 3.16,
        y: -1.681e-1,
      }, {
        x: 3.98,
        y: -2.635e-1,
      }, {
        x: 5.01,
        y: -4.106e-1,
      }, {
        x: 6.31,
        y: -6.339e-1,
      }, {
        x: 7.94,
        y: -9.659e-1,
      }, {
        x: 10.00,
        y: -1.445,
      }, {
        x: 12.6,
        y: -2.110,
      }, {
        x: 15.8,
        y: -2.992,
      }, {
        x: 20.0,
        y: -4.102,
      }, {
        x: 25.1,
        y: -5.429,
      }, {
        x: 31.6,
        y: -6.944,
      }, {
        x: 39.8,
        y: -8.607,
      }, {
        x: 50.1,
        y: -1.038e1,
      }, {
        x: 63.1,
        y: -1.223e1,
      }, {
        x: 79.4,
        y: -1.413e1,
      }, {
        x: 100.00,
        y: -1.607e1,
      }, {
        x: 126,
        y: -1.803e1,
      }, {
        x: 158,
        y: -2e1,
      }, {
        x: 200,
        y: -2.199e1,
      }, {
        x: 251,
        y: -2.398e1,
      }, {
        x: 316,
        y: -2.597e1,
      }, {
        x: 398,
        y: -2.797e1,
      }, {
        x: 501,
        y: -2.996e1,
      }, {
        x: 631,
        y: -3.196e1,
      }, {
        x: 794,
        y: -3.396e1,
      }, {
        x: 1000,
        y: -3.596e1,
      }, ]
    }]
  }
  // init chart logarithmic scatter logX
  var canvasLogarithmicScatter = $('#canvas-logarithmic-scatter')[0].getContext('2d')
  var LogarithmicScatter = Chart.Scatter(canvasLogarithmicScatter, {
    data: logarithmicScatterChartData,
    options: {
      title: {
        display: true,
        text: 'Chart.js Scatter Chart - Logarithmic X-Axis'
      },
      scales: {
        xAxes: [{
          type: 'logarithmic',
          position: 'bottom',
          ticks: {
            userCallback: function (tick) {
              var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))))
              if (remain === 1 || remain === 2 || remain === 5) {
                return tick.toString() + 'Hz'
              }
              return ''
            },
          },
          scaleLabel: {
            labelString: 'Frequency',
            display: true,
          }
        }],
        yAxes: [{
          type: 'linear',
          ticks: {
            userCallback: function (tick) {
              return tick.toString() + 'dB'
            }
          },
          scaleLabel: {
            labelString: 'Voltage',
            display: true
          }
        }]
      }
    }
  })



  // Chart Combo Time Scale
  var timeFormat = 'MM/DD/YYYY HH:mm'
  function newDate(days) {
    return moment().add(days, 'd').toDate();
  }
  function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
  }
  function newTimestamp(days) {
    return moment().add(days, 'd').unix();
  }

  var configComboTimeScale = {
    type: 'bar',
    data: {
      labels: [
        newDateString(0),
        newDateString(1),
        newDateString(2),
        newDateString(3),
        newDateString(4),
        newDateString(5),
        newDateString(6)
      ],
      datasets: [{
        type: 'bar',
        label: 'Dataset 0',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }, {
        type: 'bar',
        label: 'Dataset 1',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }, {
        type: 'line',
        label: 'Dataset 2',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }, ]
    },
    options: {
      title: {
        display: true,
        text: 'Chart.js Combo Time Scale'
      },
      scales: {
        xAxes: [{
          type: 'time',
          display: true,
          time: {
            format: timeFormat,
            // round: 'day'
          }
        }],
      },
    }
  }
  // init chart combo time scale
  var canvasComboTimeScale = $('#canvas-combo-time-scale')[0].getContext('2d')
  var comboTimeScale = new Chart(canvasComboTimeScale, configComboTimeScale)
  // randomize data
  $('#randomizeDataComboTimeScale').on('click', function () {
    configComboTimeScale.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    comboTimeScale.update()
  })
  // add dataset
  $('#addDatasetComboTimeScale').on('click', function () {
    var colorName = colorNames[configComboTimeScale.data.datasets.length % colorNames.length]
    var newColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + configComboTimeScale.data.datasets.length,
      borderColor: newColor,
      backgroundColor: color(newColor).alpha(0.5).rgbString(),
      data: [],
    }
    for (var index = 0; index < configComboTimeScale.data.labels.length; ++index) {
      newDataset.data.push(randomScalingFactor())
    }
    configComboTimeScale.data.datasets.push(newDataset)
    comboTimeScale.update()
  })
  // remove dataset
  $('#removeDatasetComboTimeScale').on('click', function () {
    configComboTimeScale.data.datasets.splice(0, 1)
    comboTimeScale.update()
  })
  // add data
  $('#addDataComboTimeScale').on('click', function () {
    if (configComboTimeScale.data.datasets.length > 0) {
      configComboTimeScale.data.labels.push(newDateString(configComboTimeScale.data.labels.length))
      for (var index = 0; index < configComboTimeScale.data.datasets.length; ++index) {
        configComboTimeScale.data.datasets[index].data.push(randomScalingFactor())
      }
      comboTimeScale.update()
    }
  })
  // remove data
  $('#removeDataComboTimeScale').on('click', function () {
    configComboTimeScale.data.labels.splice(-1, 1) // remove the label first
    configComboTimeScale.data.datasets.forEach(function (dataset, datasetIndex) {
      configComboTimeScale.data.datasets[datasetIndex].data.pop()
    })
    comboTimeScale.update()
  })



  // Chart Line Time Scale
  var configLineTimeScale = {
    type: 'line',
    data: {
      labels: [ // Date Objects
        newDate(0),
        newDate(1),
        newDate(2),
        newDate(3),
        newDate(4),
        newDate(5),
        newDate(6)
      ],
      datasets: [{
        label: 'Dataset 0',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }, {
        label: 'Dataset 1',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }, {
        label: 'Dataset with point data',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        data: [{
          x: newDateString(0),
          y: randomScalingFactor()
        }, {
          x: newDateString(5),
          y: randomScalingFactor()
        }, {
          x: newDateString(7),
          y: randomScalingFactor()
        }, {
          x: newDateString(15),
          y: randomScalingFactor()
        }],
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Chart.js Time Scale'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            format: timeFormat,
            // round: 'day'
            tooltipFormat: 'll HH:mm'
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }, ],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'value'
          }
        }]
      },
    }
  }
  // init chart line time scale
  var canvasLineTimeScale = $('#canvas-line-time-scale')[0].getContext('2d')
  var lineTimeScale = new Chart(canvasLineTimeScale, configLineTimeScale)
  // randomize data
  $('#randomizeDataLineTimeScale').on('click', function () {
    configLineTimeScale.data.datasets.forEach(function (dataset) {
      dataset.data.forEach(function (dataObj, j) {
        if (typeof dataObj === 'object') {
          dataObj.y = randomScalingFactor()
        } else {
          dataset.data[j] = randomScalingFactor()
        }
      })
    })
    lineTimeScale.update()
  })
  // add dataset
  $('#addDatasetLineTimeScale').on('click', function () {
    var colorName = colorNames[configLineTimeScale.data.datasets.length % colorNames.length]
    var newColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + configLineTimeScale.data.datasets.length,
      borderColor: newColor,
      backgroundColor: color(newColor).alpha(0.5).rgbString(),
      data: [],
    }
    for (var index = 0; index < configLineTimeScale.data.labels.length; ++index) {
      newDataset.data.push(randomScalingFactor())
    }
    configLineTimeScale.data.datasets.push(newDataset)
    lineTimeScale.update()
  })
  // remove dataset
  $('#removeDatasetLineTimeScale').on('click', function () {
    configLineTimeScale.data.datasets.splice(0, 1)
    lineTimeScale.update()
  })
  // add data
  $('#addDataLineTimeScale').on('click', function () {
    if (configLineTimeScale.data.datasets.length > 0) {
      configLineTimeScale.data.labels.push(newDate(configLineTimeScale.data.labels.length))
      for (var index = 0; index < configLineTimeScale.data.datasets.length; ++index) {
        if (typeof configLineTimeScale.data.datasets[index].data[0] === 'object') {
          configLineTimeScale.data.datasets[index].data.push({
            x: newDate(configLineTimeScale.data.datasets[index].data.length),
            y: randomScalingFactor(),
          })
        } else {
          configLineTimeScale.data.datasets[index].data.push(randomScalingFactor())
        }
      }
      lineTimeScale.update()
    }
  })
  // remove data
  $('#removeDataLineTimeScale').on('click', function () {
    configLineTimeScale.data.labels.splice(-1, 1) // remove the label first
    configLineTimeScale.data.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    lineTimeScale.update()
  })



  // Chart Line Time Point Data
  var configLineTimePointData = {
    type: 'line',
    data: {
      datasets: [{
        label: 'Dataset with string point data',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false,
        data: [{
          x: newDateString(0),
          y: randomScalingFactor()
        }, {
          x: newDateString(2),
          y: randomScalingFactor()
        }, {
          x: newDateString(4),
          y: randomScalingFactor()
        }, {
          x: newDateString(5),
          y: randomScalingFactor()
        }],
      }, {
        label: 'Dataset with date object point data',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        data: [{
          x: newDate(0),
          y: randomScalingFactor()
        }, {
          x: newDate(2),
          y: randomScalingFactor()
        }, {
          x: newDate(4),
          y: randomScalingFactor()
        }, {
          x: newDate(5),
          y: randomScalingFactor()
        }]
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Time Point Data'
      },
      scales: {
        xAxes: [{
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'value'
          }
        }]
      }
    }
  }
  // init chart line time point data
  var canvasLineTimePointData = $('#canvas-line-time-point-data')[0].getContext('2d')
  var lineTimePointData = new Chart(canvasLineTimePointData, configLineTimePointData)
  // randomize data
  $('#randomizeDataLineTimePointData').on('click', function () {
    configLineTimePointData.data.datasets.forEach(function (dataset) {
      dataset.data.forEach(function (dataObj) {
        dataObj.y = randomScalingFactor()
      })
    })
    lineTimePointData.update()
  })
  // add data
  $('#addDataLineTimePointData').on('click', function () {
    if (configLineTimePointData.data.datasets.length > 0) {
      var lastTime = lineTimePointData.scales['x-axis-0'].labelMoments[0].length ? lineTimePointData.scales['x-axis-0'].labelMoments[0][lineTimePointData.scales['x-axis-0'].labelMoments[0].length - 1] : moment()
      var newTime = lastTime
        .clone()
        .add(1, 'day')
        .format('MM/DD/YYYY HH:mm')

      for (var index = 0; index < configLineTimePointData.data.datasets.length; ++index) {
        configLineTimePointData.data.datasets[index].data.push({
          x: newTime,
          y: randomScalingFactor()
        })
      }
      lineTimePointData.update()
    }
  })
  // remove data
  $('#removeDataLineTimePointData').on('click', function () {
    configLineTimePointData.data.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    lineTimePointData.update()
  })
})
