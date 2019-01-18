$(document).ready(function () {
  // basic
  $('#basic').summernote({
    placeholder: 'Write here...'
  })

  // air mode on
  $('#airMode').summernote({
    airMode: true
  })

  // click to edit
  var edit = function() {
    $('#click2edit').summernote({focus: true})
  }
  var save = function() {
    var makrup = $('#click2edit').summernote('code')
    $('#click2edit').summernote('destroy')
  }

  $('#edit').on('click', function () {
    edit()
    // toggle buttons
    $(this).hide()
    $('#save').show()
  })
  $('#save').on('click', function () {
    save()
    // toggle buttons
    $(this).hide()
    $('#edit').show()
  })

  // codemirror
  $('#codemirror').summernote({
    height: 200,
    codemirror: { // codemirror options
      mode: 'text/html',
      htmlMode: true,
      lineNumbers: true,
      theme: 'dracula'
    }
  })

  // Hint for words
  $('#hint-for-words').summernote({
    height: 100,
    toolbar: false,
    placeholder: 'Type with apple, orange, watermelon, lemon',
    hint: {
      words: ['apple', 'orange', 'watermelon', 'lemon'],
      match: /\b(\w{1,})$/,
      search: function (keyword, callback) {
        callback($.grep(this.words, function (item) {
          return item.indexOf(keyword) === 0
        }))
      }
    }
  })

  // Hint for emoji
  $.ajax({
    url: 'https://api.github.com/emojis'
  }).then(function(data) {
    window.emojis = Object.keys(data)
    window.emojiUrls = data
  })
  $('#hint-for-emoji').summernote({
    height: 100,
    toolbar: false,
    placeholder: 'type starting with : and any alphabet',
    hint: {
      match: /\B:([\-+\w]+)$/,
      search: function (keyword, callback) {
        callback($.grep(emojis, function (item) {
          return item.indexOf(keyword)  === 0
        }))
      },
      template: function (item) {
        var content = emojiUrls[item]
        return '<img src="' + content + '" width="20" /> :' + item + ':'
      },
      content: function (item) {
        var url = emojiUrls[item]
        if (url) {
          return $('<img />').attr('src', url).css('width', 20)[0]
        }
        return ''
      }
    }
  })

  // Hint for mention
  $('#hint-for-mention').summernote({
    height: 100,
    toolbar: false,
    placeholder: 'type starting with @',
    hint: {
      mentions: ['jayden', 'sam', 'alvin', 'david'],
      match: /@(\w*)$/,
      search: function (keyword, callback) {
        callback($.grep(this.mentions, function (item) {
          return item.indexOf(keyword) == 0
        }))
      },
      content: function (item) {
        return '@' + item
      }
    }
  })
})