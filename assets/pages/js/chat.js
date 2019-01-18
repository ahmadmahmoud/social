$(document).ready(function () {
  // hovered after item divider
  $('body').on('mouseenter mouseleave', '.post-list-item', function (e) {
    var hasDivider = $(this).prev().hasClass('post-divider')
    if (hasDivider) {
      $(this).prev().toggleClass('has-hover', function () {
        return e.type === 'mouseover'
      })
    }
  })
  // keep it scrolled to the bottom by default
  var postHolder = document.querySelector('#post-holder')
  var scrollToBottom = function () {
    postHolder.scrollTop = postHolder.scrollHeight
  }
  scrollToBottom()

  // post creator
  $('#post-creator-frm').on('submit', function () {
    console.log('action to posting a message')
    return false
  })
  // attachment
  $('#postAttachment').on('change', function () {
    var files = this.files
    var $fileCount = $(this).parent().next()
    var word = (files.length < 2) ? files.length + ' file selected' : files.length + ' files selected'
    var txt = (files.length === 0) ? 'Attachment' : word

    $fileCount.text(txt)
  })


  // show/hide sidebar
  var changeNavState = function (el) {
    var li = el ? $(el).parent() : $('#app-header .navbar-tools .nav').children('li')[0]
    $(li).parent().children().removeClass('active')
    if (el) {
      $(li).addClass('active')
    }
  }
  var openSidebar = function () {
    $('.reference-details').removeClass('has-side-right-closed')
  }
  var closeSidebar = function () {
    $('.reference-details').addClass('has-side-right-closed')
    changeNavState()
  }
  $('body').on('click', '[data-click="openSidebar"]', function () {
    openSidebar()
  })
  $('body').on('click', '[data-click="closeSidebar"]', function () {
    closeSidebar()
  })


  // change the sidebar content (demo purpose only)
  $('#activities').on('click', function (e) {
    e.preventDefault()
    changeNavState(this)
    // load the template
    $('#sidebar').load('app-chat-activities.html', function () {
      // open the sidebar
      openSidebar()
    })
  })
  $('#members').on('click', function (e) {
    e.preventDefault()
    changeNavState(this)
    // load the template
    $('#sidebar').load('app-chat-member-list.html', function () {
      // open the sidebar
      openSidebar()
    })
  })
  $('#chat-global-search').on('submit', function (e) {
    e.preventDefault()
    changeNavState()
    // load the template
    $('#sidebar').load('app-chat-search-result.html', function () {
      // open the sidebar
      openSidebar()
    })
  })
  $('#chat-global-search input').on('focusin focusout', function (e) {
    var val = $(this).val()
    var hasVal = function () {
      return val.length > 0
    }
    changeNavState()

    if (e.type === 'focusin') {
      // load the template
      $('#sidebar').load('app-chat-search-result.html', function () {
        // open the sidebar
        openSidebar()
      })
    } else if (e.type === 'focusout') {
      console.log(hasVal())
      if (!hasVal()) {
        // close the sidebar
        closeSidebar()
      }
    }
  })

  // demo guide
  // Initialize the tour
  var tour = new Tour({
    steps: [{
      element: '#activities',
      title: 'Member Activities',
      placement: 'left',
      content: 'Click to open the member activities sidebar.'
    },
    {
      element: '#members',
      title: 'Member Lists',
      placement: 'auto',
      content: 'Click to open the member list sidebar.'
    },
    {
      element: '#chat-global-search input',
      title: 'Search Field',
      placement: 'auto',
      content: 'Focus on input field to see the search result sidebar.'
    }]
  }).init()
  // Start the tour
  tour
    .setCurrentStep(0)
    .start(true)
})