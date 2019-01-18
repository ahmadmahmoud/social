/**
 * Drawerjs jquery bridge
 * jQuery prototypal inheritance plugin for drawerjs.
 * This is just a bridge plugin. So, we must load both drawerjs.js and drawerjs.jquery.js file.
 *
 * @version 1.0.0
 * @author Beni Arisandi <bent10@stilearning.com>
 * @copyright Stilearning 2017
 *
 * @example
 * // We could now essentially do this:
 * $(selector).drawerjs(holder);
 * // or with options
 * $(selector).drawerjs(holder, options);
 *
 * @example
 * // and at this point we could do the following
 * $('#drawer').drawerjs('#holder');
 * // then get the instance object
 * var inst = $('#drawer').data('drawerjs');
 * // now we can access all drawerjs methods from instance variable
 * inst.align('right');
 *
 * http://stilearning.com/drawerjs
 */
;(function($, window, document, undefined) {

  'use strict';
  // plugin name
  var pluginName = 'drawerjs';

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(holder, options) {
    return this.each(function() {
      options = options || {};
      options.selector = this;
      options.holder = holder;

      if(!$.data(this, pluginName)) {
        $.data(this, pluginName, new Drawerjs(options));
      }
    });
  };
})(jQuery, window, document);