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

  // Chart.js Line
  var configLine = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 0',
        backgroundColor: chartColors.purple,
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
        fill: false,
      }, {
        label: 'Dataset 1',
        fill: false,
        backgroundColor: chartColors.green,
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
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
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
          }
        }]
      }
    }
  }
  // init chart line
  var canvasLine = $('#canvas-line')[0].getContext('2d')
  var chartLine = new Chart(canvasLine, configLine)
  // randomize data
  $('#randomizeData').on('click', function () {
    configLine.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    chartLine.update()
  })
  // add dataset
  $('#addDataset').on('click', function () {
    var colorName = colorNames[configLine.data.datasets.length % colorNames.length]
    var newColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + configLine.data.datasets.length,
      backgroundColor: newColor,
      borderColor: newColor,
      data: [],
      fill: false
    }
    for (var index = 0; index < configLine.data.labels.length; ++index) {
      newDataset.data.push(randomScalingFactor())
    }
    configLine.data.datasets.push(newDataset)
    chartLine.update()
  })
  // remove dataset
  $('#removeDataset').on('click', function () {
    configLine.data.datasets.splice(0, 1)
    chartLine.update()
  })
  // add data
  $('#addData').on('click', function () {
    if (configLine.data.datasets.length > 0) {
      var month = MONTHS[configLine.data.labels.length % MONTHS.length]
      configLine.data.labels.push(month)
      configLine.data.datasets.forEach(function (dataset) {
        dataset.data.push(randomScalingFactor())
      })
      chartLine.update()
    }
  })
  // remove data
  $('#removeData').on('click', function () {
    configLine.data.labels.splice(-1, 1) // remove the label first
    configLine.data.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    chartLine.update()
  })



  // Chart Line Stacked Area
  var configStackedArea = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 0',
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
      }, {
        label: 'Dataset 1',
        borderColor: chartColors.blue,
        backgroundColor: chartColors.blue,
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
      }, {
        label: 'Dataset 3',
        borderColor: chartColors.yellow,
        backgroundColor: chartColors.yellow,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Stacked Area'
      },
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  }
  // init chart line stacked area
  var canvasStackedArea = $('#canvas-stacked-area')[0].getContext('2d')
  var chartStackedArea = new Chart(canvasStackedArea, configStackedArea)
  // randomize data
  $('#randomizeDataStackedArea').on('click', function () {
    configStackedArea.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    chartStackedArea.update()
  })
  // add dataset
  $('#addDatasetStackedArea').on('click', function () {
    var colorName = colorNames[configStackedArea.data.datasets.length % colorNames.length]
    var newColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + configStackedArea.data.datasets.length,
      borderColor: newColor,
      backgroundColor: newColor,
      data: [],
    }
    for (var index = 0; index < configStackedArea.data.labels.length; ++index) {
      newDataset.data.push(randomScalingFactor())
    }
    configStackedArea.data.datasets.push(newDataset)
    chartStackedArea.update()
  })
  // remove dataset
  $('#removeDatasetStackedArea').on('click', function () {
    configStackedArea.data.datasets.splice(0, 1)
    chartStackedArea.update()
  })
  // add data
  $('#addDataStackedArea').on('click', function () {
    if (configStackedArea.data.datasets.length > 0) {
      var month = MONTHS[configStackedArea.data.labels.length % MONTHS.length]
      configStackedArea.data.labels.push(month)
      configStackedArea.data.datasets.forEach(function (dataset) {
        dataset.data.push(randomScalingFactor())
      })
      chartStackedArea.update()
    }
  })
  // remove data
  $('#removeDataStackedArea').on('click', function () {
    configStackedArea.data.labels.splice(-1, 1) // remove the label first
    configStackedArea.data.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    chartStackedArea.update()
  })



  // Chart Line Styles
  var configLineStyles = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Unfilled',
        fill: false,
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
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
        label: 'Dashed',
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        borderDash: [5, 5],
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
        label: 'Filled',
        backgroundColor: chartColors.purple,
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
        fill: true,
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Styles'
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
          }
        }]
      }
    }
  }
  // init chart line styles
  var canvasLineStyles = $('#canvas-styles')[0].getContext('2d')
  var chartLineStyles = new Chart(canvasLineStyles, configLineStyles)



  // Chart Line Stepped
  var configLineStepped = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
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
        steppedLine: true,
      }, {
        label: 'My Second dataset',
        steppedLine: true,
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
        text: 'Chart.js Line Chart - Stepped'
      },
      tooltips: {
        mode: 'index',
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
        }]
      }
    }
  }
  // init chart line stepped
  var canvasLineStepped = $('#canvas-stepped')[0].getContext('2d')
  var chartLineStepped = new Chart(canvasLineStepped, configLineStepped)



  // Chart Line Skip Points
  var configSkipPoints = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        borderColor: chartColors.purple,
        fill: false,
        // Skip a point in the middle
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          NaN,
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],

      }, {
        label: 'My Second dataset',
        borderColor: chartColors.green,
        fill: false,
        // Skip first and last points
        data: [
          NaN,
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          NaN
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Skip Points'
      },
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
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
        }]
      }
    }
  }
  // init chart line skip points
  var canvasSkipPoints = $('#canvas-skip-points')[0].getContext('2d')
  var chartSkipPoints = new Chart(canvasSkipPoints, configSkipPoints)



  // Chart Line Different Point Sizes
  var configDifferentPointSizes = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'dataset - big points',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        backgroundColor: chartColors.purple,
        borderColor: chartColors.purple,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 15,
        pointHoverRadius: 10,
      }, {
        label: 'dataset - individual point sizes',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        fill: false,
        borderDash: [5, 5],
        pointRadius: [2, 4, 6, 18, 0, 12, 20],
      }, {
        label: 'dataset - large pointHoverRadius',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        fill: false,
        pointHoverRadius: 30,
      }, {
        label: 'dataset - large pointHitRadius',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        backgroundColor: chartColors.yellow,
        borderColor: chartColors.yellow,
        fill: false,
        pointHitRadius: 20,
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom',
      },
      hover: {
        mode: 'index'
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
        text: 'Chart.js Line Chart - Different point sizes'
      }
    }
  }
  // init chart line different point sizes
  var canvasDifferentPointSizes = $('#canvas-different-point-sizes')[0].getContext('2d')
  var chartDifferentPointSizes = new Chart(canvasDifferentPointSizes, configDifferentPointSizes)



  // Chart Line Multi Axis
  var multiAxisData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First dataset',
      borderColor: chartColors.purple,
      backgroundColor: chartColors.purple,
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
      yAxisID: 'y-axis-1',
    }, {
      label: 'My Second dataset',
      borderColor: chartColors.green,
      backgroundColor: chartColors.green,
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
      yAxisID: 'y-axis-2'
    }]
  }
  // init chart line multi axis
  var canvasMultiAxis = $('#canvas-multi-axis')[0].getContext('2d')
  var chartMultiAxis = Chart.Line(canvasMultiAxis, {
    data: multiAxisData,
    options: {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
      },
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          id: 'y-axis-2',

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
  })
  // randomize data
  $('#randomizeDataMultiAxis').on('click', function () {
    multiAxisData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    chartMultiAxis.update()
  })



  // Chart Line Interpolation Modes
  var randomScalingInterpolation = function () {
    return Math.round(Math.random() * 100)
  }
  var datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170]
  var configInterpolationModes = {
    type: 'line',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'Cubic interpolation (monotone)',
        data: datapoints,
        borderColor: chartColors.purple,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: false,
        cubicInterpolationMode: 'monotone'
      }, {
        label: 'Cubic interpolation (default)',
        data: datapoints,
        borderColor: chartColors.blue,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: false,
      }, {
        label: 'Linear interpolation',
        data: datapoints,
        borderColor: chartColors.green,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: false,
        lineTension: 0
      }]
    },
    options: {
      responsive: true,
      title:{
        display:true,
        text:'Chart.js Line Chart - Cubic interpolation mode'
      },
      tooltips: {
        mode: 'index'
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
          ticks: {
            suggestedMin: -10,
            suggestedMax: 200,
          }
        }]
      }
    }
  }
  // init chart line multi axis
  var canvasInterpolationModes = $('#canvas-interpolation-modes')[0].getContext('2d')
  var chartInterpolationModes = new Chart(canvasInterpolationModes, configInterpolationModes)
  // randomize data
  $('#randomizeDataInterpolationModes').on('click', function () {
    for (var i = 0, len = datapoints.length; i < len; ++i) {
      datapoints[i] = Math.random() < 0.05 ? NaN : randomScalingInterpolation()
    }
    chartInterpolationModes.update()
  })



  // Chart Line Point Styles
  function createConfig (pointStyle) {
    return {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: chartColors.green,
          borderColor: chartColors.green,
          data: [10, 23, 5, 99, 67, 43, 0],
          fill: false,
          pointRadius: 10,
          pointHoverRadius: 15,
          showLine: false // no line shown
        }]
      },
      options: {
        responsive: true,
        title:{
          display:true,
          text:'Point Style: ' + pointStyle
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            pointStyle: pointStyle
          }
        }
      }
    }
  }

  var $container = $('#charts-container')
  var points = ['circle', 'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash']
  $.each(points, function (i, pointStyle) {
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
    var config = createConfig(pointStyle)
    new Chart(ctx, config)
  })
})
