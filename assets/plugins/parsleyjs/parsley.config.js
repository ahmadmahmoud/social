// Parsley custom config
window.ParsleyConfig = {
  errorClass: 'has-error',
  successClass: 'has-success',
  classHandler: function (ParsleyField) {
    var isHorizontalForm = ParsleyField.$element.parents('form').hasClass('form-horizontal')
    var parentTarget = isHorizontalForm ? '[class^="col-"]' : '.form-group'
    return ParsleyField.$element.parents(parentTarget)
  },
  errorsContainer: function (ParsleyField) {
    var isHorizontalForm = ParsleyField.$element.parents('form').hasClass('form-horizontal')
    var parentTarget = isHorizontalForm ? '[class^="col-"]' : '.form-group'
    return ParsleyField.$element.parents(parentTarget)
  },
  errorsWrapper: '<p class="help-block">',
  errorTemplate: '<em></em>'
}