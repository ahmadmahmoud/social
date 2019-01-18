$(document).ready(function () {
  // reference details layout
  $('body').on('click', '[data-reference-content="open"]', function () {
    $('.reference-details').addClass('has-open-content')
    $('.reference-list, .reference-content').removeClass('animated fadeIn zoomOut')
    if (vision.isToggleScreenDown()) {
      $('.reference-list').addClass('animated zoomOut')
      $('.reference-content').addClass('animated fadeIn')
    }
  })
  $('body').on('click', '[data-reference-content="close"]', function () {
    $('.reference-details').removeClass('has-open-content')
    $('.reference-list, .reference-content').removeClass('animated fadeIn zoomOut')
    if (vision.isToggleScreenDown()) {
      $('.reference-list').addClass('animated fadeIn')
      $('.reference-content').addClass('animated zoomOut')
    }
  })
  $(window).on('resize', function () {
    if (vision.isToggleScreenUp()) {
      $('.reference-list, .reference-content').removeClass('animated fadeIn zoomOut')
    }
  })


  // Compose message
  // autocomplete
  var names = ['Jacob','Isabella','Ethan','Emma','Michael','Olivia','Alexander','Sophia','William','Ava','Joshua','Emily','Daniel','Madison','Jayden','Abigail','Noah','Chloe','你好','你你你', 'Jérémy', '가']
  var names = $.map(names, function (value, i) {
    return {'id': i, 'name': value, 'email': value.toLowerCase() + '@email.com'}
  })
  var at_config = {
    at: '@',
    data: names,
    headerTpl: '<div class="atwho-header">Member List<small>↑&nbsp↓&nbsp</small></div>',
    insertTpl: '${email},',
    displayTpl: '<li>${name} <small>${email}</small></li>',
    limit: 200
  }
  // input element
  $qmInputs = $('#qm-to, #qm-cc, #qm-bcc').atwho(at_config)
  $qmInputs.caret('pos', 47)
  // editor
  var msgEditor = new Quill('#message-editor', {
    placeholder: 'Write message...',
    modules: { toolbar: '#message-toolbar'},
    theme: 'snow'
  })
  $('[data-toggle="compose-email"]').on('click', function (e) {
    e.preventDefault()
    $('#compose-email-frm')
      .show()
      // must open by default
      .removeClass('panel-collapsed')
    $('#qm-cc').next().show()
    $('#bcc').addClass('d-none')
  })
  $('#attachment').on('change', function () {
    var files = this.files
    var $fileCount = $(this).parent().next()
    var word = (files.length < 2) ? files.length + ' file selected' : files.length + ' files selected'
    var txt = (files.length === 0) ? 'Attachment' : word

    $fileCount.text(txt)
  })


  // View message
  var loadList = function () {
    // show loader
    var loading = visionComponents.loading('#inbox-list .reference-inner', {
      loader: 'ball-spin-fade-loader',
      color: '#9474a9',
      scale: .5
    })
    // give a few second to see the demo loading
    setTimeout(function () {
      // do an action to load the inbox list then remove loader
      loading.remove()
    }, 1000)
  }

  var loadMsg = function () {
    var countSelected = $('.inbox-list-view .inbox-list-item.selected').length
    var tpl = (countSelected > 1) ? 'app-email-selected-state.html' : 'app-email-content-view.html'
    tpl = (countSelected < 1) ? 'app-email-empty-state.html' : tpl

    if (tpl === 'app-email-content-view.html') {
      // show loader
      var loading = visionComponents.loading('#reference-content .reference-inner', {
        loader: 'ball-spin-fade-loader',
        color: '#9474a9',
        scale: .75
      })
      // give a few second to see the demo loading
      setTimeout(function () {
        $('#message').load(tpl, function () {
          // remove loader
          loading.remove()
        })
      }, 1000)
    } else {
      $('#message').load(tpl, function () {
        $('#countSelected').text(countSelected)
      })
    }

  }
  // load the message content
  // this is just an example for demo purpose only
  loadMsg()

  // select all inbox list
  $('#inbox-list-select-all').on('change', function () {
    var isChecked = $(this).prop('checked')
    $('.inbox-list-view input:checkbox')
      .prop('checked', isChecked)
      .trigger('change')
  })
  // refresh inbox list
  $('#inbox-list-refresh').on('click', function () {
    loadList()
  })

  // toggle mark checkbox when item toggle select
  $('.inbox-list-view .selectable-item').on('click', function () {
    var $this = $(this)

    // place event quee on after selectable event
    setTimeout(function () {
      var hasSelected = $this.prop('selected')

      $('input:checkbox').prop('checked', false)
      $this.find('input:checkbox').prop('checked', hasSelected)

      // remove unread
      $this.removeClass('unread')

      // load the message content
      // this is just an example for demo purpose only
      loadMsg()
    })
  })
  $('.inbox-list-view input:checkbox').on('change', function () {
    var $this = $(this)
    var classes = $this.parents('[data-selectable]').data('selectable')
    var hasSelected = $this.prop('checked')
    $(this).parents('.selectable-item')
      .prop('selected', hasSelected)
      .toggleClass(classes, hasSelected)

    // load the message content
    // this is just an example for demo purpose only
    loadMsg()
  })

  // toggle star
  $('.inbox-list-view .has-star').on('click', function (e) {
    e.stopPropagation()
    e.preventDefault()

    $(this).children('.fa').toggleClass('fa fa-star-o fa fa-star')
  })
})