$(document).ready(function () {

  // page loading trigger
  $('#pageLoading').on('click', function () {
    var loader = $('#loaders').val()
    var loading = visionComponents.loading('body', {
      loader: loader,
    })

    setTimeout(function () {
      loading.remove()
    }, 3000)
  })

  // page loading inline trigger
  $('#pageLoadingInline').on('click', function () {
    var loaders = ['line-spin-fade-loader', 'ball-spin-fade-loader']
    var loader = ($.inArray($('#loaders').val(), loaders) < 0) ? 'line-spin-fade-loader' : $('#loaders').val()
    var loading = visionComponents.loading('body', {
      type: 'inline',
      loader: loader,
      label: 'Loading...'
    })

    setTimeout(function () {
      loading.remove()
    }, 3000)
  })

  // content loading trigger
  $('#contentLoading').on('click', function () {
    var loader = $('#loaders').val()
    var loading = visionComponents.loading(vision.getSelector('drawerHolder'), {
      loader: loader
    })

    setTimeout(function () {
      loading.remove()
    }, 3000)
  })

  // component loading trigger
  $('#componentLoading').on('click', function () {
    var loader = $('#loaders').val()
    var loading = visionComponents.loading('#panel', {
      loader: loader,
      scale: .8
    })

    setTimeout(function () {
      loading.remove()
    }, 3000)
  })

  // inline loading trigger
  $('#inlineLoading').on('click', function () {
    var loaders = ['line-spin-fade-loader', 'ball-spin-fade-loader']
    var loader = ($.inArray($('#loaders').val(), loaders) < 0) ? 'line-spin-fade-loader' : $('#loaders').val()
    var target = $(this).closest('li')[0]
    var loading = visionComponents.loading(target, {
      type: 'inline',
      loader: loader,
      label: 'Loading...'
    })

    setTimeout(function () {
      loading.remove()
    }, 3000)
  })

  // inline loading trigger
  var colors = ['#9474a9', '#04C4A5', '#4D9DE0', '#C5906C', '#C56C6C']
  $('#customColorLoading').on('click', function () {
    var loader = $('#loaders').val()
    var color = colors[Math.floor(Math.random() * colors.length)]
    var loading = visionComponents.loading('#panel', {
      loader: loader,
      color: color
    })

    setTimeout(function () {
      loading.remove()
    }, 3000)
  })
})