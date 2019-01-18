$(document).ready(function () {
  // Demo 1
  new SimpleMDE({
    element: $('#demo1')[0],
    spellChecker: false
  })

  // Demo 3
  new SimpleMDE({
    element: $('#demo2')[0],
    spellChecker: false,
    autosave: {
      enabled: true,
      unique_id: 'SimpleMDEDemo2',
    },
  });

  // Demo 3
  new SimpleMDE({
    element: $('#demo3')[0],
    status: false,
    toolbar: false,
  });
})