$(document).ready(function () {
  $('.panel').on('loading', function (e, panel, loading) {
    // stop propagation for nested panel
    e.stopPropagation()

    // your actions goes here
    setTimeout(function () {
      // stop loading
      loading.remove()
    }, 3000)
  })
})