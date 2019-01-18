$(document).ready(function () {
  var $states = $('#source-states')
  var statesOptions = $states.html()

  // responsive setting
  $.fn.select2.defaults.set('width', '100%')

  // Single select boxes
  $('#select2-basic-single').append(statesOptions)
  $('#select2-basic-single').select2({
    placeholder: 'Select a state',
    allowClear: true
  })

  // Multiple select boxes
  $('#select2-basic-multiple').append(statesOptions)
  $('#select2-basic-multiple').select2({
    placeholder: 'Select a state',
    maximumSelectionLength: 4
  })

  // Loading array data
  var data = [
    {id: 0, text: 'enhancement'},
    {id: 1, text: 'bug'},
    {id: 2, text: 'duplicate'},
    {id: 3, text: 'invalid'},
    {id: 4, text: 'wontfix'}
  ]
  $('#select2-data-array').select2({
    data: data,
    minimumResultsForSearch: Infinity
  })

  // Loading array remote
  var formatRepo = function (repo) {
    if (repo.loading) return repo.text;

    var markup = '<div class="media">' +
      '<div class="media-left"><img class="avatar avatar-md" src="' + repo.owner.avatar_url + '" /></div>' +
      '<div class="media-right">' +
      '<h6 class="my-0">' + repo.full_name + '</h6>'

    if (repo.description) {
      markup += '<small class="text-muted">' + repo.description + '</small>'
    }

    markup += '<ul class="list-inline text-muted">' +
      '<li><small><i class="fa fa-flash"></i> ' + repo.forks_count + ' Forks</small></li>' +
      '<li><small><i class="fa fa-star"></i> ' + repo.stargazers_count + ' Stars</small></li>' +
      '<li><small><i class="fa fa-eye"></i> ' + repo.watchers_count + ' Watchers</small></li>' +
    '</ul>' +
    '</div></div>'

    return markup
  }
  var formatRepoSelection = function (repo) {
    return repo.full_name || repo.text
  }

  $('#select2-data-remote').select2({
    ajax: {
      url: 'https://api.github.com/search/repositories',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page
        }
      },
      processResults: function (data, params) {
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1

        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        }
      },
      cache: true
    },
    escapeMarkup: function (markup) { return markup },
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
  })

  // Tagging
  $('#select2-tagging').select2({
    tags: ['red', 'blue', 'green'],
    tokenSeparators: [',', ' ']
  })

  // Disabled mode
  $('#select2-disabled-mode1, #select2-disabled-mode2').select2({
    placeholder: 'Select a state'
  })
})