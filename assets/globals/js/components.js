var Components = (function () {
'use strict';

var bs = function () {
  var debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) { func.apply(context, args); }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) { func.apply(context, args); }
    }
  };

  // init bootstrap components
  // tooltip
  $('[data-toggle="tooltip"], [data-toggle="tooltip-top"]').tooltip({
    trigger: 'hover'
  });
  $('[data-toggle="tooltip-right"]').tooltip({
    placement: 'right',
    trigger: 'hover'
  });
  $('[data-toggle="tooltip-bottom"]').tooltip({
    placement: 'bottom',
    trigger: 'hover'
  });
  $('[data-toggle="tooltip-left"]').tooltip({
    placement: 'left',
    trigger: 'hover'
  });
  // Trigger on other element
  $('[data-toggle^="tooltip"][data-trigger-input]').each( function(){
    var $tip = $(this);
    var data = $tip.data();
    var target = data.triggerInput;

    $(document).on('focus', target, function () {
      $tip.tooltip('show');
    })
    .on('focusout', target, function () {
      $tip.tooltip('hide');
    });
  });

  // popover
  $('[data-toggle="popover"], [data-toggle="popover-top"]').popover({
    placement: 'top'
  });
  $('[data-toggle="popover-right"]').popover({
    placement: 'right'
  });
  $('[data-toggle="popover-bottom"]').popover({
    placement: 'bottom'
  });
  $('[data-toggle="popover-left"]').popover({
    placement: 'left'
  });
  // Trigger on other element
  $('[data-toggle^="popover"][data-trigger-input]').each( function(){
    var $pop = $(this);
    var data = $pop.data();
    var target = data.triggerInput;

    $(document).on('focus', target, function () {
      $pop.popover('show');
    })
    .on('focusout', target, function () {
      $pop.popover('hide');
    });
  });

  // alternative selector for button state
  $(document).on('click', '.btn-toggleable', function () {
    $(this).toggleClass('active', !$(this).hasClass('active'));
  });

  // enable affix for .content-side if exist
  if ($('.content-side-affix').length) {
    $('.content-side-affix').affix({
      offset: {
        top: $('.content-side-affix').offset().top,
        bottom: 0
      }
    });
    // update affix offset
    $(window).on('resize', debounce(function () {
      $('.content-side-affix').data('bs.affix').options.offset.top = $('.content-side-affix').offset().top;
    }, 500));
  }

  // enable bootstrap scrollspy to document body
  $('body').scrollspy({
    target: '#content-scrollspy-nav'
  });

  // custom input-group component
  $(document).on('focus blur', '.input-group > .form-control', function (e) {
    var $inputGroup = $(this).parent();
    var hasAddon = $inputGroup.children('.input-group-addon').length > 0;

    $inputGroup.removeClass('focusin');
    if (hasAddon && (e.type === 'focusin')) { $inputGroup.addClass('focusin'); }
  })
  // custom input file component
  .on('change', '.custom-file > input[type="file"]', function () {
    var files = this.files;
    var $fileControl = $(this).next('.custom-file-control');

    $fileControl.text(files.length + ' files selected');
    if (files.length <= 2) {
      var fileNames = [];
      for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      $fileControl.text(fileNames.join(', '));
    }
  })
  // input has clearable
  .on('keyup', '.has-clearable > .form-control', function () {
    var val = $(this).val();
    var clearable = $(this).parent().children('.btn-clearable');
    if (val === '') {
      clearable.fadeOut();
    } else {
      clearable.fadeIn();
    }
  })
  .on('click', '.has-clearable > .btn-clearable', function () {
    var input = $(this).parent().children('.form-control');
    var clearable = $(this).parent().children('.btn-clearable');
    input
      .val('')
      .focus();
    clearable.fadeOut();
  });


  // nav responsive with drop-off
  var handleDropOff = function (selector) {
    $(selector).each(function () {
      var $el = $(this);
      var $more = $el.children('li.more');
      var $notMore = $el.children('li:not(.more)');
      var $dropdown = $more.children('.dropdown-menu');
      var $dropdownItems = $dropdown.children('li');
      var navwidth = 0;
      var morewidth = $more.outerWidth(true);
      var availablespace = $el.outerWidth(true) - morewidth;
      $notMore.each(function () {
        navwidth += $(this).outerWidth(true);
      });
      if ($el.hasClass('nav-dropoff-wrapped')) {
        // get wrapper width but exclude padding & margin
        var wrapperWidth = $el.parent().width() - morewidth;
        var elWidth = $el.outerWidth(true);
        var $notEl = $el.parent().children().not(selector);
        navwidth = elWidth - morewidth;
        $notEl.each(function () {
          navwidth += $(this).outerWidth(true);
        });
        navwidth = navwidth;
        availablespace = wrapperWidth;
      }

      if (navwidth > availablespace) {
        var lastItem = $notMore.last();
        lastItem.attr('data-width', lastItem.outerWidth(true));
        lastItem.prependTo($dropdown);

        // prevent prepend if all nav-item has droped
        if ($notMore.length) {
          handleDropOff(this);
        }
      } else {
        var firstMoreElement = $dropdownItems.first();
        if (navwidth + firstMoreElement.data('width') < availablespace) {
          firstMoreElement.insertBefore($more);
        }
      }

      if ($dropdown.children('li').length > 0) {
        $more.css('display','inline-block');
        // handle active state
        var hasActive = $dropdown.has('li.active').length > 0;
        $more.toggleClass('active', hasActive);
      } else {
        $more.css('display','none');
      }
    });
  };
  if ($('.nav-dropoff').length) {
    var moreTpl = $('<li role="presentation" class="more float-right dropdown">' +
      '<a href="#" data-toggle="dropdown">' +
        'More <i class="fa fa-caret-down"></i>' +
      '</a>' +
      '<ul class="dropdown-menu dropdown-menu-right"></ul>' +
    '</li>');

    $('.nav-dropoff').append(moreTpl);

    // respon to window resize
    $(window).on('resize load', function () {
      handleDropOff('.nav-dropoff');
    });
    // respon to app drawer
    $('.app-drawer').on('drawer:open drawer:close drawer:compact', function () {
      handleDropOff('.nav-dropoff');
    });
    // respon to modal
    $('.modal').on('shown.bs.modal', function () {
      handleDropOff('.nav-dropoff');
    });
  }
};

var panelTools = function () {
  // collapse
  var collapseIn = function ($panel, duration) {
    var items = $panel.children().not('.panel-heading');

    items.slideUp(300, function () {
      $(this).addClass('has-collapsed');
      $panel.addClass('panel-collapsed')
        .data('collapsed', true);
    });
  };
  var collapseOut = function ($panel) {
    var items = $panel.children().not('.panel-heading');

    items.slideDown(300, function () {
      $(this).removeClass('has-collapsed');
      $panel.removeClass('panel-collapsed')
        .data('collapsed', false);
    });
  };

  // expand
  var expandIn = function ($panel) {
    var hasExpand = $panel.data('expand');
    var hasCollapse = $panel.data('collapsed');

    if (!hasExpand) {
      $('body')
        .addClass('has-panel-expanded');
      $panel
        .addClass('panel-expanded')
        .data('expand', true);

      addOverlay($panel);

      if (hasCollapse) {
        collapseOut($panel);
      }
    }
  };
  var expandOut = function ($panel) {
    $('body')
      .removeClass('has-panel-expanded');
    $panel
      .removeClass('panel-expanded')
      .data('expand', false);

    removeOverlay();
  };
  var addOverlay = function ($panel) {
    if ($panel.length && !$panel.parent().hasClass('modal')) {
      $('body').append('<div class="panel-expanded-overlay">');
    }
  };
  var removeOverlay = function () {
    $('.panel-expanded-overlay').remove();
  };

  // initialize
  var initPanelTools = function () {
    // collapse on load
    collapseIn($('.panel-collapsed'));
    // expand on load
    expandIn($('.panel-expanded'));
  };
  initPanelTools();

  // handle trigger
  $(document)
  // trigger close
  .on('click', '[data-panel="close"]', function (e) {
    e.preventDefault();

    var $panel = $(this).closest('.panel');
    // close panel
    $panel.fadeOut(300, function () {
      $(this).addClass('panel-closed');
    });
    // remove expand class form body
    $('body').removeClass('has-panel-expanded');
    // remove overlay if exist
    removeOverlay();
    // exit fullscreen if any
    if (window.screenfull && screenfull.isFullscreen) { screenfull.exit(); }
  })
  // trigger restore
  .on('click', '[data-panel="restoreClosed"]', function (e) {
    e.preventDefault();

    $('.panel-closed')
      .removeClass('panel-closed')
      .fadeIn();
  })
  // trigger collapse
  .on('click', '[data-panel="collapse"]', function (e) {
    e.preventDefault();

    var $panel = $(this).closest('.panel');
    var hasCollapse = $panel.data('collapsed');

    if (hasCollapse) {
      collapseOut($panel);
    } else {
      collapseIn($panel);
    }
  })
  // trigger fullscreen
  .on('click', '[data-panel="fullscreen"]', function (e) {
    e.preventDefault();
    if (!window.screenfull) {
      return
    }

    var $panel = $(this).closest('.panel');
    $panel.toggleClass('panel-fullscreen')
      .data('fullscreen', $panel.hasClass('panel-fullscreen'));

    // toggle screenfull
    if (screenfull.enabled) {
      screenfull.toggle($panel[0]);
    }
    // force expand in/out
    if (screenfull.isFullscreen && !$panel.data('expand')) {
      expandIn($panel);
    } else if (!screenfull.isFullscreen && $panel.data('expand')) {
      expandOut($panel);
    }
    // force uncollapse
    if (screenfull.isFullscreen) {
      collapseOut($panel);
    }
  })
  // trigger expand
  .on('click', '[data-panel="expand"]', function (e) {
    e.preventDefault();

    var $panel = $(this).closest('.panel');
    if ($panel.data('expand')) {
      if (window.screenfull && !screenfull.isFullscreen) {
        expandOut($panel);
      }
    } else {
      expandIn($panel);
    }
  })
  // trigger refresh
  .on('click', '[data-panel="refresh"]', function (e) {
    e.preventDefault();

    var panel = $(this).closest('.panel')[0];
    var opts = $(this).data();
    opts.scale = opts.scale || .65;
    var loading = visionComponents.loading(panel, opts);

    $(panel).trigger('loading', [panel, loading]);
  });
};

var svgInliner = function () {
  // convert img src to inline svg
  $('.svg-loader > img').each(function () {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
};

var filterable = function () {
  var filterable = function (container, text) {
    var $elems = $(container).children();

    $elems.show();
    if (text !== '') {
      $elems.filter(function (i, elem) {
        // return not contains text
        return $(elem).text().toUpperCase().indexOf(text.toUpperCase()) < 0
      }).hide();
    }
  };

  // filter by text
  $(document).on('focus', '[data-filter]', function (e) {
    e.stopPropagation();
  })
  .on('keyup focus', '[data-filter]', function (e) {
    var container = $(this).attr('data-filter');
    var text = $(this).val();

    filterable(container, text);
  });
};

var selectable = function () {
  var selectable = function (elem, classes) {
    var $elem = $(elem);
    var isRadio = $elem.parent().is('[data-selectable-radio]');
    if (isRadio) {
      $elem.parent().children('.selectable-item').removeClass(classes);
    }

    $elem.toggleClass(classes)
      .prop('selected', $elem.hasClass(classes));
  };

  // keyboard navigations
  var selectableKeyNav = function (e, elem) {
    var $elem = $(elem);
    var target = '.selectable-item:not(":hidden")';

    if (!$elem.is(':last-child')) {
      e.preventDefault();
    }

    if (e.which === 38 && $elem.prevAll(target).length) {
      if ($elem.is('a') || $elem.is('label') || $elem.is('button') || $elem.is('[tabindex]')) {
        $elem.prevAll(target)[0].focus();
      } else {
        $($elem.prevAll(target)[0]).children()[0].focus();
      }
    } else if ((e.which === 40 || e.which === 9) && $elem.nextAll(target).length) {
      if ($elem.is('a') || $elem.is('label') || $elem.is('button') || $elem.is('[tabindex]')) {
        $elem.nextAll(target)[0].focus();
      } else {
        $($elem.nextAll(target)[0]).children('a')[0].focus();
      }
    }
  };

  // initialize selectable list elements
  $('[data-selectable]').each(function (i) {
    var classes = $(this).data('selectable') || 'selected';

    if ($(this).is('[data-selectable-radio]')) {
      var selected;
      $(this).children('.selectable-item').each(function () {
        if ($(this).hasClass(classes)) {
          selected = $(this);
        }
      });
      $(this).children('.selectable-item').removeClass(classes);
      $(selected).addClass(classes);
    }

    $(this).children('.selectable-item').each(function () {
      $(this).prop('selected', $(this).hasClass(classes));
    });
  });

  $('.selectable-item input, .selectable-item .custom-control').on('click', function (e) {
    e.stopPropagation();
  });

  // trigger selectable
  $(document).on('click keydown', '[data-selectable] > .selectable-item', function (e) {
    var elem = this;
    var classes = $(elem).parent().data('selectable') || 'selected';

    // fire selectable onclick/enter or keypress spacebar
    if (e.type === 'click') {
      e.preventDefault();
      e.stopPropagation();
      selectable(elem, classes);
    }
    if (e.which === 13 || e.which === 32) {
      $(elem).trigger('click');
    }

    // keyboard navigations
    selectableKeyNav(e, elem);
  });
};

var autosizejs = function () {
  if (!window.autosize) {
    return
  }
  autosize($('.autosize'));
};

var clipboard = function () {
  if (!window.Clipboard) {
    return
  }
  // initialize clipboard
  var clipboards = new Clipboard('[data-toggle="clipboard"]');
  // create clipboard tooltip
  var clipboardTooltip = function (elem, msg) {
    $(elem).tooltip({
      title: msg,
      placement: 'bottom',
      container: 'body'
    })
    .tooltip('show');
  };
  // create clipboard fallback
  var clipboardFallbackMsg = function (action) {
    var actionKey = action === 'cut' ? 'X' : 'C';
    var actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
      actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    }
    return actionMsg
  };

  $('body').on('mouseleave', '[data-toggle="clipboard"]', function () {
    $(this).tooltip('destroy');
  })
  .on('click', '[data-toggle="clipboard"]', function (e) {
    e.preventDefault();
  });

  // listen from clipboard events
  clipboards.on('success', function (e) {
    e.clearSelection();
    var msg = (e.action === 'copy') ? 'Copied!' : 'Cutted!';
    clipboardTooltip(e.trigger, msg);
  });
  clipboards.on('error', function (e) {
    clipboardTooltip(e.trigger, clipboardFallbackMsg(e.action));
  });
};

var dragable = function () {
  if (!window.dragula) {
    return
  }

  // group containers
  var groups = {};

  // split single and group container
  $('[data-toggle="dragable"]').each(function () {
    var hasGroup = $(this).is('[data-drag-group]');

    if (hasGroup) {
      var groupName = $(this).data('dragGroup');
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(this);
    } else {
      var $data = $(this).data();
      // init single container
      var drake = dragula([this], {
        moves: function (el, container, handle) {
          var handler = $(container).data('dragHandler');
          var triggerHanlder = handler ? $(handle).is(handler) : true;
          return triggerHanlder
        },
        direction: $data.direction || 'vertical',
        copy: $data.copy || false,
        copySortSource: $data.copySortSource || false,
        revertOnSpill: $data.revertOnSpill || false,
        removeOnSpill: $data.removeOnSpill || false
      });
      // attach return object to container
      $(this).data('dragable', drake);
    }
  });

  $.each(groups, function (i, containers) {
    var $data = $(containers[0]).data();
    // init group container
    var drake = dragula(containers, {
      moves: function (el, container, handle) {
        var handler = $(container).data('dragHandler');
        var triggerHanlder = handler ? $(handle).is(handler) : true;
        return triggerHanlder
      },
      direction: $data.direction || 'vertical',
      copy: $data.copy || false,
      copySortSource: $data.copySortSource || false,
      revertOnSpill: $data.revertOnSpill || false,
      removeOnSpill: $data.removeOnSpill || false
    });
    // attach return object to containers
    $(containers).data('dragable', drake);
  });

  // prevent default document scroll on mobile
  // detect device by userAgent
  var isMobile = function () {
    // device detection
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4)))
  };
  // temporary remove scroll until dragend on touch devices
  if (isMobile()) {
    var drake = $('[data-toggle="dragable"]').data('dragable');
    if (drake) {
      drake.on('drag dragend', function (e) {
        $('body').toggleClass('overflow-hidden', e.type === 'drag');
      });
    }
  }

  // additional support for autoscroller
  if (!window.autoScroll) {
    return
  }
  $('[data-toggle="dragable"][data-drag-scroll-parent]').each(function () {
    var $this = $(this);
    var scrollParent = $(this).data('dragScrollParent') || document.body;
    var scrollParentEl = $(this).closest(scrollParent)[0];

    autoScroll([scrollParentEl], {
      margin: 20,
      pixels: 20,
      scrollWhenOutside: false,
      autoScroll: function () {
        return this.down && $this.data('dragable').dragging
      }
    });
  });
};

var loaders = function (el, options) {
  if (!$.fn.loaders) {
    return
  }
  /**
   * Available loaders
   *
   * ball-pulse
   * ball-grid-pulse
   * ball-clip-rotate
   * ball-clip-rotate-pulse
   * square-spin
   * ball-clip-rotate-multiple
   * ball-pulse-rise
   * ball-rotate
   * cube-transition
   * ball-zig-zag
   * ball-zig-zag-deflect
   * ball-triangle-path
   * ball-scale
   * line-scale
   * line-scale-party
   * ball-scale-multiple
   * ball-pulse-sync
   * ball-beat
   * line-scale-pulse-out
   * line-scale-pulse-out-rapid
   * ball-scale-ripple
   * ball-scale-ripple-multiple
   * ball-spin-fade-loader
   * line-spin-fade-loader
   * triangle-skew-spin
   * pacman
   * ball-grid-beat
   * semi-circle-spin
   * ball-scale-random
   */

  options = options || {};
  $(el).each(function() {
    var loader = options.loader || $(this).data('loader') || 'line-spin-fade-loader';
    var color = options.color || $(this).data('color') || '#000';
    var scale = options.scale || $(this).data('scale') || 1;

    $(this)
      .addClass(loader)
      .loaders(loader);

    // append scale to css transform
    var transform = $(this).css('transform') || 'none';
    transform = (transform !== 'none') ? transform + ' scale(' + parseFloat(scale) + ')' : 'scale(' + parseFloat(scale) + ')';
    $(this).css('transform', transform);

    if (loader === 'ball-clip-rotate') {
      $(this).children()
        .css({
          borderTopColor: color,
          borderRightColor: color,
          borderLeftColor: color
        });
    } else if (loader === 'ball-clip-rotate-pulse') {
      $(this).children(':first-child')
        .css('backgroundColor', color);
      $(this).children(':last-child')
        .css({
          borderTopColor: color,
          borderBottomColor: color
        });
    } else if (loader === 'ball-clip-rotate-multiple') {
      $(this).children(':first-child')
        .css({
          borderLeftColor: color,
          borderRightColor: color
        });
      $(this).children(':last-child')
        .css({
          borderTopColor: color,
          borderBottomColor: color
        });
    } else if (loader === 'ball-scale-ripple' || loader === 'ball-scale-ripple-multiple' || loader === 'ball-triangle-path') {
      $(this).children()
        .css('borderColor', color);
    } else if (loader === 'square-spin') {
      $(this).children()
        .css({
          backgroundColor: color,
          borderColor: color
        });
    } else if (loader === 'triangle-skew-spin') {
      $(this).children()
        .css({
          borderTopColor: color,
          borderBottomColor: color
        });
    } else if (loader === 'pacman') {
      $(this).children(':lt(2)')
        .css({
          borderTopColor: color,
          borderBottomColor: color,
          borderLeftColor: color
        });
      $(this).children(':gt(1)')
        .css('backgroundColor', color);
    } else if (loader === 'semi-circle-spin') {
      $(this).children()
        .css('backgroundImage', 'linear-gradient(transparent 0,transparent 70%, ' + color + ' 30%, ' + color + ' 100%)');
    } else {
      $(this).children()
        .css('backgroundColor', color);
    }
  });
};

var highlightjs = function () {
  if (!window.hljs) {
    return
  }
  $('pre.highlight code').each(function (i, block) {
    hljs.highlightBlock(block);
    // enable linenumber via linenumbers attribute tag
    if (hljs.lineNumbersBlock && $(block).parent().is('[linenumbers]')) {
      hljs.lineNumbersBlock(block);
    }
  });
};

var perfectScrollbar = function () {
  if (!window.Ps) {
    return
  }
  // device detection
  var isMobile = function () {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4))
  };
  // better to use native scrollbar on mobile devices
  if (!isMobile()) {
    $('[data-toggle="perfectScrollbar"]').each(function (i, el) {
      var psTheme = $(this).data('ps-theme') || 'vision';
      Ps.initialize(el, {
        theme: psTheme,
        suppressScrollX: true,
        wheelPropagation: true
      });
    });
  }
};

var composer = function () {
  $(document)
    .on('focus', '.composer-input .form-control', function () {
      var $composer = $(this).parents('.composer');
      $('.composer.has-focus').not('.keep-focus').removeClass('has-focus');
      $composer.addClass('has-focus');
    })
    .on('click', 'html', function () {
      $('.composer.has-focus').not('.keep-focus').removeClass('has-focus');
    })
    .on('click', '.composer.has-focus', function (e) {
      e.stopPropagation();
    });
};

var utils = function () {
  // usefull events handle
  $(document)
    .on('click', '[js-stop-propagation]', function (e) {
      e.stopPropagation();
    })
    .on('click', '[js-prevent-default]', function (e) {
      e.preventDefault();
    })
    .on('click', '[js-prevent-propagation]', function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

  // smooth scroll
  $(document).on('click', '[data-toggle="smooth-scroll"]', function (e) {
    e.preventDefault();

    var target = $($(this).attr('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 600);
    }
  });

  // special events
  $.event.special.stopLoading = {
    remove: function(o) {
      if (o.handler) {
        o.handler();
      }
    }
  };

  // toggle classes
  $(document).on('click', '[data-toggle-classes]', function (e) {
    e.preventDefault();

    var $target = $($(this).attr('href')) || $($(this).data('target'));
    var classes = $(this).data('toggleClasses');
    if ($target.length) {
      $target.toggleClass(classes);
    }
  });

  // modify xeditable buttons style
  if ($.fn.editableform) {
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-sm btn-primary editable-submit">' +
      '<i class="fa fa-check"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-sm btn-default editable-cancel">' +
      '<i class="fa fa-times"></i>' +
    '</button>';
  }
};

// Initial components
var Components = function Components () {
  this.init();
};

Components.prototype.init = function init () {
  // initialize bootstrap components
  this.handleBootstrap();
  // initialize features
  this.handleFeatures();
  // initialize plugins
  this.handlePlugins();
  // initialize UI
  this.handleUI();
  // usefull function helpers
  this.handleUtils();
};

Components.prototype.handleBootstrap = function handleBootstrap () {
  bs();
};

Components.prototype.handleFeatures = function handleFeatures () {
  // panel tools
  panelTools();
  // svgInliner
  svgInliner();
  // filterable components by text input
  filterable();
  // selectable components
  selectable();
  // auto resize textarea
  autosizejs();
  // copying text with clipboard.js
  clipboard();
  // dragula
  dragable();
  // loaders
  loaders('[data-loader]');
};

Components.prototype.loading = function loading (target, options) {
  options = options || {
    type: 'block',
    scale: 1,
    label: '',
  };

  // if inline set loader default scale and label
  options.scale = (options.type === 'inline') ? .4 : options.scale;
  options.label = (options.type === 'inline') ? options.label : '';

  // prepare loading template
  var loadingTemplate = $('<div>').addClass('loading');
  var loaderTemplate = $('<div class="loader"><div data-loader></div> ' + options.label + '</div>');
  if (options.top) {
    loaderTemplate.css('top', options.top);
  }
  // add loader to loading
  loadingTemplate.html(loaderTemplate);

  // get the loader selector
  var loaderEl = loadingTemplate.find('[data-loader]')[0];
  // set the loader
  loaders(loaderEl, options);

  // add loading to target component
  $(target)
    .addClass('has-loading')
    .append(loadingTemplate);

  // remove indicator event
  loadingTemplate.one('stopLoading', function () {
    $(target).removeClass('has-loading');
  });

  return loadingTemplate
};

Components.prototype.handlePlugins = function handlePlugins () {
  // init handy plugins
  // highlightjs
  highlightjs();
  // perfect-scrollbar
  perfectScrollbar();
};

Components.prototype.handleUI = function handleUI () {
  composer();
};

Components.prototype.handleUtils = function handleUtils () {
  utils();
};

window.visionComponents = new Components();

return Components;

}());
