$(document).ready(function () {
  var $states = $('#source-states')
  var statesOptions = $states.html()

  // append source states
  $('#chosen-basic-multiple').append(statesOptions)

  var config = {
    '#chosen-basic-single'     : {allow_single_deselect:true, width:'100%'},
    '#chosen-basic-multiple'   : {max_selected_options: 5, width:'100%'},
    '#chosen-select-no-single' : {disable_search_threshold:10, width:'100%'},
    '#chosen-select-no-results': {no_results_text:'Oops, nothing found!', width:'100%'}
  }
  for (var selector in config) {
    $(selector).chosen(config[selector])
  }
})