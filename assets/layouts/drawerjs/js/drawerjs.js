/**
* Drawerjs v1.2.2
* A navigation drawer for mobile and web application.
* Author: Beni Arisandi <bent10@stilearning.com>
*
* http://stilearning.com/drawerjs
*
* Copyright (c) 2017 Stilearning.
**/

var Drawerjs = (function () {
'use strict';

var Drawerjs = function Drawerjs(options) {

  this.options = {
    align: 'left',
    compact: false,
    fixed: false,
    forcePos: false,
    holder: '#drawerjs-holder',
    holderClass: 'drawerjs-holder',
    nested: false,
    open: false,
    pinned: false,
    selector: '#drawerjs',
    selectorClass: 'drawerjs',
    width: '200px',
    compactWidth: '60px',
    useCustom: false,

    autoConfig: false,
    _cleanStorage: false,
    holderBehavior: true,
    toggleScreen: '992px',
    backdrop: true
  };

  options = options || {};

  options.width = options.width ? this._validateUnit(options.width) : this.options.width;
  options.compactWidth = options.compactWidth ? this._validateUnit(options.compactWidth) : this.options.compactWidth;

  if (window.matchMedia) {
    this.options.fixed = !matchMedia(("only screen and (min-width: " + (this._validateUnit(this.options.toggleScreen)) + ")")).matches;
    this.options.open = matchMedia(("only screen and (min-width: " + (this._validateUnit(this.options.toggleScreen)) + ")")).matches;
    this.options.pinned = matchMedia(("only screen and (min-width: " + (this._validateUnit(this.options.toggleScreen)) + ")")).matches;
  }

  this.options = this._extend({}, this.options, options);

  this.options = (this._getState() === null) ? this.options : this._getState();

  this.selector = typeof this.options.selector === 'object' ? this.options.selector : document.querySelector(this.options.selector);

  this.holder = (!this.options.holder)
    ? document.querySelector('body')
    : document.querySelector(this.options.holder);

  this.wrapper = this.holder.parentNode;

  this.hash = Math.random().toString(36).substring(7);

  this.classes = {
    alignRight: this.options.selectorClass + '-has-right',
    compact: this.options.selectorClass + '-has-compact',
    fixed: this.options.selectorClass + '-has-fixed',
    open: this.options.selectorClass + '-has-open',
    close: this.options.selectorClass + '-has-close',
    slideIn: this.options.selectorClass + '-has-slideIn',
    pinned: this.options.selectorClass + '-has-pinned',
    wrapper: this.options.selectorClass + '-wrapper'
  };

  this.init();
};

Drawerjs.prototype._onReady = function _onReady (handler) {
  if(document.readyState != 'loading') {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler, false);
  }
};

Drawerjs.prototype._extend = function _extend (obj) {
  obj = obj || {};
  var args = arguments;
  for (var i = 1; i < args.length; i++) {
    if (!args[i]) { continue }
    for (var key in args[i]) {
      if (args[i].hasOwnProperty(key))
        { obj[key] = args[i][key]; }
    }
  }
  return obj
};

Drawerjs.prototype._validateUnit = function _validateUnit (unit) {
  var expr = /(^[\d]+((px)|(vw)|(r?em)|(\%))$)|^(initial|inherit|auto|0)$/i;
  return expr.test(unit) ? unit : ((/[^\.\sa-z]\d*\.?\d*/g.exec(unit)[0]) + "px")
};

Drawerjs.prototype._emit = function _emit (type, data) {
  var e;
  if (document.createEvent) {
    e = document.createEvent('Event');
    e.initEvent(type, true, true);
  } else {
    e = document.createEventObject();
    e.eventType = type;
  }
  e.eventName = type;
  e.data = data || this;

  document.createEvent
    ? this.selector.dispatchEvent(e)
    : this.selector.fireEvent('on' + type, e);
};

Drawerjs.prototype._on = function _on (el, type, handler) {
  var types = type.split(' ');
  for (var i = 0; i < types.length; i++) {
    el[window.addEventListener ? 'addEventListener' : 'attachEvent']( window.addEventListener ? types[i] : ("on" + (types[i])) , handler, false);
  }
};

Drawerjs.prototype._off = function _off (el, type, handler) {
  var types = type.split(' ');
  for (var i = 0; i < types.length; i++) {
    el[window.removeEventListener ? 'removeEventListener' : 'detachEvent']( window.removeEventListener ? types[i] : ("on" + (types[i])) , handler, false);
  }
};

Drawerjs.prototype._addClass = function _addClass (el, className) {
  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i++) {
    if (el.classList) { el.classList.add(classes[i]); }
    else { el.classes[i] += ' ' + classes[i]; }
  }
};

Drawerjs.prototype._removeClass = function _removeClass (el, className) {
  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i++) {
    if (el.classList) { el.classList.remove(classes[i]); }
    else { el.classes[i] = el.classes[i].replace(new RegExp('(^|\\b)' + classes[i].split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
  }
};

Drawerjs.prototype._drawerWidth = function _drawerWidth (isCompact) {
  return isCompact ? this.options.compactWidth : this.options.width
};

Drawerjs.prototype._renderWidth = function _renderWidth () {
  this.selector.style.width = this._drawerWidth(this.isCompact());
};

Drawerjs.prototype._clearSpace = function _clearSpace () {

  this.holder.style.paddingRight = 0;
  this.holder.style.paddingLeft = 0;

  this.holder.style.marginRight = 0;
  this.holder.style.marginLeft = 0;

  this.holder.style.transform = '';
};

Drawerjs.prototype._holderSpace = function _holderSpace () {
  var opts = this.options;
  var space = !opts.holder ? 'padding' : 'margin';

  this._clearSpace();

  if (opts.holderBehavior && !this.isCompact() && !matchMedia(("only screen and (min-width: " + (this._validateUnit(this.options.toggleScreen)) + ")")).matches) {
    if (opts.pinned && opts.open) {
      if (opts.align === 'right') {
        this.holder.style.transform = "translateX(-" + (this._drawerWidth(this.isCompact())) + ")";
      } else if(opts.align === 'left') {
        this.holder.style.transform = "translateX(" + (this._drawerWidth(this.isCompact())) + ")";
      }
    }
  } else {

    if (opts.pinned && opts.open) {
      if (opts.align === 'right') {
        this.holder.style[(space + "Right")] = this._drawerWidth(this.isCompact());
      } else if(opts.align === 'left') {
        this.holder.style[(space + "Left")] = this._drawerWidth(this.isCompact());
      }
    }
  }
};

Drawerjs.prototype._backdrop = function _backdrop () {
  var self = this;
  var hashId = "backdrop-" + (this.hash);
  var opts = this.options;
  var body = document.querySelector('body');
  var el = document.createElement('div');

  el.setAttribute('id', hashId);
  this._addClass(el, ((opts.selectorClass) + "-backdrop"));

  if (!this.isPinned() && opts.backdrop) {
    var backdropEl = document.querySelector(("#" + hashId));
    if (!body.contains(backdropEl)) {
      body.appendChild(el);
      this._on(el, 'click', function () {
        self.close();
      });
    }
    if (this.isOpen()) {
      document.querySelector(("#" + hashId)).style.display = 'block';
    }
  } else {
    var backdropEl$1 = document.querySelector(("#" + hashId));
    if (body.contains(backdropEl$1)) { backdropEl$1.parentNode.removeChild(backdropEl$1); }
  }
};

Drawerjs.prototype._transitionIn = function _transitionIn () {
  this._addClass(this.selector, this.classes.slideIn);
  this.selector.style.width = this._drawerWidth(this.isCompact());

  var pos = this.options.forcePos;
  if (pos.hasOwnProperty('height')) { this.selector.style.height = pos.height; }
};

Drawerjs.prototype._transitionOut = function _transitionOut () {
  this._removeClass(this.selector, this.classes.slideIn);
  this.selector.style.width = 0;

  var pos = this.options.forcePos;
  if (pos.hasOwnProperty('height')) { this.selector.style.height = 0; }
};

Drawerjs.prototype._transitionEnd = function _transitionEnd (el) {
  var transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition'  : 'transitionend',
    'OTransition'    : 'oTransitionEnd otransitionend',
    'transition'     : 'transitionend'
  };
  for (var name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return transEndEventNames[name]
    }
  }
};

Drawerjs.prototype._addFakeHeight = function _addFakeHeight () {
  var backgroundColor = window.getComputedStyle(this.selector).backgroundColor;
  this.wrapper.style.backgroundColor = backgroundColor;
};

Drawerjs.prototype._removeFakeHeight = function _removeFakeHeight () {
  this.wrapper.style.backgroundColor = '';
};

Drawerjs.prototype._setState = function _setState (key, value) {

  if (key)
    { this.options[key] = value; }

  if (typeof this.options.autoConfig === 'string' || this.options.autoConfig instanceof String)
    { localStorage.setItem(("drawerjs_" + (this.options.autoConfig)), JSON.stringify(this.options)); }

  this._emit('drawer:stateChanged');
};

Drawerjs.prototype._getState = function _getState () {
  return JSON.parse(localStorage.getItem(("drawerjs_" + (this.options.autoConfig))))
};

Drawerjs.prototype.init = function init () {
  var self = this;
  var opts = this.options;

  this._addClass(this.selector, opts.selectorClass);
  this._addClass(this.holder, opts.holderClass);
  this._addClass(this.wrapper, this.classes.wrapper);

  this._renderWidth();

  this._addClass(this.selector, ((opts.selectorClass) + "-hold-transition"));
  this._addClass(this.holder, ((opts.selectorClass) + "-hold-transition"));

  this._on(this.selector, this._transitionEnd(this.selector), function () {
    if(!self.isOpen()) {
      self.selector.style.opacity = '0';
      self.selector.style.visibility = 'hidden';
    }
  });

  if (this.selector.hasChildNodes()) {
    var children = this.selector.children;
    Array.prototype.forEach.call(children, function (el) {
      self._on(el, self._transitionEnd(el), function (e) {
        e.stopPropagation();
      });
    });
  }

  if (opts.nested) {
    this.wrapper.style.position = 'relative';
  }

  this.autoConfig(opts.autoConfig);

  this.align(opts.align);

  this.compact(opts.compact);

  this.fixed(opts.fixed);

  this.forcePos(opts.forcePos);

  this.pinned(opts.pinned);

  this.custom(opts.useCustom);

  this.isOpen() ? this.open() : this.close();

  this._setState();

  this._onReady(function () {

    setTimeout(function () {
      self._removeClass(self.selector, ((opts.selectorClass) + "-hold-transition"));
      self._removeClass(self.holder, ((opts.selectorClass) + "-hold-transition"));
    }, 150);

    self._emit('drawer:init');
  });
};

Drawerjs.prototype.autoConfig = function autoConfig (namespace) {
  try {
    if(namespace === true) {
      throw {
        name: 'Drawerjs Warning',
        msg: 'You must have a unique namescpace for each Drawer!'
      }
    }
  }
  catch(err) {
    console.warn(((err.name) + ": " + (err.msg)));
  }

  if(this.options.autoConfig && this.options._cleanStorage)
    { localStorage.removeItem(("drawerjs_" + (this.options.autoConfig))); }

  this._setState('autoConfig', namespace);

  this._emit('drawer:autoConfig');

  return this
};

Drawerjs.prototype.align = function align (position) {
  var classes = this.classes;

  if (position === 'right') {
    this._addClass(this.selector, classes.alignRight);
  } else {
    this._removeClass(this.selector, classes.alignRight);
  }

  this._setState('align', position);

  this._holderSpace();

  this._emit('drawer:align');

  return this
};

Drawerjs.prototype.isCompact = function isCompact () {
  return this.options.compact
};

Drawerjs.prototype.compact = function compact (isCompact) {
  var method = (isCompact) ? '_addClass': '_removeClass';
  var classes = this.classes;

  this[method](this.selector, classes.compact);

  this._setState('compact', isCompact);

  this._renderWidth();

  this._holderSpace();

  this._emit('drawer:compact');

  return this
};

Drawerjs.prototype.isFixed = function isFixed () {
  return this.options.fixed
};

Drawerjs.prototype.fixed = function fixed (isFixed) {
  var method = (isFixed) ? '_addClass': '_removeClass';
  var classes = this.classes;

  isFixed ? this._removeFakeHeight() : this._addFakeHeight();
  this[method](this.selector, classes.fixed);

  this.selector.style.display = 'none';
  this.selector.offsetHeight;
  this.selector.style.display = '';

  this._setState('fixed', isFixed);

  this._emit('drawer:fixed');

  return this
};

Drawerjs.prototype.isOpen = function isOpen () {
  return this.options.open
};

Drawerjs.prototype.open = function open () {
  var classes = this.classes;

  this._transitionIn();
  this._addClass(this.selector, classes.open);
  this._removeClass(this.selector, classes.close);
  this.selector.style.overflow = '';
  this.selector.style.opacity = '';
  this.selector.style.visibility = '';

  if (!this.isPinned() && this.options.backdrop) {
    var backdrop = document.querySelector(("#backdrop-" + (this.hash)));
    backdrop.style.display = 'block';
  }

  this._setState('open', true);

  this._holderSpace();

  this._emit('drawer:open');

  return this
};

Drawerjs.prototype.close = function close () {
  var classes = this.classes;

  this._transitionOut();
  this._addClass(this.selector, classes.close);
  this._removeClass(this.selector, classes.open);
  this.selector.style.overflow = 'hidden';

  if (!this.isPinned() && this.options.backdrop) {
    var backdrop = document.querySelector(("#backdrop-" + (this.hash)));
    backdrop.style.display = '';
  }

  this._setState('open', false);

  this._holderSpace();

  this._emit('drawer:close');

  return this
};

Drawerjs.prototype.toggle = function toggle () {
  var method = (!this.isOpen()) ? 'open' : 'close';

  this[method]();

  return this
};

Drawerjs.prototype.isPinned = function isPinned () {
  return this.options.pinned
};

Drawerjs.prototype.pinned = function pinned (isPinned) {
  var method = (isPinned) ? '_addClass': '_removeClass';
  var classes = this.classes;

  this[method](this.selector, classes.pinned);

  this._setState('pinned', isPinned);

  this._backdrop();

  this._holderSpace();

  this._emit('drawer:pinned');

  return this
};

Drawerjs.prototype.getWidth = function getWidth () {
  return this.options.width
};

Drawerjs.prototype.setWidth = function setWidth (width) {

  this._setState('width', this._validateUnit(width));

  this._renderWidth();

  this._holderSpace();

  this._emit('drawer:changeWidth');

  return this
};

Drawerjs.prototype.getCompactWidth = function getCompactWidth () {
  return this.options.compactWidth
};

Drawerjs.prototype.setCompactWidth = function setCompactWidth (width) {

  this._setState('compactWidth', this._validateUnit(width));

  this._renderWidth();

  this._holderSpace();

  this._emit('drawer:changeCompactWidth');

  return this
};

Drawerjs.prototype.forcePos = function forcePos (pos) {
  var self = this;

  if (typeof pos === 'object') {
    for(var key in pos) {
      var expr = /^(top|left|right|bottom|width|height)$/g;
      if (expr.test(key)) {
        self.selector.style.minHeight = 0;
        self.selector.style[key] = self._validateUnit(pos[key]);
      }
      else {
        console.warn(("This method doesn't support for css " + key + ". Only support for top|right|bottom|left|width|height."));
      }
    }

    if(pos.hasOwnProperty('height')) { this.selector.style.minHeight = 0; }
    if(pos.hasOwnProperty('width')) { this.setWidth(pos['width']); }
    if((pos.hasOwnProperty('top') || pos.hasOwnProperty('bottom')) && pos.hasOwnProperty('right') && pos.hasOwnProperty('left')) { this.selector.style.transition = 'height 150ms linear'; }
    if(pos.hasOwnProperty('right') && pos.hasOwnProperty('left')) {
      this.selector.style.maxWidth = '100%';
      this.selector.style.transform = 'translateX(0)';
    }
  } else {

    this.selector.style.maxWidth = '';
    this.selector.style.minHeight = '';
    this.selector.style.transform = '';
    this.selector.style.transition = '';
    this.selector.style.top = '';
    this.selector.style.right = '';
    this.selector.style.bottom = '';
    this.selector.style.left = '';
  }

  this._setState('forcePos', pos);

  this._emit('drawer:forcePos');

  return this
};

Drawerjs.prototype.custom = function custom (useCustom) {
  var self = this;

  if (useCustom.hasOwnProperty('drawer') || useCustom.hasOwnProperty('holder')) {
    for(var elem in useCustom) {
      for(var prop in useCustom[elem]) {
        var regElem = /^(drawer|holder)$/g;
        var regProp = /^(backgroundColor|color)$/g;
        var target = elem === 'drawer' ? 'selector' : 'holder';
        if (regElem.test(elem) && regProp.test(prop)) { self[target].style[prop] = useCustom[elem][prop]; }
        else { console.warn(("Unsupported property in useCustom: " + elem + " or " + prop + " is not a supported property.")); }
      }
    }

    this._addFakeHeight();
  } else {
    this.selector.style.backgroundColor = '';
    this.selector.style.color = '';
    this.holder.style.backgroundColor = '';
    this.holder.style.color = '';

    this._removeFakeHeight();
  }

  this._setState('useCustom', useCustom);

  this._emit('drawer:custom');

  return this
};

return Drawerjs;

}());
/* Touch me on Twitter! @stilearningTwit */
//# sourceMappingURL=drawerjs.js.map
