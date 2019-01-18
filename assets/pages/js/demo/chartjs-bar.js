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

  // Chart.defaults.global.maintainAspectRatio = false

  var randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100)
  }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var color = Chart.helpers.color
  var colorNames = Object.keys(chartColors)

  // Chart Bar
  var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
      borderColor: chartColors.purple,
      borderWidth: 1,
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
      backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
      borderColor: chartColors.green,
      borderWidth: 1,
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
  // init chart bar
  var canvasBar = $('#canvas-bar')[0].getContext('2d')
  var bar = new Chart(canvasBar, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  })
  // randomize data
  $('#randomizeData').on('click', function () {
    var zero = Math.random() < 0.2 ? true : false
    barChartData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return zero ? 0.0 : randomScalingFactor()
      })
    })
    bar.update()
  })
  // add dataset
  $('#addDataset').on('click', function () {
    var colorName = colorNames[barChartData.datasets.length % colorNames.length]
    var dsColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + barChartData.datasets.length,
      backgroundColor: color(dsColor).alpha(0.5).rgbString(),
      borderColor: dsColor,
      borderWidth: 1,
      data: []
    }
    for (var index = 0; index < barChartData.labels.length; ++index) {
      newDataset.data.push(randomScalingFactor())
    }
    barChartData.datasets.push(newDataset)
    bar.update()
  })
  // remove dataset
  $('#removeDataset').on('click', function () {
    barChartData.datasets.splice(0, 1)
    bar.update()
  })
  // add data
  $('#addData').on('click', function () {
    if (barChartData.datasets.length > 0) {
      var month = MONTHS[barChartData.labels.length % MONTHS.length]
      barChartData.labels.push(month)
      for (var index = 0; index < barChartData.datasets.length; ++index) {
        //bar.addData(randomScalingFactor(), index)
        barChartData.datasets[index].data.push(randomScalingFactor())
      }
      bar.update()
    }
  })
  // remove data
  $('#removeData').on('click', function () {
    barChartData.labels.splice(-1, 1) // remove the label first
    barChartData.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    bar.update()
  })



  // Chart Horizontal Bar
  var horizontalBarChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
      borderColor: chartColors.purple,
      borderWidth: 1,
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
      ]
    }]
  }
  // init chart horizontal bar
  var canvasHorizontalBar = $('#canvas-horizontal-bar')[0].getContext('2d')
  var horizontalBar = new Chart(canvasHorizontalBar, {
    type: 'horizontalBar',
    data: horizontalBarChartData,
    options: {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    }
  })
  // randomize data
  $('#randomizeDataHorizontalBar').on('click', function () {
    var zero = Math.random() < 0.2 ? true : false
    horizontalBarChartData.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return zero ? 0.0 : randomScalingFactor()
      })
    })
    horizontalBar.update()
  })
  // add dataset
  $('#addDatasetHorizontalBar').on('click', function () {
    var colorName = colorNames[horizontalBarChartData.datasets.length % colorNames.length]
    var dsColor = chartColors[colorName]
    var newDataset = {
      label: 'Dataset ' + horizontalBarChartData.datasets.length,
      backgroundColor: color(dsColor).alpha(0.5).rgbString(),
      borderColor: dsColor,
      data: []
    }
    for (var index = 0; index < horizontalBarChartData.labels.length; ++index) {
      newDataset.data.push(randomScalingFactor())
    }
    horizontalBarChartData.datasets.push(newDataset)
    horizontalBar.update()
  })
  // add data
  $('#addDataHorizontalBar').on('click', function () {
    if (horizontalBarChartData.datasets.length > 0) {
      var month = MONTHS[horizontalBarChartData.labels.length % MONTHS.length]
      horizontalBarChartData.labels.push(month)
      for (var index = 0; index < horizontalBarChartData.datasets.length; ++index) {
        horizontalBarChartData.datasets[index].data.push(randomScalingFactor())
      }
      horizontalBar.update()
    }
  })
  // remove data
  $('#removeDatasetHorizontalBar').on('click', function () {
    horizontalBarChartData.datasets.splice(0, 1)
    horizontalBar.update()
  })
  // remove dataset
  $('#removeDataHorizontalBar').on('click', function () {
    horizontalBarChartData.labels.splice(-1, 1) // remove the label first
    horizontalBarChartData.datasets.forEach(function (dataset, datasetIndex) {
      dataset.data.pop()
    })
    horizontalBar.update()
  })



  // Chart Stacked Bar
  var barStackedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: chartColors.blue,
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
    }, {
      label: 'Dataset 3',
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
    }]
  }
  // init Chart Stacked Bar
  var canvasStacked = $('#canvas-stacked')[0].getContext('2d')
  var stackedBar = new Chart(canvasStacked, {
    type: 'bar',
    data: barStackedData,
    options: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  })
  // randomize data
  $('#randomizeDataStackedBar').on('click', function () {
    barStackedData.datasets.forEach(function (dataset, i) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    stackedBar.update()
  })



  // Chart Stacked Group Bar
  var barStackedGroupData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: chartColors.purple,
      stack: 'Stack 0',
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
      backgroundColor: chartColors.green,
      stack: 'Stack 0',
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
      label: 'Dataset 3',
      backgroundColor: chartColors.green,
      stack: 'Stack 1',
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
  // init chart stacked group bar
  var canvasStackedGroup = $('#canvas-stacked-group')[0].getContext('2d')
  var stackedGroupBar = new Chart(canvasStackedGroup, {
    type: 'bar',
    data: barStackedGroupData,
    options: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked Group'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  })
  // randomize data
  $('#randomizeDataStackedGroupBar').on('click', function () {
    barStackedGroupData.datasets.forEach(function (dataset, i) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    stackedGroupBar.update()
  })



  // Chart Multi Axis Bar
  var barMultiAxis = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: [
        chartColors.purple,
        chartColors.orange,
        chartColors.yellow,
        chartColors.green,
        chartColors.blue,
        chartColors.red,
        chartColors.purple
      ],
      yAxisID: 'y-axis-1',
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
      backgroundColor: chartColors.gray,
      yAxisID: 'y-axis-2',
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
  var canvasMultiAxisBar = $('#canvas-multi-axis')[0].getContext('2d')
  var multiAxisBar = new Chart(canvasMultiAxisBar, {
    type: 'bar',
    data: barMultiAxis,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Multi Axis'
      },
      tooltips: {
        mode: 'index',
        intersect: true
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
          gridLines: {
            drawOnChartArea: false
          }
        }],
      }
    }
  })
  // randomize data
  $('#randomizeDataMultiAxisBar').on('click', function () {
    barMultiAxis.datasets.forEach(function (dataset, i) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor()
      })
    })
    multiAxisBar.update()
  })
})
