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

  var randomScalingFactor = function (min, max) {
    min = min || 20
    max = max || 100
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  // Simulate panel refresh
  $('.panel').on('loading', function (e, panel, loading) {
    // stop propagation for nested panel
    e.stopPropagation()
    // your actions goes here
    setTimeout(function () {
      // stop loading
      loading.remove()
    }, 3000)
  })


  // Dashboard stats
  var sparklineStats = function () {
    $('#stat-sparkline').sparkline([3793,3345,3836,3410,3710,4615,3151,3709,3330,4145,4758,4702,3982,4035,3082,3435,3571,3763,4521,4778,4988,3557,4184,4485,4054,4959,3805,3679,3810,3127], {
      type: 'line',
      width: '100%',
      height: '19',
      lineColor: chartColors.red,
      fillColor: chartColors.red,
      spotColor: false,
      minSpotColor: false,
      maxSpotColor: false
    })
  }
  sparklineStats()
  $(window).resize(vision.debounce(function () {
    sparklineStats()
  }, 300))


  // Overview Stats
  var m = moment().format('MMM')
  var usersData = []
  var referralsData = []
  var pageviewsData = []
  var overviewLabels = []
  for (var i = 0; i <= 29; i++) {
    overviewLabels.push(moment().subtract(29 - i, 'days').format('D/MM'))
  }
  for (var i = 0; i <= 29; i++) {
    usersData.push(randomScalingFactor(1000, 5000))
    referralsData.push(randomScalingFactor(1000, 5000))
    pageviewsData.push(randomScalingFactor(1000, 5000))
  }
  var overviewDataset = {
    labels: overviewLabels,
    datasets: [{
      label: 'Users',
      type: 'line',
      fill: false,
      borderColor: chartColors.red,
      pointBackgroundColor: chartColors.red,
      pointHoverBackgroundColor: chartColors.red,
      pointHoverBorderColor: chartColors.red,
      borderWidth: 2,
      data: usersData
    }, {
      label: 'Referrals',
      backgroundColor: chartColors.green,
      data: referralsData
    }, {
      label: 'Pageviews',
      backgroundColor: chartColors.grayLighter,
      data: pageviewsData
    }]
  }
  var overviewOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: chartColors.grayDark,
          userCallback: function (dataLabel, index) {
            return index % 6 === 0 ? dataLabel : '';
          },
          maxRotation: 0
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          color: chartColors.grayLighter,
          zeroLineColor: 'rgba(0,0,0,0)'
        },
        ticks: {
          fontColor: chartColors.grayDark,
          maxTicksLimit: 5
        }
      }]
    }
  }
  // init
  var overviewCanvas = $('#overview-stats')[0].getContext('2d')
  var chartComboBarLineData = new Chart(overviewCanvas, {
    type: 'bar',
    data: overviewDataset,
    options: overviewOptions
  })


  // Business Statsvar
  var ordersData = []
  var paymentsData = []
  var ticketsData = []
  var businessLabels = []
  for (var i = 0; i <= 29; i++) {
    businessLabels.push(moment().subtract(29 - i, 'days').format('D/MM'))
  }
  for (var i = 0; i <= 29; i++) {
    ordersData.push(randomScalingFactor(500, 3000))
    paymentsData.push(randomScalingFactor(500, 3000))
    ticketsData.push(randomScalingFactor(500, 3000))
  }
  var businessConfig = {
    type: 'bar',
    data: {
      labels: businessLabels,
      datasets: [{
        label: 'Orders',
        backgroundColor: chartColors.purple,
        data: ordersData,
      }, {
        label: 'Payments Completed',
        backgroundColor: chartColors.blue,
        data: paymentsData,
      }, {
        label: 'Tickets',
        backgroundColor: chartColors.green,
        data: ticketsData,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: chartColors.grayDark,
            userCallback: function (dataLabel, index) {
              return index % 6 === 0 ? dataLabel : '';
            },
            maxRotation: 0
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            color: chartColors.grayLighter,
            zeroLineColor: 'rgba(0,0,0,0)'
          },
          ticks: {
            fontColor: chartColors.grayDark,
            maxTicksLimit: 5
          }
        }]
      }
    }
  }
  // init
  var businessCanvas = $('#business-stats')[0].getContext('2d')
  var businessChart = new Chart(businessCanvas, businessConfig)


  // Customers Pie Chart
  var customersConfig = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          randomScalingFactor(40,80),
          randomScalingFactor(70, 100),
          randomScalingFactor(20,70)
        ],
        backgroundColor: [
          chartColors.green,
          chartColors.purple,
          chartColors.blue
        ]
      }],
      labels: [
        'New',
        'Returning',
        'Referrals'
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      title: {
        display: false
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  }
  // init
  var customerCanvas = $('#customer-stats')[0].getContext('2d')
  new Chart(customerCanvas, customersConfig)


  // Countries world map
  $('#world-map').vectorMap({
    map: 'world_en',
    backgroundColor: '#fff',
    borderColor: chartColors.grayLighter,
    color: chartColors.grayLighter,
    selectedColor: chartColors.grayLight,
    hoverColor: null,
    enableZoom: false,
    selectedRegions: ['au', 'ru', 'us', 'id', 'in', 'gb'],
    onRegionClick: function (e){
      e.preventDefault()
    }
  })


  // jQuery Knob
  $('.knob').knob({
    draw: function () {
      $(this.i).val(this.cv + '%')

      // 'tron' case
      if (this.$.data('skin') == 'tron') {
        this.cursorExt = 0.3
        var a = this.arc(this.cv) // Arc
        var pa // Previous arc
        var r = 1

        this.g.lineWidth = this.lineWidth

        if (this.o.displayPrevious) {
          pa = this.arc(this.v)
          this.g.beginPath()
          this.g.strokeStyle = this.pColor
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d)
          this.g.stroke()
        }

        this.g.beginPath()
        this.g.strokeStyle = r ? this.o.fgColor : this.fgColor
        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d)
        this.g.stroke()

        this.g.lineWidth = 2
        this.g.beginPath()
        this.g.strokeStyle = this.o.fgColor
        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false)
        this.g.stroke()

        return false
      }
    }
  })
})
