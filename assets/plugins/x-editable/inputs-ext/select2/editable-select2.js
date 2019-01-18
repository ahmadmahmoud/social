$(function () {
  'use strict';

  var Select4 = function (options) {
    this.init('select4', options, Select4.defaults);

    options.select2 = options.select2 || {};

    this.sourceData = null;

    //placeholder
    if (options.placeholder) {
      options.select2.placeholder = options.placeholder;
    }

    //if not `tags` mode, use source
    if (!options.select2.tags && options.source) {
      var source = options.source;
      //if source is function, call it (once!)
      if ($.isFunction(options.source)) {
        source = options.source.call(options.scope);
      }

      if (typeof source === 'string') {
        options.select2.ajax = options.select2.ajax || {};
        //some default ajax params
        if (!options.select2.ajax.data) {
          options.select2.ajax.data = function (term) {
            return { query: term }; };
        }
        if (!options.select2.ajax.results) {
          options.select2.ajax.results = function (data) {
            return { results: data }; };
        }
        options.select2.ajax.url = source;
      } else {
        //check format and convert x-editable format to select2 format (if needed)
        this.sourceData = this.convertSource(source);
        options.select2.data = this.sourceData;
      }
    }

    options.select2.minimumResultsForSearch = (options.minimumResultsForSearch) ? options.minimumResultsForSearch : Select4.defaults.minimumResultsForSearch;

    //overriding objects in config (as by default jQuery extend() is not recursive)
    this.options.select2 = $.extend({}, Select4.defaults.select2, options.select2);

    //detect whether it is multi-valued
    this.isMultiple = this.options.select2.tags || this.options.select2.multiple;
    this.isRemote = ('ajax' in this.options.select2);

    //store function returning ID of item
    //should be here as used inautotext for local source
    this.idFunc = this.options.select2.id;
    if (typeof(this.idFunc) !== ' function') {
      var idKey = this.idFunc || 'id';
      this.idFunc = function (e) {
        return e[idKey]; };
    }

    //store function that renders text in select2
    this.formatSelection = this.options.select2.formatSelection;
    if (typeof(this.formatSelection) !== ' function') {
      this.formatSelection = function (e) {
        return e.text; };
    }
  };

  //inherit from Abstract input
  $.fn.editableutils.inherit(Select4, $.fn.editabletypes.abstractinput);

  $.extend(Select4.prototype, {
    /**
    Renders input from tpl

    @method render()
    **/
    render: function () {
      this.setClass();

      //can not apply select2 here as it calls initSelection
      //over input that does not have correct value yet.
      //apply select2 only in value2input
      //this.$input.select2(this.options.select2);

      //when data is loaded via ajax, we need to know when it's done to populate listData
      if (this.isRemote) {
        //listen to loaded event to populate data
        this.$input.on('select2-loaded', $.proxy(function (e) {
          this.sourceData = e.items.results;
        }, this));
      }

      //trigger resize of editableform to re-position container in multi-valued mode
      if (this.isMultiple) {
        this.$input.on('change', function () {
          $(this).closest('form').parent().triggerHandler('resize');
        });
      }

      $(document).off('click.editable');
    },

    /**
    Default method to show value in element. Can be overwritten by display option.

    @method value2html(value, element)
    **/
    value2html: function (value, element) {
      var text = '',
        data,
        that = this,
        rowIndex;

      if (this.options.select2.tags) { //in tags mode just assign value
        data = value;
        //data = $.fn.editableutils.itemsByValue(value, this.options.select2.tags, this.idFunc);
      } else if (this.sourceData) {
        data = $.fn.editableutils.itemsByValue(value, this.sourceData, this.idFunc);
      } else {
        //can not get list of possible values
        //(e.g. autotext for select2 with ajax source)
      }

      //data may be array (when multiple values allowed)
      if ($.isArray(data)) {
        //collect selected data and show with separator
        text = [];
        $.each(data, function (k, v) {
          text.push(v && typeof v === 'object' ? that.formatSelection(v) : v);
        });
      } else if (data) {
        text = that.formatSelection(data);
      }

      text = $.isArray(text) ? text.join(this.options.viewseparator) : text;

      var rowIndex = $(element).closest('tr')[0].dataset.index,
        datatableId = $(element).closest('datatable').attr('id'),
        fieldId = $(element)[0].dataset.name,
        rowObj = $('#' + datatableId).find('.table').bootstrapTable('getData')[rowIndex];

      if (rowObj) {
        if (rowObj[fieldId]) {
          for (var dataKeys in rowObj) {
            if (dataKeys === fieldId && rowObj.source) {
              for (var keyVal in rowObj.source[fieldId]) {
                if (rowObj.source[fieldId][keyVal].id === rowObj[dataKeys]) {
                  text = rowObj.source[fieldId][keyVal].text;
                };
              }
            }
          }
        }
      }

      Select4.superclass.value2html.call(this, text, element);
    },

    html2value: function (html) {
      return this.options.select2.tags ? this.str2value(html, this.options.viewseparator) : null;
    },

    /**
    Gets value from element's html

    @method html2value(html)
    **/
    input2value: function () {
      return this.$input.select2('val');
    },

    /**
    Converts value to string.
    It is used in internal comparing (not for sending to server).

    @method value2str(value)
    **/

    value2str: function (value) {
      var str = '';
      if (value) {
        for (var k in value) {
          str = str + k + ':' + value[k] + ';';
        }
      }
      return str;
    },

    /*
    Converts string to value. Used for reading value from 'data-value' attribute.

    @method str2value(str)
    */
    str2value: function (str) {
      if (typeof str !== 'string' || !this.isMultiple) {
        return str;
      }

      separator = separator || this.getSeparator();

      var val, i, l;

      if (str === null || str.length < 1) {
        return null;
      }
      val = str.split(separator);
      for (i = 0, l = val.length; i < l; i = i + 1) {                 val[i] = $.trim(val[i]);             }            
      return val;        
    },
                                   /**         Sets value of input.         @method value2input(value)         @param {mixed} value         **/                 value2input: function (value) {             // if value array => join it anyway
      if ($.isArray(value)) {
        value = value.join(this.getSeparator());
      }

      //for remote source just set value, text is updated by initSelection
      if (!this.$input.data('select2')) {
        this.$input.val(value);

        var datatable = this.$input.closest('datatable'),
          tableEl = datatable.find('table'),
          rowIndex = this.$input.closest('tr')[0].dataset.index,
          rowObject = tableEl.bootstrapTable('getData')[rowIndex],
          fieldId = this.$input.closest('td').find('a')[0].dataset.name,
          maxTextLength = 0,
          textPxMultiplier = 12;

        for (var dataObj in this.options.source) {
          if (this.options.source[dataObj].id === value) {
            this.options.select2.data[dataObj].selected = true;
          } else {
            this.options.select2.data[dataObj].selected = false;
          }

          maxTextLength = (this.options.source[dataObj].text.length > maxTextLength) ? this.options.source[dataObj].text.length * textPxMultiplier : maxTextLength;
        }

        for (var rowKeys in rowObject) {
          if (rowKeys === 'source') {
            this.options.select2.data = rowObject[rowKeys][fieldId];

            for (var keyVals in rowObject[rowKeys][fieldId]) {
              if (rowObject[rowKeys][fieldId][keyVals].id === value) {
                this.options.select2.data[keyVals].selected = true;
              } else {
                this.options.select2.data[keyVals].selected = false;
              }
              maxTextLength = (rowObject[rowKeys][fieldId][keyVals].text.length > maxTextLength) ? rowObject[rowKeys][fieldId][keyVals].text.length * textPxMultiplier : maxTextLength;
            }
          }
        }

        this.$input.select2(this.options.select2);
        $('.select2', 'td').css('min-width', maxTextLength + 'px');
      } else {
        //second argument needed to separate initial change from user's click (for autosubmit)
        this.$input.val(value).trigger('change', true);

        //Uncaught Error: cannot call val() if initSelection() is not defined
        //this.$input.select2('val', value);
      }

      // if defined remote source AND no multiple mode AND no user's initSelection provided –>
      // we should somehow get text for provided id.
      // The solution is to use element's text as text for that id (exclude empty)
      if (this.isRemote && !this.isMultiple && !this.options.select2.initSelection) {
        // customId and customText are methods to extract `id` and `text` from data object
        // we can use this workaround only if user did not define these methods
        // otherwise we cant construct data object
        var customId = this.options.select2.id,
          customText = this.options.select2.formatSelection;

        if (!customId && !customText) {
          var $el = $(this.options.scope);
          if (!$el.data('editable').isEmpty) {
            var data = { id: value, text: $el.text() };
            this.$input.select2('data', data);
          }
        }
      }
    },

    getSeparator: function () {
      return this.options.select2.separator || $.fn.select2.defaults.separator;
    },

    /*
    Converts source from x-editable format: {value: 1, text: '1'} to
    select2 format: {id: 1, text: '1'}
    */
    convertSource: function (source) {
      if ($.isArray(source) && source.length && source[0].value !== undefined) {
        for (var i = 0; i < source.length; i++) {
          if (source[i].value !== undefined) {
            source[i].id = source[i].value;
            delete source[i].value;
          }
        }
      }
      return source;
    },

    destroy: function () {
      if (this.$input.data('select2')) {
        this.$input.select2('destroy');
      }
    },

    /**
    Attaches handler to submit form in case of 'showbuttons=false' mode

    @method autosubmit()
    **/
    autosubmit: function () {
      var thisExtension = this,
        table,
        tableId,
        rowIndex,
        fieldName,
        newValue;

      this.$input.on('change', function (e, isInitial) {
        table = $(this).closest('.table');
        tableId = $(this).closest('datatable').attr('id');
        rowIndex = $(this).closest('td')[0].dataset.index;
        fieldName = $(this).closest('td').find('a')[0].dataset.name;
        newValue = $(this).val();

        if (!isInitial) {
          $('#' + tableId).trigger('tableplugin:updateCell', [rowIndex, fieldName, newValue]);
        }
      });

      this.$input.on('select2:close', function (e) {
        table = $(this).closest('.table');
        tableId = $(this).closest('datatable').attr('id');
        rowIndex = $(this).closest('td')[0].dataset.index;
        fieldName = $(this).closest('td').find('a')[0].dataset.name;
        newValue = $(this).val();

        $('#' + tableId).trigger('tableplugin:updateCell', [rowIndex, fieldName, newValue]);
      });

      this.$input.on('select2:open', function (e) {
        thisExtension.$input.off('blur.select2');
      });

      this.$input.on('blur.select2', function (e) {
        table = $(this).closest('.table');
        tableId = $(this).closest('datatable').attr('id');
        rowIndex = $(this).closest('td')[0].dataset.index;
        fieldName = $(this).closest('td').find('a')[0].dataset.name;
        newValue = $(this).val();

        $('#' + tableId).trigger('tableplugin:updateCell', [rowIndex, fieldName, newValue]);
      });
    }
  });

  Select4.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
    tpl: '<select style="width:200px"></select>',
    source: 'Select4.source'
  });

  $.fn.editabletypes.select4 = Select4;
});
