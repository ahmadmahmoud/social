$(document).ready(function () {
  // basic
  $('#wizard1').bootstrapWizard({
    tabClass: 'nav nav-tabs float-left',
    onTabShow: function(tab, navigation, index) {
      var $total = navigation.find('li').length
      var $currentLength = index + 1

      $('#wizard1 .next').show()
      $('#wizard1 .finish').hide()
      if ($total === $currentLength) {
        $('#wizard1 .finish').show()
        $('#wizard1 .next').hide()
      }
    }
  })
  $('#wizard1 .finish').click(function () {
    toastr.success('Finished!, Starting over!')
    $('#wizard1').find("a[href*='tab1']").trigger('click')
  })

  // tab bordered
  $('#wizard2').bootstrapWizard({
    tabClass: 'nav nav-tabs nav-tabs-bordered float-left',
    onTabShow: function(tab, navigation, index) {
      var $total = navigation.find('li').length
      var $currentLength = index + 1

      $('#wizard2 .next').show()
      $('#wizard2 .finish').hide()
      if ($total === $currentLength) {
        $('#wizard2 .finish').show()
        $('#wizard2 .next').hide()
      }
    }
  })
  $('#wizard2 .finish').click(function () {
    toastr.success('Finished!, Starting over!')
    $('#wizard2').find("a[href*='tab1']").trigger('click')
  })

  // Progress list
  $('#wizard3').bootstrapWizard({
    tabClass: 'nav nav-tabs nav-tabs-bordered float-left',
    'nextSelector': '.btn-next',
    'previousSelector': '.btn-previous',
    onTabShow: function(tab, navigation, index) {
      var $total = navigation.find('li').length
      var $currentLength = index + 1

      $('#wizard3 .btn-next').show()
      $('#wizard3 .btn-finish').hide()
      if ($total === $currentLength) {
        $('#wizard3 .btn-finish').show()
        $('#wizard3 .btn-next').hide()
      }

      // navigate progress list
      var $progressList = $('#wizard3 .progress-list')
      var indicator = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .9C5.9.9.9 5.9.9 12s5 11.1 11.1 11.1 11.1-5 11.1-11.1S18.1.9 12 .9zm6.2 8.3l-7.1 7.2c-.3.3-.7.3-1 0l-3.9-3.9c-.2-.3-.2-.8 0-1.1l1-1c.3-.2.8-.2 1.1 0l2 2.1c.2.2.5.2.7 0l5.2-5.3c.2-.3.7-.3 1 0l1 1c.3.2.3.7 0 1z"></path></svg>'
      $progressList.children('li').removeClass('active has-completed success')
      $progressList.children('li').eq(index).addClass('active')
      $progressList.children('li:lt('+ index +')').addClass('success has-completed')
      $progressList.children('li:gt('+ index +')').removeClass('success has-completed')
      // complete indicator
      $progressList.children('li').find('svg').remove()
      $progressList.children('li.has-completed').children('button').append(indicator)
    }
  })
  $('#wizard3 .btn-finish').click(function () {
    toastr.success('Finished!, Starting over!')
    $('#wizard3').find("a[href*='tab1']").trigger('click')
  })

  // Steps
  $('#wizard4').bootstrapWizard({
    tabClass: 'nav nav-tabs nav-tabs-bordered float-left',
    onTabShow: function(tab, navigation, index) {
      var $total = navigation.find('li').length
      var $currentLength = index + 1

      $('#wizard4 .next').show()
      $('#wizard4 .finish').hide()
      if ($total === $currentLength) {
        $('#wizard4 .finish').show()
        $('#wizard4 .next').hide()
      }

      // navigate steps
      var $steps = $('#wizard4-steps')
      $steps.children('li').removeClass('active success')
      $steps.children('li').eq(index).addClass('active')
      $steps.children('li:lt('+ index +')').addClass('success')
      $steps.children('li:gt('+ index +')').removeClass('success')
    }
  })
  $('#wizard4 .finish').click(function () {
    toastr.success('Finished!, Starting over!')
    $('#wizard4').find("a[href*='tab1']").trigger('click')
  })
})