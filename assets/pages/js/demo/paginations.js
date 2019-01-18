$(document).ready(function () {
  // demo 1
  $('#pagination-demo1').twbsPagination({
    totalPages: 35,
    visiblePages: 5,
    prev: 'Prev',
    onPageClick: function (event, page) {
      $('#pp').text('Page ' + page)
    }
  })
  // demo 2
  $('#pagination-demo2').twbsPagination({
    totalPages: 20,
    visiblePages: 5,
    first: false,
    last: false,
    prevClass: 'previous',
    prev: '<i class="icon fa fa-chevron-left"></i>Previous',
    next: 'Next<i class="icon fa fa-chevron-right"></i>',
    onPageClick: function (event, page) {
      $('#pp').text('Page ' + page)
    }
  })
  // demo 3
  $('#pagination-demo3').twbsPagination({
    totalPages: 20,
    visiblePages: 5,
    startPage: 19,
    first: false,
    last: false,
    prevClass: 'previous',
    prev: '<i class="fa fa-chevron-left"></i><span class="sr-only">Previous</span>',
    next: '<span class="sr-only">Next</span><i class="fa fa-chevron-right"></i>',
    onPageClick: function (event, page) {
      $('#pp').text('Page ' + page)
    }
  })
  // demo 4
  $('#pagination-demo4').twbsPagination({
    totalPages: 21,
    visiblePages: 5,
    startPage: 5,
    first: false,
    last: false,
    prevClass: 'previous',
    prev: '<i class="icon fa fa-chevron-left"></i>Prev',
    next: 'Next<i class="icon fa fa-chevron-right"></i>',
    onPageClick: function (event, page) {
      $('#pp').text('Page ' + page)
    }
  })
  // demo 5
  $('#pagination-demo5').twbsPagination({
    totalPages: 21,
    visiblePages: 5,
    startPage: 5,
    first: false,
    last: false,
    prevClass: 'previous',
    prev: '<i class="icon fa fa-chevron-left"></i>Prev',
    next: 'Next<i class="icon fa fa-chevron-right"></i>',
    onPageClick: function (event, page) {
      $('#pp').text('Page ' + page)
    }
  })
})