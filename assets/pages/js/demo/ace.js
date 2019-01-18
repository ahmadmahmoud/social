$(document).ready(function () {
  var editor1 = ace.edit('editor1')
  var StatusBar = ace.require('ace/ext/statusbar').StatusBar
  // create a simple selection status indicator
  var statusBar = new StatusBar(editor1, document.getElementById('statusBar'))
  editor1.setTheme('ace/theme/pastel_on_dark')
  editor1.session.setMode('ace/mode/javascript')
  editor1.setAutoScrollEditorIntoView(true)
  // editor1.setOption('maxLines', 30)
  editor1.setFontSize('16px')


  // update container on panel toggle expand
  $(document).on('click', '[data-panel="expand"]', function () {
    editor1.resize()
    // toggle body overflow
    var panel = $(this).parents('.panel').data()
    if (panel.expand) {
      $('body').css('overflow-y', 'hidden')
    } else {
      $('body').css('overflow-y', '')
    }
  })
})