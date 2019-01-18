$(document).ready(function () {
  var chartColors = [
    vision.brandColor('danger'),
    vision.brandColor('warning'),
    'rgb(255, 205, 86)',
    vision.brandColor('success'),
    vision.brandColor('info'),
    vision.brandColor('primary'),
    vision.brandColor('gray')
  ]


  // Randomly Generated Data
  // raw data
  var data = []
  var series = 6
  for (var i = 0; i < series; i++) {
    data[i] = {
      label: 'Series' + (i + 1),
      data: Math.floor(Math.random() * 100) + 1,
      color: chartColors[i]
    }
  }

  // chart selector
  var placeholder = $('#flot-pie')

  // flot default
  $('#pie-1').click(function () {
    // unbind chart
    placeholder.unbind()
    // update text
    $('#pie-title').text('Default pie chart')
    $('#pie-description').text('The default pie chart with no options set.')
    // init plot
    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true
        }
      }
    })
    // update code
    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true',
      '        }',
      '    }',
      '})'
    ])
  })

  // flot without legend
  $('#pie-2').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Default without legend')
    $('#pie-description').text('The default pie chart when the legend is disabled. Since the labels would normally be outside the container, the chart is resized to fit.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot label formatter
  $('#pie-3').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Custom Label Formatter')
    $('#pie-description').text('Added a semi-transparent background to the labels and a custom labelFormatter function.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 1,
            formatter: labelFormatter,
            background: {
              opacity: 0.8
            }
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            radius: 1,',
      '            label: {',
      '                show: true,',
      '                radius: 1,',
      '                formatter: labelFormatter,',
      '                background: {',
      '                    opacity: 0.8',
      '                }',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot label radius
  $('#pie-4').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Label Radius')
    $('#pie-description').text('Slightly more transparent label backgrounds and adjusted the radius values to place them within the pie.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 3 / 4,
            formatter: labelFormatter,
            background: {
              opacity: 0.5
            }
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            radius: 1,',
      '            label: {',
      '                show: true,',
      '                radius: 3/4,',
      '                formatter: labelFormatter,',
      '                background: {',
      '                    opacity: 0.5',
      '                }',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot label styles #1
  $('#pie-5').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Label Styles #1')
    $('#pie-description').text('Semi-transparent, black-colored label background.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 3 / 4,
            formatter: labelFormatter,
            background: {
              opacity: 0.5,
              color: '#000'
            }
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: { ',
      '            show: true,',
      '            radius: 1,',
      '            label: {',
      '                show: true,',
      '                radius: 3/4,',
      '                formatter: labelFormatter,',
      '                background: { ',
      '                    opacity: 0.5,',
      '                    color: \'#000\'',
      '                }',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot label styles #2
  $('#pie-6').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Label Styles #2')
    $('#pie-description').text('Semi-transparent, black-colored label background placed at pie edge.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 3 / 4,
          label: {
            show: true,
            radius: 3 / 4,
            formatter: labelFormatter,
            background: {
              opacity: 0.5,
              color: '#000'
            }
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            radius: 3/4,',
      '            label: {',
      '                show: true,',
      '                radius: 3/4,',
      '                formatter: labelFormatter,',
      '                background: {',
      '                    opacity: 0.5,',
      '                    color: \'#000\'',
      '                }',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot hidden labels
  $('#pie-7').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Hidden Labels')
    $('#pie-description').text('Labels can be hidden if the slice is less than a given percentage of the pie (10% in this case).')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 2 / 3,
            formatter: labelFormatter,
            threshold: 0.1
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            radius: 1,',
      '            label: {',
      '                show: true,',
      '                radius: 2/3,',
      '                formatter: labelFormatter,',
      '                threshold: 0.1',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot combined slice
  $('#pie-8').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Combined Slice')
    $('#pie-description').text('Multiple slices less than a given percentage (5% in this case) of the pie can be combined into a single, larger slice.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          combine: {
            color: '#999',
            threshold: 0.05
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            combine: {',
      '                color: \'#999\',',
      '                threshold: 0.1',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot ractangular pie
  $('#pie-9').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Rectangular Pie')
    $('#pie-description').text('The radius can also be set to a specific size (even larger than the container itself).')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 500,
          label: {
            show: true,
            formatter: labelFormatter,
            threshold: 0.1
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            radius: 500,',
      '            label: {',
      '                show: true,',
      '                formatter: labelFormatter,',
      '                threshold: 0.1',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})'
    ])
  })

  // flot titled pie
  $('#pie-10').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Tilted Pie')
    $('#pie-description').text('The pie can be tilted at an angle.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          tilt: 0.5,
          label: {
            show: true,
            radius: 1,
            formatter: labelFormatter,
            background: {
              opacity: 0.8
            }
          },
          combine: {
            color: '#999',
            threshold: 0.1
          }
        }
      },
      legend: {
        show: false
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true,',
      '            radius: 1,',
      '            tilt: 0.5,',
      '            label: {',
      '                show: true,',
      '                radius: 1,',
      '                formatter: labelFormatter,',
      '                background: {',
      '                    opacity: 0.8',
      '                }',
      '            },',
      '            combine: {',
      '                color: \'#999\',',
      '                threshold: 0.1',
      '            }',
      '        }',
      '    },',
      '    legend: {',
      '        show: false',
      '    }',
      '})',
    ])
  })

  // flot donut hole
  $('#pie-11').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Donut Hole')
    $('#pie-description').text('A donut hole can be added.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          innerRadius: 0.5,
          show: true
        }
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            innerRadius: 0.5,',
      '            show: true',
      '        }',
      '    }',
      '})'
    ])
  })

  // flot interactivity
  $('#pie-12').click(function () {
    placeholder.unbind()

    $('#pie-title').text('Interactivity')
    $('#pie-description').text('The pie can be made interactive with hover and click events.')

    $.plot(placeholder, data, {
      series: {
        pie: {
          show: true
        }
      },
      grid: {
        hoverable: true,
        clickable: true
      }
    })

    setCode([
      '$.plot(\'#placeholder\', data, {',
      '    series: {',
      '        pie: {',
      '            show: true',
      '        }',
      '    },',
      '    grid: {',
      '        hoverable: true,',
      '        clickable: true',
      '    }',
      '})'
    ])

    placeholder.bind('plothover', function (event, pos, obj) {
      if (!obj) {
        return
      }
      var percent = parseFloat(obj.series.percent).toFixed(2)
      console.log(obj.series.label + ' (' + percent + '%)')
    })

    placeholder.bind('plotclick', function (event, pos, obj) {
      if (!obj) {
        return
      }
      percent = parseFloat(obj.series.percent).toFixed(2)
      toastr.info(obj.series.label + ': ' + percent + '%')
    })
  })

  // Show the initial default chart
  $('#pie-1').click()

  // A custom label formatter used by several of the plots
  function labelFormatter (label, series) {
    return '<div style="font-size:8pt; text-align:center; padding:2px; color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>'
  }

  // update data
  function setCode (lines) {
    $('#pie-code').text(lines.join('\n'))
  }
})