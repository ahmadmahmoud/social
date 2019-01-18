$(document).ready(function () {
  var $table = $('#table')
  var $remove = $('#remove')
  var selections = []

  $.fn.bootstrapTable.defaults.icons = {
    paginationSwitchDown: 'fa-caret-square-o-down',
    paginationSwitchUp: 'fa fa-caret-square-o-up',
    refresh: 'fa-refresh',
    toggle: 'fa-list-alt',
    columns: 'fa-th',
    detailOpen: 'fa-plus',
    detailClose: 'fa-minus'
  }

  function getIdSelections () {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id
    })
  }

  function responseHandler (res) {
    $.each(res.rows, function (i, row) {
      row.state = $.inArray(row.id, selections) !== -1
    })
    return res
  }

  function detailFormatter (index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

  function operateFormatter (value, row, index) {
    return [
      '<div class="table-tools">',
        '<ul class="nav nav-inline">',
          '<li>',
            '<a class="like" href="javascript:void(0)" title="Like"><i class="fa fa-heart"></i></a>',
          '</li>',
          '<li class="dropdown">',
            '<a class="remove" href="javascript:void(0)" title="Remove"><i class="fa fa-times"></i></a>',
          '</li>',
        '</ul>',
      '</div>'
    ].join('')
  }


  window.operateEvents = {
    'click .like': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
      $table.bootstrapTable('remove', {
        field: 'id',
        values: [row.id]
      })
    }
  }

  function totalTextFormatter (data) {
    return 'Total'
  }

  function totalNameFormatter (data) {
    return data.length
  }

  function totalPriceFormatter (data) {
    var total = 0
    $.each(data, function (i, row) {
      total += +(row.price.substring(1))
    })
    return '$' + total
  }

  $table.bootstrapTable({
    iconsPrefix: 'fa',
    url: 'http://issues.wenzhixin.net.cn/examples/bootstrap_table/data',
    sidePagination: 'server',
    toolbar: '#toolbar',
    search: true,
    showRefresh: true,
    showToggle: true,
    showColumns: true,
    showExport: true,
    detailView: true,
    detailFormatter: detailFormatter,
    minimumCountColumns: 2,
    showPaginationSwitch: true,
    pagination: true,
    paginationPreText: '<i class="fa fa-chevron-left"></i>',
    paginationNextText: '<i class="fa fa-chevron-right"></i>',
    idField: 'id',
    pageList: '[10, 25, 50, 100, ALL]',
    showFooter: false,
    responseHandler: responseHandler,
    columns: [
      [{
        field: 'state',
        checkbox: true,
        rowspan: 2,
        align: 'center',
        valign: 'middle'
      }, {
        title: 'Item ID',
        field: 'id',
        rowspan: 2,
        align: 'center',
        valign: 'middle',
        sortable: true,
        footerFormatter: totalTextFormatter
      }, {
        title: 'Item Detail',
        colspan: 3,
        align: 'center'
      }],
      [{
        field: 'name',
        title: 'Item Name',
        sortable: true,
        editable: true,
        footerFormatter: totalNameFormatter,
        align: 'center'
      }, {
        field: 'price',
        title: 'Item Price',
        sortable: true,
        align: 'center',
        editable: {
          type: 'text',
          title: 'Item Price',
          validate: function (value) {
            value = $.trim(value)
            if (!value) {
              return 'This field is required'
            }
            if (!/^\$/.test(value)) {
              return 'This field needs to start width $.'
            }
            var data = $table.bootstrapTable('getData')
            var index = $(this).parents('tr').data('index')
            console.log(data[index])
            return ''
          }
        },
        footerFormatter: totalPriceFormatter
      }, {
        field: 'operate',
        title: 'Item Operate',
        width: '120px',
        align: 'center',
        events: operateEvents,
        formatter: operateFormatter
      }]
    ]
  })
  // sometimes footer render error.
  setTimeout(function () {
    $table.bootstrapTable('resetView')
  }, 200)
  $table.on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table',
    function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

      // save your data, here just save the current page
      selections = getIdSelections()
      // push or splice the selections if you want to save all data selections
    })
  $table.on('expand-row.bs.table', function (e, index, row, $detail) {
    if (index % 2 == 1) {
      $detail.html('Loading from ajax request...')
      $.get('assets/pages/data/bootstrap-table-license.txt', function (res) {
        $detail.html(res.replace(/\n/g, '<br>'))
      })
    }
  })
  $table.on('all.bs.table', function (e, name, args) {
    console.log(name, args)
  })
  $remove.click(function () {
    var ids = getIdSelections()
    $table.bootstrapTable('remove', {
      field: 'id',
      values: ids
    })
    $remove.prop('disabled', true)
  })
  $(window).resize(function () {
    $table.bootstrapTable('resetView')
  })

})