$(document).ready(function () {

  // Initialize the tour
  var tour = new Tour({
    onStart: function() {
      $("#start-tour").prop('disabled', true)
      return $('body').addClass('has-tour', true)
    },
    onEnd: function() {
      $("#start-tour").prop('disabled', false)
      return $('body').removeClass('has-tour', true)
    },
    steps: [{
      element: '#app-header',
      backdrop: true,
      title: 'App Header',
      placement: 'bottom',
      content: 'Vero reprehenderit necessitatibus ratione, molestias aspernatur possimus qui magnam amet laudantium ex.'
    },
    {
      element: '#app-header [data-toggle="drawer"]',
      title: 'Toggle Global Navigation',
      placement: 'right',
      content: 'Vero reprehenderit necessitatibus ratione, molestias aspernatur possimus qui magnam amet laudantium ex.'
    },
    {
      element: '#app-header .navbar-brand',
      title: 'App Brand',
      placement: 'bottom',
      content: 'Vero reprehenderit necessitatibus ratione, molestias aspernatur possimus qui magnam amet laudantium ex.'
    },
    {
      element: '#header-form-collapse',
      title: 'Global Search',
      placement: 'bottom',
      content: 'Vero reprehenderit necessitatibus ratione, molestias aspernatur possimus qui magnam amet laudantium ex.'
    },
    {
      element: '#header-nav-collapse',
      title: 'Header Tools',
      placement: 'bottom',
      content: 'Vero reprehenderit necessitatibus ratione, molestias aspernatur possimus qui magnam amet laudantium ex.'
    },
    {
      element: '#app-drawer',
      backdrop: true,
      title: 'App Drawer',
      placement: 'right',
      content: 'Obcaecati voluptas blanditiis, quia molestias accusamus recusandae modi. Deleniti, expedita inventore sapiente.',
      onShow: function () {
        if (!visionDrawer.isOpen()) {
          visionDrawer.open()
          vision.handleHolderHeight()
        }
      }
    },
    {
      element: '#app-drawer',
      backdrop: true,
      title: 'Compact Mode',
      placement: 'right',
      content: 'Obcaecati voluptas blanditiis, quia molestias accusamus recusandae modi. Deleniti, expedita inventore sapiente.',
      onShow: function () {
        visionDrawer.compact(true)
      },
      onHide: function () {
        visionDrawer.compact(false)
      }
    },
    {
      element: '#app-extra',
      backdrop: true,
      title: 'App Extra Drawer',
      placement: 'left',
      content: 'Voluptas fuga cumque autem facilis cupiditate consectetur dolore voluptate molestias mollitia quas?',
      onShow: function () {
        visionExtraDrawer.open()
      },
      onHide: function () {
        visionExtraDrawer.close()
      }
    },
    {
      element: '.content-heading',
      title: 'App Content Heading',
      placement: 'bottom',
      content: 'Nobis inventore iure fugit illum quisquam non animi consequatur labore assumenda pariatur.'
    },
    {
      element: '#app-footer',
      backdrop: true,
      title: 'App Footer',
      placement: 'top',
      content: 'Asperiores aut commodi modi laudantium mollitia temporibus quidem at non odit corporis.'
    }]
  }).init()

  // Start the tour
  tour
    .setCurrentStep(0)
    .start()
  // Restart
  $("#start-tour").on('click', function () {
    tour.restart()
  })
})