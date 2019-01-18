$(document).ready(function () {
  // toastr config
  toastr.options = {
    closeButton: true,
    positionClass: 'toast-bottom-center',
    showMethod: 'slideDown'
  }

  // jstree common config
  var typesJsTree3 = {
    "#" : {
      max_children : 1,
      max_depth : 4,
      valid_children: ['root']
    },
    'root': {
      icon: 'fa fa-hdd-o text-success',
      valid_children: ['default', 'file']
    },
    default : {
      icon: 'fa fa-folder text-success',
      valid_children : ['default','file']
    },
    file: {
      icon: 'fa fa-file-o',
      valid_children: []
    },
    text: {
      icon: 'fa fa-file-text-o',
      valid_children: []
    },
    word: {
      icon: 'fa fa-file-word-o',
      valid_children: []
    },
    excel: {
      icon: 'fa fa-file-excel-o',
      valid_children: []
    },
    ppt: {
      icon: 'fa fa-file-powerpoint-o',
      valid_children: []
    },
    pdf: {
      icon: 'fa fa-file-pdf-o',
      valid_children: []
    },
    archive: {
      icon: 'fa fa-file-archive-o',
      valid_children: []
    },
    image: {
      icon: 'fa fa-file-image-o',
      valid_children: []
    },
    audio: {
      icon: 'fa fa-file-audio-o',
      valid_children: []
    },
    video: {
      icon: 'fa fa-file-video-o',
      valid_children: []
    }
  }

  // jstree1
  $('#jstree1').jstree({
    plugins: ['types'],
    types: {
      root: {icon: 'fa fa-hdd-o text-warning'},
      folder: {icon: 'fa fa-folder text-warning'},
      file: {icon: 'fa fa-file-o', max_depth: 0},
      text: {icon: 'fa fa-file-text-o', max_depth: 0},
      word: {icon: 'fa fa-file-word-o', max_depth: 0},
      excel: {icon: 'fa fa-file-excel-o', max_depth: 0},
      ppt: {icon: 'fa fa-file-powerpoint-o', max_depth: 0},
      pdf: {icon: 'fa fa-file-pdf-o', max_depth: 0},
      archive: {icon: 'fa fa-file-archive-o', max_depth: 0},
      image: {icon: 'fa fa-file-image-o', max_depth: 0},
      audio: {icon: 'fa fa-file-audio-o', max_depth: 0},
      video: {icon: 'fa fa-file-video-o', max_depth: 0}
    }
  })

  // jstree2 - json data
  $('#jstree2').jstree({
    core: {
      data: [{
        text: 'Root',
        icon: 'fa fa-hdd-o text-primary',
        state: {opened: true},
        children: [{
          text: 'Directory',
          icon: 'fa fa-folder text-primary'
        }, {
          text: 'File unread',
          icon: 'fa fa-file-o'
        }, {
          text: 'Another directory',
          icon: 'fa fa-folder text-primary',
          state: {opened: true},
          children: [{
            text: 'File text',
            icon: 'fa fa-file-text-o'
          }, {
            text: 'File word',
            icon: 'fa fa-file-text-o'
          }, {
            text: 'File excel',
            icon: 'fa fa-file-excel-o'
          }, {
            text: 'File powerpoint',
            icon: 'fa fa-file-powerpoint-o',
            state: {disabled: true}
          }, {
            text: 'File pdf',
            icon: 'fa fa-file-pdf-o'
          }, {
            text: 'File archive',
            icon: 'fa fa-file-archive-o'
          }, {
            text: 'File image',
            icon: 'fa fa-file-image-o'
          }, {
            text: 'File audio',
            icon: 'fa fa-file-audio-o'
          }, {
            text: 'File video',
            icon: 'fa fa-file-video-o'
          }]
        }, {
          text: 'Something else',
          icon: 'fa fa-folder text-primary'
        }, {
          text: 'File unread',
          icon: 'fa fa-file-o'
        }]
      }]
    }
  })

  // jstree3 - ajax data
  $('#jstree3').jstree({
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })


  // jstree4 - event
  $('#jstree4')
    .on('changed.jstree', function (e, data) {
      toastr.success('The selected id is: ' + data.selected)
    })
    .jstree({
      core: {
        data: {
          url: vision.getAssetsPath() + 'pages/data/jstree.json',
          data: function (node) {
            return {id: node.id}
          }
        }
      }
    })


  // jstree5 - event
  $('#jstree5')
    .on('changed.jstree', function (e, data) {
      toastr.success('Newly selected: ' + data.changed.selected)
      // toastr.info('Newly deselected: ' + data.changed.deselected)
    })
    .jstree({
      plugins: ['changed'],
      core: {
        data: {
          url: vision.getAssetsPath() + 'pages/data/jstree2.json',
          data: function (node) {
            return {id: node.id}
          }
        }
      }
    })


  // jstree6 - checkbox
  $('#jstree6').jstree({
    plugins: ['checkbox'],
    checkbox: {
      'keep_selected_style': false
    },
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree2.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })


  // jstree7 - conditionalselect
  $('#jstree7').jstree({
    plugins: ['conditionalselect'],
    conditionalselect: function (node, event) {
      return false
    },
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree2.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })


  // jstree8 - contextmenu
  $('#jstree8').jstree({
    plugins: ['types', 'contextmenu'],
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree3.json',
        data: function (node) {
          return {id: node.id}
        }
      },
      check_callback: true
    },
    types: typesJsTree3
  })


  // jstree9 - dnd
  $('#jstree9').jstree({
    plugins: ['types', 'dnd'],
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree3.json',
        data: function (node) {
          return {id: node.id}
        }
      },
      check_callback: true
    },
    types: typesJsTree3
  })


  // jstree10 - massload
  $('#jstree10').jstree({
    plugins: ['massload', 'state'],
    massload: {
      url: vision.getAssetsPath() + 'pages/data/jstree2.json',
      data: function (nodes) {
        return {ids: nodes.join(',')}
      }
    },
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree2.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })


  // jstree11 - search
  $('#jstree11').jstree({
    plugins: ['search'],
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree2.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })
  var to = false
  $('#jstree11_q').on('keyup', function () {
    if (to) {
      clearTimeout(to)
    }
    to = setTimeout(function () {
      var v = $('#jstree11_q').val()
      $('#jstree11').jstree(true).search(v)
    }, 250)
  })


  // jstree12 - sort
  $('#jstree12').jstree({
    plugins: ['sort'],
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree2.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })


  // jstree13 - unique
  $('#jstree13').jstree({
    plugins: ['types', 'sort', 'unique', 'dnd'],
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree3.json',
        data: function (node) {
          return {id: node.id}
        }
      },
      check_callback: true
    },
    types: typesJsTree3
  })


  // jstree14 - wholerow
  $('#jstree14').jstree({
    plugins: ['wholerow'],
    core: {
      data: {
        url: vision.getAssetsPath() + 'pages/data/jstree2.json',
        data: function (node) {
          return {id: node.id}
        }
      }
    }
  })
})