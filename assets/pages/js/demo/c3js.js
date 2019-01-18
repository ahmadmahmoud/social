$(document).ready(function () {
  var chartColors = [
    vision.brandColor('success'),
    vision.brandColor('primary'),
    vision.brandColor('info'),
    'rgb(255, 205, 86)',
    vision.brandColor('danger'),
    vision.brandColor('warning'),
    vision.brandColor('gray')
  ]


  // Simple Line
  var simpleLine = c3.generate({
    bindto: '#simple-line',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Select points
  var selectPoints = c3.generate({
    bindto: '#select-points',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })
  selectPoints.select(['data1'], [4,6])

  // Focus on data 2
  var focusData = c3.generate({
    bindto: '#focus-data',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    },
    color: {
      pattern: chartColors
    }
  })
  focusData.focus('data2')

  // Add Region
  var addRegion = c3.generate({
    bindto: '#add-region',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })
  addRegion.regions.add([{start:2, end:6}])

  // Add x grid line
  var addXGrid = c3.generate({
    bindto: '#add-xgrid',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })
  addXGrid.xgrids([{value: 1, text:'Label 1'}, {value: 4, text: 'Label 4'}])

  // Add y grid line
  var addYGrid = c3.generate({
    bindto: '#add-ygrid',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    },
    point: {
      show: false
    }
  })
  addYGrid.ygrids.add([{value: 300, text:'Label 300'}])

  // Transform to bar
  var lineToBar = c3.generate({
    bindto: '#line-to-bar',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })
  var bar = false
  $('#btn-line-to-bar').on('click', function () {
    if (bar) {
      lineToBar.transform('spline')
    } else {
      lineToBar.transform('bar')
    }
    bar = !bar
  })

  // Sub Chart
  var subChart = c3.generate({
    bindto: '#sub-chart',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    subchart: {
      show: true
    },
    color: {
      pattern: chartColors
    }
  })

  // Zoom Chart
  var zoomChart = c3.generate({
    bindto: '#zoom-chart',
    data: {
      type: 'spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    subchart: {
      show: true
    },
    zoom: {
      enabled: true
    },
    color: {
      pattern: chartColors
    }
  })

  // Line Grouping
  var barGrouping = c3.generate({
    bindto: '#bar-grouping',
    data: {
      type: 'bar',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })
  barGrouping.groups([['data1', 'data2']])

  // Step chart
  var stepChart = c3.generate({
    bindto: '#step-chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      types: {
        data1: 'area-step',
        data2: 'area-step',
        data3: 'step'
      },
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Area chart
  var areaChart = c3.generate({
    bindto: '#area-chart',
    data: {
      type: 'area',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Area Stacked chart
  var areaStackedChart = c3.generate({
    bindto: '#area-stacked-chart',
    data: {
      type: 'area-spline',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      groups: [['data1', 'data2', 'data3']],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Bar chart
  var barChart = c3.generate({
    bindto: '#bar-chart',
    data: {
      type: 'bar',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Bar Stacked chart
  var barStackedChart = c3.generate({
    bindto: '#bar-stacked-chart',
    data: {
      type: 'bar',
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250],
        ['data2', 100, 30, 200, 320, 50, 150, 230, 80, 150],
        ['data3', 70, 90, 170, 220, 100, 110, 130, 40, 50]
      ],
      groups: [['data1', 'data2', 'data3']],
      selection: {
        enabled: true
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // scatter plot
  var scatterPlot = c3.generate({
    bindto: '#scatter-plot',
    data: {
      xs: {
        setosa: 'setosa_x',
        versicolor: 'versicolor_x',
      },
      // iris data from R
      columns: [
        ['setosa_x', 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
        ['versicolor_x', 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
        ['setosa', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
        ['versicolor', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
      ],
      type: 'scatter'
    },
    axis: {
      x: {
        label: 'Sepal.Width',
        tick: {
          fit: false
        }
      },
      y: {
        label: 'Petal.Width'
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Pie Chart
  var pieChart = c3.generate({
    bindto: '#pie-chart',
    data: {
      // iris data from R
      columns: [
        ['setosa', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
        ['versicolor', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ['virginica', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
      ],
      type : 'pie',
      onclick: function (d) {
        toastr.info('Value: ' + d.value)
      },
      onmouseover: function (d, i) {
        console.log('onmouseover', d, i)
      },
      onmouseout: function (d, i) {
        console.log('onmouseout', d, i)
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Donut Chart
  var donutChart = c3.generate({
    bindto: '#donut-chart',
    data: {
      // iris data from R
      columns: [
        ['setosa', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
        ['versicolor', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
        ['virginica', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
      ],
      type : 'donut',
      onclick: function (d) {
        toastr.info('Value: ' + d.value)
      },
      onmouseover: function (d, i) {
        console.log('onmouseover', d, i)
      },
      onmouseout: function (d, i) {
        console.log('onmouseout', d, i)
      }
    },
    color: {
      pattern: chartColors
    }
  })

  // Gauge Chart
  var gaugeChart = c3.generate({
    bindto: '#gauge-chart',
    data: {
      columns: [
        ['data', 91.4]
      ],
      type: 'gauge',
      onclick: function (d) {
        toastr.info('Value: ' + d.value)
      },
      onmouseover: function (d, i) {
        console.log('onmouseover', d, i)
      },
      onmouseout: function (d, i) {
        console.log('onmouseout', d, i)
      },
    },
    color: {
      pattern: [
        chartColors[4],
        chartColors[3],
        chartColors[2],
        chartColors[0]
      ],
      threshold: {
        values: [30, 60, 90, 100]
      }
    },
    size: {
      height: 260
    }
  })
  var getRandomGauge = function () {
    return Math.floor(Math.random() * 100) + 1
  }
  $('#btn-update-gauge').on('click', function () {
    gaugeChart.load({
      columns: [['data', getRandomGauge()]]
    })
  })

  // Combine Chart
  var combineChart = c3.generate({
    bindto: '#combine-chart',
    data: {
      columns: [
        ['data1', 30, 20, 50, 40, 60, 50],
        ['data2', 200, 130, 90, 240, 130, 220],
        ['data3', 300, 200, 160, 400, 250, 250],
        ['data4', 200, 130, 90, 240, 130, 220],
        ['data5', 130, 120, 150, 140, 160, 150],
        ['data6', 90, 70, 20, 50, 60, 120],
      ],
      type: 'bar',
      types: {
        data3: 'spline',
        data4: 'line',
        data6: 'area'
      },
      groups: [
        ['data1','data2']
      ]
    },
    color: {
      pattern: chartColors
    }
  })


  // respond to drawer
  $(visionDrawer.selector).on('drawer:open drawer:close drawer:compact', function () {
    $(this).one(vision.whichTransitionEvent(), function () {
      simpleLine.flush()
      selectPoints.flush()
      focusData.flush()
      addRegion.flush()
      addXGrid.flush()
      addYGrid.flush()
      lineToBar.flush()
      barGrouping.flush()
    })
  })
})