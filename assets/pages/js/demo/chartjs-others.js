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
  var color = Chart.helpers.color
  var colorNames = Object.keys(chartColors)

  // Chart Data Labelling
  var dataLabelling = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
      borderColor: chartColors.purple,
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
      type: 'line',
      label: 'Dataset 2',
      backgroundColor: color(chartColors.blue).alpha(0.2).rgbString(),
      borderColor: chartColors.blue,
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
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
      borderColor: chartColors.green,
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
  // Define a plugin to provide data labels
  Chart.plugins.register({
    afterDatasetsDraw: function (chartInstance, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chartInstance.chart.ctx

      chartInstance.data.datasets.forEach(function (dataset, i) {
        // labelling only first chart
        if (chartInstance.id > 0) {
          return
        }
        var meta = chartInstance.getDatasetMeta(i)
        if (!meta.hidden) {
          meta.data.forEach(function (element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'rgb(0, 0, 0)'

            var fontSize = 14
            var fontStyle = 'normal'
            var fontFamily = 'Lato'
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)

            // Just naively convert to string for now
            var dataString = dataset.data[index].toString()

            // Make sure alignment settings are correct
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            var padding = 5
            var position = element.tooltipPosition()
            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
          })
        }
      })
    }
  })
  // init chart data labelling
  var canvasDataLabelling = $('#canvas-data-labelling')[0].getContext('2d')
  var chartDataLabelling = new Chart(canvasDataLabelling, {
    type: 'bar',
    data: dataLabelling,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Combo Bar Line Chart'
      },
    }
  })
  // randomize data
  $('#randomizeDataLabelling').on('click', function () {
    dataLabelling.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    chartDataLabelling.update()
  })



  // Chart Combo Bar Line
  var comboBarLineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      type: 'line',
      label: 'Dataset 1',
      borderColor: chartColors.blue,
      borderWidth: 2,
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
      type: 'bar',
      label: 'Dataset 2',
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
      borderColor: 'white',
      borderWidth: 2
    }, {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: chartColors.green,
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
  // init chart combo bar line
  var canvasComboBarLineData = $('#canvas-combo-bar-line')[0].getContext('2d')
  var chartComboBarLineData = new Chart(canvasComboBarLineData, {
    type: 'bar',
    data: comboBarLineData,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Combo Bar Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    }
  })
  // randomize data
  $('#randomizeDataComboBarLine').on('click', function () {
    comboBarLineData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    chartComboBarLineData.update()
  })



  // Chart Bubble
  var DEFAULT_DATASET_SIZE = 7
  var addedCount = 2
  var bubbleChartData = {
    animation: {
      duration: 10000
    },
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
      borderColor: chartColors.purple,
      borderWidth: 1,
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }]
    }, {
      label: 'Dataset 2',
      backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
      borderColor: chartColors.green,
      borderWidth: 1,
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      }]
    }]
  }
  // init chart bubble
  var canvasBubble = $('#canvas-bubble')[0].getContext('2d')
  var bubble = new Chart(canvasBubble, {
    type: 'bubble',
    data: bubbleChartData,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Bubble Chart'
      },
      tooltips: {
        mode: 'point'
      }
    }
  })
  // randomize data
  $('#randomizeDataBubble').on('click', function () {
    bubbleChartData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return {
          x: randomScalingFactor(),
          y: randomScalingFactor(),
          r: Math.abs(randomScalingFactor()) / 5,
        }
      })
    })
    bubble.update()
  })
  // add dataset
  $('#addDatasetBubble').on('click', function () {
    ++addedCount
    var colorName = colorNames[bubbleChartData.datasets.length % colorNames.length]
    var dsColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + addedCount,
      backgroundColor: color(dsColor).alpha(0.5).rgbString(),
      borderColor: dsColor,
      borderWidth: 1,
      data: []
    }
    for (var index = 0; index < DEFAULT_DATASET_SIZE; ++index) {
      newDataset.data.push({
        x: randomScalingFactor(),
        y: randomScalingFactor(),
        r: Math.abs(randomScalingFactor()) / 5,
      })
    }
    bubbleChartData.datasets.push(newDataset)
    bubble.update()
  })
  // remove dataset
  $('#removeDatasetBubble').on('click', function () {
    bubbleChartData.datasets.splice(0, 1)
    bubble.update()
  })
  // add data
  $('#addDataBubble').on('click', function () {
    if (bubbleChartData.datasets.length > 0) {
      for (var index = 0; index < bubbleChartData.datasets.length; ++index) {
        bubbleChartData.datasets[index].data.push({
          x: randomScalingFactor(),
          y: randomScalingFactor(),
          r: Math.abs(randomScalingFactor()) / 5,
        })
      }
      bubble.update()
    }
  })
  // remove data
  $('#removeDataBubble').on('click', function () {
    bubbleChartData.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    bubble.update()
  })



  // Chart Animation
  var progress = $('#animationProgress')[0]
  var configAnimation = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        fill: false,
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
        ]
      }, {
        label: 'Dataset 2',
        fill: false,
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
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Animation Progress Bar'
      },
      animation: {
        duration: 2000,
        onProgress: function (animation) {
          progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps
        },
        onComplete: function (animation) {
          window.setTimeout(function () {
            progress.value = 0
          }, 2000)
        }
      }
    }
  }
  // init chart animation
  var canvasAnimation = $('#canvas-animation')[0].getContext('2d')
  var animation = new Chart(canvasAnimation, configAnimation)
  // randomize data
  $('#randomizeDataAnimation').on('click', function () {
    configAnimation.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    animation.update()
  })



  // Chart Polar Area
  var randomScalingPolarArea = function () {
    return Math.round(Math.random() * 100)
  }
  var configPolarArea = {
    data: {
      datasets: [{
        data: [
          randomScalingPolarArea(),
          randomScalingPolarArea(),
          randomScalingPolarArea(),
          randomScalingPolarArea(),
          randomScalingPolarArea(),
        ],
        backgroundColor: [
          color(chartColors.red).alpha(0.5).rgbString(),
          color(chartColors.purple).alpha(0.5).rgbString(),
          color(chartColors.yellow).alpha(0.5).rgbString(),
          color(chartColors.green).alpha(0.5).rgbString(),
          color(chartColors.blue).alpha(0.5).rgbString(),
        ],
        label: 'My dataset' // for legend
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
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Polar Area Chart'
      },
      scale: {
        ticks: {
          beginAtZero: true
        },
        reverse: false
      },
      animation: {
        animateRotate: false,
        animateScale: true
      }
    }
  }
  // init chart polar area
  var canvasPolarArea = $('#canvas-polar-area')[0].getContext('2d')
  var polarArea = Chart.PolarArea(canvasPolarArea, configPolarArea)
  // randomize data
  $('#randomizeDataPolarArea').on('click', function () {
    configPolarArea.data.datasets.forEach(function (piece, i) {
      piece.data.forEach(function (value, j) {
        configPolarArea.data.datasets[i].data[j] = randomScalingPolarArea()
      })
    })
    polarArea.update()
  })
  // add data
  $('#addDataPolarArea').on('click', function () {
    if (configPolarArea.data.datasets.length > 0) {
      configPolarArea.data.labels.push('data #' + configPolarArea.data.labels.length)
      configPolarArea.data.datasets.forEach(function (dataset) {
        var colorName = colorNames[configPolarArea.data.labels.length % colorNames.length]
        dataset.backgroundColor.push(chartColors[colorName])
        dataset.data.push(randomScalingPolarArea())
      })
      polarArea.update()
    }
  })
  // remove data
  $('#removeDataPolarArea').on('click', function () {
    configPolarArea.data.labels.pop() // remove the label first
    configPolarArea.data.datasets.forEach(function (dataset) {
      dataset.backgroundColor.pop()
      dataset.data.pop()
    })
    polarArea.update()
  })



  // Chart Pie
  var randomScalingPie = function () {
    return Math.round(Math.random() * 100)
  }
  var configPie = {
    type: 'pie',
    data: {
      datasets: [{
        data: [
          randomScalingPie(),
          randomScalingPie(),
          randomScalingPie(),
          randomScalingPie(),
          randomScalingPie(),
        ],
        backgroundColor: [
          chartColors.red,
          chartColors.purple,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue,
        ],
        label: 'Dataset 1'
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
      responsive: true
    }
  }
  // init chart pie
  var canvasPie = $('#canvas-pie')[0].getContext('2d')
  var pie = new Chart(canvasPie, configPie)
  // randomize data
  $('#randomizeDataPie').on('click', function () {
    configPie.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingPie()
      })
    })
    pie.update()
  })
  // add data
  $('#addDatasetPie').on('click', function () {
    var newDataset = {
      backgroundColor: [],
      data: [],
      label: 'New dataset ' + configPie.data.datasets.length,
    }
    for (var index = 0; index < configPie.data.labels.length; ++index) {
      newDataset.data.push(randomScalingPie())
      var colorName = colorNames[index % colorNames.length]
      var newColor = chartColors[colorName]
      newDataset.backgroundColor.push(newColor)
    }
    configPie.data.datasets.push(newDataset)
    pie.update()
  })
  // remove data
  $('#removeDatasetPie').on('click', function () {
    configPie.data.datasets.splice(0, 1)
    pie.update()
  })



  // Chart Doughnut
  var randomScalingDoughnut = function () {
    return Math.round(Math.random() * 100)
  }
  var configDoughnut = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          randomScalingDoughnut(),
          randomScalingDoughnut(),
          randomScalingDoughnut(),
          randomScalingDoughnut(),
          randomScalingDoughnut(),
        ],
        backgroundColor: [
          chartColors.red,
          chartColors.purple,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue,
        ],
        label: 'Dataset 1'
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
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  }
  // init chart doughnut
  var canvasDoughnut = $('#canvas-doughnut')[0].getContext('2d')
  var doughnut = new Chart(canvasDoughnut, configDoughnut)
  // randomize data
  $('#randomizeDataDoughnut').on('click', function () {
    configDoughnut.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingDoughnut()
      })
    })
    doughnut.update()
  })
  // add dataset
  $('#addDatasetDoughnut').on('click', function () {
    var newDataset = {
      backgroundColor: [],
      data: [],
      label: 'New dataset ' + configDoughnut.data.datasets.length,
    }
    for (var index = 0; index < configDoughnut.data.labels.length; ++index) {
      newDataset.data.push(randomScalingDoughnut())
      var colorName = colorNames[index % colorNames.length]
      var newColor = chartColors[colorName]
      newDataset.backgroundColor.push(newColor)
    }
    configDoughnut.data.datasets.push(newDataset)
    doughnut.update()
  })
  // remove dataset
  $('#removeDatasetDoughnut').on('click', function () {
    configDoughnut.data.datasets.splice(0, 1)
    doughnut.update()
  })
  // add data
  $('#addDataDoughnut').on('click', function () {
    if (configDoughnut.data.datasets.length > 0) {
      configDoughnut.data.labels.push('data #' + configDoughnut.data.labels.length)
      var colorName = colorNames[configDoughnut.data.datasets[0].data.length % colorNames.length]
      var newColor = chartColors[colorName]
      configDoughnut.data.datasets.forEach(function (dataset) {
        dataset.data.push(randomScalingDoughnut())
        dataset.backgroundColor.push(newColor)
      })
      doughnut.update()
    }
  })
  // remove data
  $('#removeDataDoughnut').on('click', function () {
    configDoughnut.data.labels.splice(-1, 1) // remove the label first
    configDoughnut.data.datasets.forEach(function (dataset) {
      dataset.data.pop()
      dataset.backgroundColor.pop()
    })
    doughnut.update()
  })
})
