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

  // Chart Radar
  var randomScalingRadar = function () {
    return Math.round(Math.random() * 100)
  }
  var configRadar = {
    type: 'radar',
    data: {
      labels: [
        ['Eating', 'Dinner'],
        ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'
      ],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
        borderColor: chartColors.purple,
        pointBackgroundColor: chartColors.purple,
        data: [
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar()
        ]
      }, {
        label: 'My Second dataset',
        backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
        borderColor: chartColors.green,
        pointBackgroundColor: chartColors.green,
        data: [
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar(),
          randomScalingRadar()
        ]
      }]
    },
    options: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Radar Chart'
      },
      scale: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  }
  // init chart radar
  var radar = new Chart($('#canvas-radar')[0], configRadar)
  // randomize data
  $('#randomizeData').on('click', function () {
    configRadar.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingRadar()
      })
    })
    radar.update()
  })
  // add dataset
  $('#addDataset').on('click', function () {
    var colorName = colorNames[configRadar.data.datasets.length % colorNames.length]
    var newColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + configRadar.data.datasets.length,
      borderColor: newColor,
      backgroundColor: color(newColor).alpha(0.2).rgbString(),
      pointBorderColor: newColor,
      data: [],
    }
    for (var index = 0; index < configRadar.data.labels.length; ++index) {
      newDataset.data.push(randomScalingRadar())
    }
    configRadar.data.datasets.push(newDataset)
    radar.update()
  })
  // remove dataset
  $('#removeDataset').on('click', function () {
    configRadar.data.datasets.splice(0, 1)
    radar.update()
  })
  // add data
  $('#addData').on('click', function () {
    if (configRadar.data.datasets.length > 0) {
      configRadar.data.labels.push('dataset #' + configRadar.data.labels.length)
      configRadar.data.datasets.forEach(function (dataset) {
        dataset.data.push(randomScalingRadar())
      })
      radar.update()
    }
  })
  // remove data
  $('#removeData').on('click', function () {
    configRadar.data.labels.pop() // remove the label first
    configRadar.data.datasets.forEach(function (dataset) {
      dataset.data.pop()
    })
    radar.update()
  })



  // Chart Radar Skip Points
  var configSkipPoints = {
    type: 'radar',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [{
        label: 'Skip first dataset',
        borderColor: chartColors.purple,
        backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
        pointBackgroundColor: chartColors.purple,
        data: [
          NaN,
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      }, {
        label: 'Skip mid dataset',
        borderColor: chartColors.blue,
        backgroundColor: color(chartColors.blue).alpha(0.2).rgbString(),
        pointBackgroundColor: chartColors.blue,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          NaN,
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      }, {
        label: 'Skip last dataset',
        borderColor: chartColors.green,
        backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
        pointBackgroundColor: chartColors.green,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          NaN
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Chart.js Radar Chart - Skip Points'
      },
      elements: {
        line: {
          tension: 0.0,
        }
      },
      scale: {
        beginAtZero: true,
      }
    }
  }
  // init chart skip points radar
  var radarSkipPoints = new Chart($('#canvas-radar-skip-points')[0], configSkipPoints)
  // randomize data
  $('#randomizeDataSkipPoints').on('click', function () {
    configSkipPoints.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    radarSkipPoints.update()
  })



  // Chart Scatter
  var scatterChartData = {
    datasets: [{
      label: 'My First dataset',
      borderColor: chartColors.purple,
      backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }]
    }, {
      label: 'My Second dataset',
      borderColor: chartColors.green,
      backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }]
    }]
  }
  // init chart scatter
  var canvasScatter = $('#canvas-scatter')[0].getContext('2d')
  var scatter = Chart.Scatter(canvasScatter, {
    data: scatterChartData,
    options: {
      title: {
        display: true,
        text: 'Chart.js Scatter Chart'
      },
    }
  })
  // randomize data
  $('#randomizeDataScatter').on('click', function () {
    scatterChartData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return {
          x: randomScalingFactor(),
          y: randomScalingFactor()
        }
      })
    })
    scatter.update()
  })



  // Chart Scatter Multi Axis
  var scatterMultiAxisData = {
    datasets: [{
      label: 'My First dataset',
      xAxisID: 'x-axis-1',
      yAxisID: 'y-axis-1',
      borderColor: chartColors.purple,
      backgroundColor: color(chartColors.purple).alpha(0.2).rgbString(),
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }]
    }, {
      label: 'My Second dataset',
      xAxisID: 'x-axis-1',
      yAxisID: 'y-axis-2',
      borderColor: chartColors.green,
      backgroundColor: color(chartColors.green).alpha(0.2).rgbString(),
      data: [{
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }, {
        x: randomScalingFactor(),
        y: randomScalingFactor(),
      }]
    }]
  }
  // init chart scatter multi axis
  var canvasMultiAxis = $('#canvas-scatter-multi-axis')[0].getContext('2d')
  var scatterMultiAxis = Chart.Scatter(canvasMultiAxis, {
    data: scatterMultiAxisData,
    options: {
      responsive: true,
      hoverMode: 'nearest',
      intersect: true,
      title: {
        display: true,
        text: 'Chart.js Scatter Chart - Multi Axis'
      },
      scales: {
        xAxes: [{
          position: 'bottom',
          gridLines: {
            zeroLineColor: 'rgba(0,0,0,1)'
          }
        }],
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'right',
          reverse: true,
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
  $('#randomizeDataMultiAxisScatter').on('click', function () {
    scatterMultiAxisData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return {
          x: randomScalingFactor(),
          y: randomScalingFactor()
        }
      })
    })
    scatterMultiAxis.update()
  })
})
