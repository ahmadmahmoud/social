$(document).ready(function () {

  // list A
  $('#foo').sortable({
    group: 'words',
    animation: 150,
    store: {
      get: function (sortable) {
        var order = localStorage.getItem(sortable.options.group)
        return order ? order.split('|') : []
      },
      set: function (sortable) {
        var order = sortable.toArray()
        localStorage.setItem(sortable.options.group, order.join('|'))
      }
    },
    onAdd: function (evt) {
      console.log('onAdd.foo:', [evt.item, evt.from])
    },
    onUpdate: function (evt) {
      console.log('onUpdate.foo:', [evt.item, evt.from])
    },
    onRemove: function (evt) {
      console.log('onRemove.foo:', [evt.item, evt.from])
    },
    onStart:function(evt) {
      console.log('onStart.foo:', [evt.item, evt.from])
    },
    onSort:function(evt) {
      console.log('onStart.foo:', [evt.item, evt.from])
    },
    onEnd: function(evt) {
      console.log('onEnd.foo:', [evt.item, evt.from])
    }
  })

  // List B
  $('#bar').sortable({
    group: 'words',
    animation: 150,
    onAdd: function (evt) {
      console.log('onAdd.bar:', evt.item)
    },
    onUpdate: function (evt) {
      console.log('onUpdate.bar:', evt.item)
    },
    onRemove: function (evt) {
      console.log('onRemove.bar:', evt.item)
    },
    onStart:function(evt) {
      console.log('onStart.foo:', evt.item)
    },
    onEnd: function(evt) {
      console.log('onEnd.foo:', evt.item)
    }
  })

  // sortable nav
  $('#sortable-nav').sortable()

  // Editable list
  var editableList = $('#editable').sortable({
    animation: 150,
    filter: '.js-remove',
    onFilter: function (e, data) {
      $(e.item).fadeOut(300, function() {
        $(this).remove()
      })
    }
  })
  $('#addTodo').on('click', function () {
    swal({
      customClass: 'vision',
      title: 'Add a todo',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      animation: 'slide-from-top',
      inputPlaceholder: 'Todo',
    }, function (inputValue) {
      if (inputValue === false) return false
      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return false
      }
      var $el = $('<li>')
      $el.addClass('list-group-item animated fadeIn')
      $el.html(inputValue + '<button type="button" class="close js-remove" aria-label="remove todo">&times;</button>')
      $el.appendTo('#editable')
      $el.one(vision.whichAnimationEvent(), function () {
        $(this).removeClass('animated fadeIn')
      })
      swal.close()
    })
  })

  // 'handle' option
  $('#drag-handle').sortable({
    handle: '.sortable-handle',
    animation: 150
  })

  // Advanced groups
  var groups = [{
    name: 'advanced',
    pull: true,
    put: true
  }, {
    name: 'advanced',
    pull: 'clone',
    put: false
  }, {
    name: 'advanced',
    pull: false,
    put: true
  }]
  $.each(groups, function (i, groupOpts) {
    $('#advanced-' + (i + 1)).sortable({
      sort: (i != 1),
      group: groupOpts,
      animation: 150
    })
  })
})