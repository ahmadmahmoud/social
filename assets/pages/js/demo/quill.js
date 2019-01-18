$(document).ready(function () {
  var bubbleEditor = new Quill('#bubbleEditor', {
    bounds: '#bubbleEditor',
    modules: {
      'formula': true,
      'syntax': true
    },
    theme: 'bubble'
  })

  var snowEditor = new Quill('#snowEditor', {
    bounds: '#snowEditor',
    modules: {
      'formula': true,
      'syntax': true,
      'toolbar': '#snowToolbar'
    },
    theme: 'snow'
  })

  var fullEditor = new Quill('#fullEditor', {
    bounds: '#fullEditor',
    placeholder: 'Compose an epic...',
    modules: {
      'formula': true,
      'syntax': true,
      'toolbar': [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
      ],
    },
    theme: 'snow'
  })
  $('#frm-fullEditor').on('submit', function () {
    // Populate hidden form on submit
    var contents = JSON.stringify(fullEditor.getContents())
    $('[name="inputFullEditor1"]').val(contents)
    console.log('Submitted', $(this).serialize(), $(this).serializeArray())
    // No back end to actually submit to!
    toastr.info('Open the console to see the submit data!')
    return false
  })

  // copy content
  var initialContent = bubbleEditor.getContents();
  snowEditor.setContents(initialContent);
  fullEditor.setContents(initialContent);
})