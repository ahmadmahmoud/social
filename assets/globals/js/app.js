'use strict';

var App = function App (options) {
  options = options || {};
  // App default settings
  var defaults = {
    // check missing core components
    debug: false,
    // selectors default settings
    selectors: {
      theme: '#app-theme',
      main: '#app-main',
      header: '#app-header',
      content: '#app-content',
      contentInner: '.app-content-inner',
      footer: '#app-footer',
      footerInner: '.app-footer-inner',
      drawer: '#app-drawer',
      drawerMenu: '#drawer-menu',
      drawerHolder: '#app-drawer-holder',
      extra: '#app-extra'
    },
    // access useful path via js
    // dont forget to set each value to your assets path
    globalPath: {
      assets: 'assets/',
      img: 'assets/globals/img/',
      theme: 'assets/themes/'
    },
    // theme can be `default/pastel`, `jet`, `ebony`, `early-black`
    theme: 'default',
    // layout default settings
    layout: {
      // layout mode can be `cliped`, `floated`
      mode: 'cliped',
      // fixed both header and app drawer
      fixed: false,
      boxed: false,
      // fullscreen cannot be initialize on document ready
      fullscreen: false
    },
    // header default settings
    header: {
      // fixed only app header
      fixed: false
    },
    // content default settings
    content: {
      fluid: true
    },
    // footer default settings
    footer: {
      fixed: false,
      fluid: true,
      hidden: false
    },
    // drawer default settings (only used on initial drawer)
    // Noted:
    // This property will removed after initialize
    // use App.drawer instead to get access to drawer object
    drawer: {
      width: 220,
      fixed: false,
      compact: false,
      align: 'left',
      autoConfig: false
    },
    drawerMenu: {
      hoverable: false,
      closeOther: true
    },
    // access brand color via js
    colors: {
      default: '#eee',
      inverse: '#303030',
      grayDarker: '#191917',
      grayDark: '#303030',
      gray: '#5e5e5e',
      grayLight: '#969696',
      grayLighter: '#e8e8e8',
      primary: '#9474a9',
      success: '#04C4A5',
      info: '#4D9DE0',
      warning: '#C5906C',
      danger: '#C56C6C'
    },
    // callbacks
    onReady: function (app) {},
    onThemeChanged: function (app) {},
    onHandleLayoutChanged: function (app) {},
    onHandleLayoutFixed: function (app) {},
    onHandleLayoutBoxed: function (app) {},
    onHandleHeaderFixed: function (app) {},
    onHandleContentFluid: function (app) {},
    onHandleFooterFixed: function (app) {},
    onHandleFooterHidden: function (app) {}
  };

  // the App settings
  this.settings = $.extend(true, {}, defaults, options);

  // initialize
  this.init();
};

App.prototype.init = function init () {
  var settings = this.settings;
  // enable debug
  if (settings.debug) {
    this.debug();
  }
  // init app theme
  this
    .setTheme(settings.theme)
    .handleClasses();
  // the drawer must initialize first
  this
    .handleDrawer(settings.drawer)
    .handleDrawerMenu(settings.drawerMenu)
    .handleHeaderFixed(settings.header.fixed)
    .handleLayoutFixed(settings.layout.fixed)
    .handleLayoutMode(settings.layout.mode)
    .handleLayoutBoxed(settings.layout.boxed)
    .handleContentFluid(settings.content.fluid)
    .handleFooterFixed(settings.footer.fixed)
    .handleFooterHidden(settings.footer.hidden);
  // The app may haven't a extra drawer.
  if (this.isSelectorExist('extra')) {
    this.handleExtraDrawer();
  }
  // below are important when all ui logic was initialized
  this.handleDevices();
  this.handleHolderHeight();
  this.handleFooterSpace();
  this.handleExtraDrawerHolder(settings.layout.boxed);

  // initial responds for listeners
  this.handleInteractions();

  // fire init callback
  settings.onReady(this);
};

// see https://davidwalsh.name/javascript-debounce-function
App.prototype.debounce = function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }
};

/* From Modernizr */
App.prototype.whichTransitionEvent = function whichTransitionEvent () {
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for(var t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t]
    }
  }
};

App.prototype.whichAnimationEvent = function whichAnimationEvent () {
  var el = document.createElement('fakeelement');
  var animations = {
    'animation':'animationend',
    'OAnimation':'oAnimationEnd',
    'MozAnimation':'animationend',
    'WebkitAnimation':'webkitAnimationEnd'
  };

  for(var a in animations){
    if( el.style[a] !== undefined ){
      return animations[a]
    }
  }
};

// detect device by userAgent
App.prototype.isMobile = function isMobile () {
  // device detection
  return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4)))
};

App.prototype.handleDevices = function handleDevices () {
  if (this.isMobile()) {
    $('body').addClass('has-mobile');
  }
};

App.prototype.debug = function debug () {
  var self = this;
  // debug for each selector, if not exist then tell to user
  $.each(this.settings.selectors, function (i, val) {
    // except extraDrawer
    if (!self.isSelectorExist(i) && i !== 'extra') {
      console.warn('The selector ' + val + ' was not found on your app template.');
    }
  });

  return this
};

App.prototype.isToggleScreenUp = function isToggleScreenUp () {
  var self = this;
  // matchMedia polyfill depend on respond.js
  return matchMedia('(min-width: ' + self.drawer.options.toggleScreen + ')').matches
};

App.prototype.isToggleScreenDown = function isToggleScreenDown () {
  // matchMedia polyfill depend on respond.js
  return !this.isToggleScreenUp()
};

// refer to bootstrap breakpoint floated
App.prototype.isBreakpointUp = function isBreakpointUp () {
  var self = this;
  // matchMedia polyfill depend on respond.js
  return matchMedia('(min-width: 768px)').matches
};

// refer to bootstrap breakpoint floated
App.prototype.isBreakpointDown = function isBreakpointDown () {
  var self = this;
  // matchMedia polyfill depend on respond.js
  return !this.isBreakpointUp()
};

App.prototype.brandColor = function brandColor (colorName) {
  return this.settings.colors[colorName]
};

App.prototype.setSelector = function setSelector (selector, value) {
  this.settings.selectors[selector] = value;

  return this
};

App.prototype.getSelector = function getSelector (selector) {
  return this.settings.selectors[selector]
};

App.prototype.isSelectorExist = function isSelectorExist (selector) {
  return $(this.getSelector(selector)).length > 0
};

App.prototype.setAssetsPath = function setAssetsPath (path) {
  this.settings.globalPath.assets = path;

  return this
};

App.prototype.getAssetsPath = function getAssetsPath () {
  return this.settings.globalPath.assets
};

App.prototype.setGlobalImgPath = function setGlobalImgPath (path) {
  this.settings.globalPath.img = path;

  return this
};

App.prototype.getGlobalImgPath = function getGlobalImgPath () {
  return this.settings.globalPath.img
};

App.prototype.themeTag = function themeTag (theme) {
  return '<link class="app-theme" href="' + this.getThemePath() + theme + '.css" rel="stylesheet" type="text/css">'
};

App.prototype.setThemePath = function setThemePath (path) {
  this.settings.globalPath.theme = path;
};

App.prototype.getThemePath = function getThemePath () {
  return this.settings.globalPath.theme
};

App.prototype.setTheme = function setTheme (theme) {
  var themeTag = this.themeTag(theme);
  // remove existing theme
  $('.app-theme').remove();
  $('body').attr('data-theme', theme);
  // replace with request theme
  if (theme !== 'default') {
    $(themeTag).insertAfter($(this.getSelector('theme')));
  }

  this.settings.theme = theme;

  // fire callback
  this.settings.onThemeChanged(this);

  return this
};

App.prototype.getTheme = function getTheme () {
  return this.settings.theme
};

App.prototype.handleClasses = function handleClasses () {
  $(this.getSelector('main')).addClass('app-main');
  $(this.getSelector('header')).addClass('app-header');
  $(this.getSelector('content')).addClass('app-content');
  $(this.getSelector('drawer')).addClass('app-drawer');
  $(this.getSelector('footer')).addClass('app-footer');
};

// get position of window scroll
App.prototype.getScrollTop = function getScrollTop () {
  return $(window).scrollTop()
};

// the top position of app main
App.prototype.getPositionTop = function getPositionTop () {
  return $(this.getSelector('main')).offset().top
};

App.prototype.handlePositionTop = function handlePositionTop () {
  var pos = this.getPositionTop() - this.getScrollTop();
  return pos > 0 ? pos : 0
};

App.prototype.redrawPosition = function redrawPosition (delay) {
  var self = this;
  // in some case the redraw action may need to wait until a transition/animation was finished
  // the delay parameter come to handle it
  delay = delay || 0;
  setTimeout(function () {
    self.handleStickyLayout();
    self.handleStaticLayout();
  }, delay);
};

// App header height
App.prototype.getHeaderHeight = function getHeaderHeight () {
  return $(this.getSelector('header')).outerHeight()
};

// App footer height
App.prototype.getFooterHeight = function getFooterHeight () {
  return $(this.getSelector('footer')).outerHeight()
};

App.prototype.fixedHeader = function fixedHeader (fixed) {
  var top = fixed ? this.handlePositionTop() : 0;

  $(this.getSelector('header'))
    .removeClass('app-header-fixed')
    .css('top', top);
  if (fixed) {
    $(this.getSelector('header')).addClass('app-header-fixed');
  }
};

App.prototype.handleHeaderFixed = function handleHeaderFixed (fixed) {
  // disabled layout fixed
  if (this.isLayoutFixed() && fixed) {
    this.handleLayoutFixed(false);
  }
  // fixed header
  if (!this.isLayoutFixed()) {
    this.fixedHeader(fixed);
  }
  // manage indicator class
  $('body').removeClass('has-header-fixed');
  if (fixed) {
    $('body').addClass('has-header-fixed');
  }

  this.settings.header.fixed = fixed;

  // callback
  this.settings.onHandleHeaderFixed(this);

  return this
};

App.prototype.isHeaderFixed = function isHeaderFixed () {
  return this.settings.header.fixed
};

App.prototype.getClipedPosition = function getClipedPosition () {
  // position when layout has fixed
  var pfix = this.handlePositionTop() + this.getHeaderHeight();
  // position when layout has not fixed
  var punfix = this.getPositionTop() + this.getHeaderHeight();

  return this.isLayoutFixed() ? pfix : punfix
};

App.prototype.getFloatedPosition = function getFloatedPosition () {
  return this.isLayoutFixed() ? this.handlePositionTop() : this.getPositionTop()
};

App.prototype.handleClipedLayout = function handleClipedLayout () {
  var top = this.getClipedPosition();
  // handle drawer
  this.drawer.forcePos({
    top: top
  });
  // handle header
  $(this.getSelector('header')).animate({
    marginRight: 0,
    marginLeft: 0
  }, 150);
  // handle body selector
  $('body')
    .removeClass('has-layout-floated')
    .addClass('has-layout-cliped');
};

App.prototype.handleFloatedLayout = function handleFloatedLayout () {
  var drawer = this.drawer;
  var isCompact = drawer.isCompact();
  var spacer = drawer.isOpen() ? this.drawer._drawerWidth(isCompact) : 0;
  var top = this.getFloatedPosition();
  // handle drawer
  this.drawer.forcePos({
    top: top
  });
  // normalize header transform
  $(this.getSelector('header')).css('transform', 'translateX(0)');
  // handle header
  var headerSpacer = {
    marginRight: spacer,
    marginLeft: 0
  };
  var headerTranslate = {
    transform: 'translateX(-' + spacer + ')',
    marginRight: 0,
    marginLeft: 0
  };
  // depend on drawer align
  if (this.drawer.options.align === 'left') {
    headerSpacer = {
      marginLeft: spacer,
      marginRight: 0
    };
    headerTranslate = {
      transform: 'translateX(' + spacer + ')',
      marginRight: 0,
      marginLeft: 0
    };
  }
  if (this.isToggleScreenUp()) {
    $(this.getSelector('header')).animate(headerSpacer, 150);
  } else {
    $(this.getSelector('header')).css(headerTranslate);
  }

  // handle body selector
  $('body')
    .removeClass('has-layout-cliped')
    .addClass('has-layout-floated');
};

App.prototype.handleLayoutMode = function handleLayoutMode (mode) {
  // confirm if layout has floated
  if (this.isLayoutBoxed() && mode === 'floated') {
    var floatedConfirm = confirm('Activate Floated Mode will turn off Boxed Layout. Are you want to Continue?');
    if (!floatedConfirm) {
      return
    }
    this.handleLayoutBoxed(false);
  }

  if (mode === 'cliped') {
    this.handleClipedLayout();
  } else {
    this.handleFloatedLayout();
  }

  this.settings.layout.mode = mode;

  // callback
  this.settings.onHandleLayoutChanged(this);

  return this
};

App.prototype.getLayoutMode = function getLayoutMode () {
  return this.settings.layout.mode
};

App.prototype.isLayoutCliped = function isLayoutCliped () {
  return this.getLayoutMode() === 'cliped'
};

// apply sticky like position on scroll when layout or header has fixed
App.prototype.handleStickyLayout = function handleStickyLayout () {
  var scrollTop = this.getScrollTop();
  var isLayoutFixed = this.isLayoutFixed();
  var isLayoutCliped = this.isLayoutCliped();
  var isHeaderFixed = this.isHeaderFixed();
  var headerHeight = this.getHeaderHeight();
  var positionTop = this.getPositionTop();
  var top = this.getPositionTop() - scrollTop;
  var drawerTop = isLayoutCliped ? (top + headerHeight) : top;
  var drawerHoldTop = isLayoutCliped ? headerHeight : 0;

  // maintenance top position
  // layout fixed
  if (isLayoutFixed && scrollTop < positionTop) {
    $(this.getSelector('header')).css('top', top);
    this.drawer.forcePos({
      top: drawerTop
    });
  } else if (isLayoutFixed && scrollTop >= positionTop) {
    $(this.getSelector('header')).css('top', 0);
    this.drawer.forcePos({
      top: drawerHoldTop
    });
  }
  // header (only) fixed
  if (isHeaderFixed && scrollTop < positionTop) {
    $(this.getSelector('header')).css('top', top);
  } else if (isHeaderFixed && scrollTop >= positionTop) {
    $(this.getSelector('header')).css('top', 0);
  }
};

App.prototype.handleStaticLayout = function handleStaticLayout () {
  var isLayoutFixed = this.isLayoutFixed();
  var isLayoutCliped = this.isLayoutCliped();
  var isHeaderFixed = this.isHeaderFixed();
  var headerHeight = this.getHeaderHeight();
  var positionTop = this.getPositionTop();
  var drawerHoldTop = isLayoutCliped ? (positionTop + headerHeight) : 0;
  // if fixed was not exist
  if (!isLayoutFixed && !isHeaderFixed) {
    $(this.getSelector('header')).css('top', 0);
    this.drawer.forcePos({
      top: drawerHoldTop
    });
  }
};

App.prototype.handleLayoutFixed = function handleLayoutFixed (fixed) {
  // disable fixed header
  if (this.isHeaderFixed() && fixed) {
    this.handleHeaderFixed(false);
  }
  // fixed header
  if (!this.isHeaderFixed()) {
    var top = fixed ? this.handlePositionTop() : 0;
    $(this.getSelector('header')).css('top', top);
  }
  // fixed drawer
  this.drawer.fixed(fixed);
  // force turn off hoverable drawer menu
  if (fixed) {
    this.drawerMenu.hoverable(false);
  }
  // manage indicator class
  $('body').removeClass('has-layout-fixed');
  if (fixed) {
    $('body').addClass('has-layout-fixed');
  }

  this.settings.layout.fixed = fixed;
  // handle holder
  this.handleHolderHeight();

  // wait until setting layout fixed has changed, then do:
  // handle layout
  this.handleLayoutMode(this.getLayoutMode());

  // callback
  this.settings.onHandleLayoutFixed(this);

  return this
};

App.prototype.isLayoutFixed = function isLayoutFixed () {
  return this.settings.layout.fixed
};

App.prototype.handleLayoutBoxed = function handleLayoutBoxed (boxed) {
  // confirm if layout has floated
  if (!this.isLayoutCliped() && boxed) {
    var floatedConfirm = confirm('Activate Boxed Layout will transform the Layout to Cliped Mode. Are you want to Continue?');
    if (!floatedConfirm) {
      return
    }
    this.handleLayoutMode('cliped');
  }
  // boxed layout
  $(this.getSelector('content')).removeClass('container');
  $('body').removeClass('has-layout-boxed');
  if (boxed) {
    $(this.getSelector('content')).addClass('container');
    $('body').addClass('has-layout-boxed');
  }
  // handle footer
  this.handleFooterFluid(!boxed);
  // handle app drawer position
  this.handleDrawerPosition();
  // handle extra drawer holder
  this.handleExtraDrawerHolder(boxed);

  this.settings.layout.boxed = boxed;

  // handle footer space
  this.handleFooterSpace();

  // callback
  this.settings.onHandleLayoutBoxed(this);

  return this
};

App.prototype.isLayoutBoxed = function isLayoutBoxed () {
  return this.settings.layout.boxed
};

App.prototype.handleLayoutFullscreen = function handleLayoutFullscreen (fullscreen) {
  // depend on screenfull.js
  if (!screenfull) {
    alert('This feature depend on screenfull.js, please include it to your document.');
    return
  }
  if (screenfull.enabled && fullscreen) {
    screenfull.request();
  } else {
    screenfull.exit();
  }

  this.settings.layout.fullscreen = fullscreen;

  return this
};

App.prototype.isLayoutFullscreen = function isLayoutFullscreen () {
  return this.settings.layout.fullscreen
};

App.prototype.handleContentFluid = function handleContentFluid (fluid) {
  $(this.getSelector('contentInner')).addClass('container');
  if (fluid) {
    $(this.getSelector('contentInner')).removeClass('container');
  }

  this.settings.content.fluid = fluid;

  // callback
  this.settings.onHandleContentFluid(this);

  return this
};

App.prototype.isContentFluid = function isContentFluid () {
  return this.settings.content.fluid
};

App.prototype.handleFooterFluid = function handleFooterFluid (fluid) {
  $(this.getSelector('footerInner')).addClass('container');
  if (fluid) {
    $(this.getSelector('footerInner')).removeClass('container');
  }

  this.settings.footer.fluid = fluid;

  return this
};

App.prototype.isFooterFluid = function isFooterFluid () {
  return this.settings.footer.fluid
};

App.prototype.handleFooterFixed = function handleFooterFixed (fixed) {
  $(this.getSelector('footer')).removeClass('app-footer-fixed');
  $('body').removeClass('has-footer-fixed');
  if (fixed) {
    $(this.getSelector('footer')).addClass('app-footer-fixed');
    $('body').addClass('has-footer-fixed');
  }

  this.settings.footer.fixed = fixed;

  // handle space
  this.handleFooterSpace();
  // callback
  this.settings.onHandleFooterFixed(this);

  return this
};

App.prototype.isFooterFixed = function isFooterFixed () {
  return this.settings.footer.fixed
};

App.prototype.handleFooterHidden = function handleFooterHidden (hidden) {
  $('body').removeClass('has-footer-hidden');
  $(this.getSelector('footer')).removeClass('d-none');
  if (hidden) {
    $('body').addClass('has-footer-hidden');
    $(this.getSelector('footer')).addClass('d-none');
  }

  this.settings.footer.hidden = hidden;

  // callback
  this.settings.onHandleFooterHidden(this);

  return this
};

App.prototype.isFooterHidden = function isFooterHidden () {
  return this.settings.footer.hidden
};

App.prototype.handleDrawer = function handleDrawer (options) {
  var settings = this.settings;
  var defaults = {
    selector: settings.selectors.drawer,
    holder: settings.selectors.drawerHolder,
    pinned: true
  };
  var opts = $.extend({}, defaults, options);

  // remove default drawer settings
  delete settings.drawer;
  // please use drawer instead
  this.drawer = new Drawerjs(opts);

  // handle global state classes
  $('body')
    .toggleClass('has-drawer-open', opts.open)
    .toggleClass('has-drawer-compact', opts.compact)
    .addClass('has-drawer-' + opts.align);

  return this
};

App.prototype.handleDrawerPs = function handleDrawerPs () {
  if (!window.Ps) {
    return
  }
  var PsContainer = $(this.drawer.selector).children('.drawerjs-inner')[0];
  // use native scroll on mobile devices
  if (!this.isMobile()) {
    // only enabled perfect scrollbar if not compact and on fixed nor unpinned mode.
    if(!this.drawer.isCompact() && (this.drawer.isFixed() || !this.drawer.isPinned())) {
      // init perfect scrollbar
      if(!PsContainer.hasAttribute('data-ps-id')) {
        Ps.initialize(PsContainer, {
          suppressScrollX: true,
          theme: 'vision'
        });
      }
      // add indicator class
      $(this.drawer.selector).addClass('drawerjs-has-ps');
    } else {
      // destroy perfect scrollbar
      Ps.destroy(PsContainer);
      // remove indicator class
      $(this.drawer.selector).removeClass('drawerjs-has-ps');
    }
  }
};

// depend on app drawer
App.prototype.handleFooterSpace = function handleFooterSpace () {
  var footer = $(this.getSelector('footer'))[0];
  var drawer = this.drawer;
  var opts = drawer.options;
  var drawerWidth = drawer._drawerWidth(drawer.isCompact());
  var x = opts.align === 'right' ? '-' + drawerWidth : drawerWidth;
  // if haven't a footer
  if (!footer) {
    this.handleFooterHidden(true);
    return
  }

  // clear space
  $(this.getSelector('footer')).css({
    left: '',
    right: '',
    transform: ''
  });

  // return if layout boxed or footer has fixed
  if (this.isLayoutBoxed() || this.isFooterFixed()) {
    return
  }

  // footer behavior: translate footer instead of adding space on screen width < toggleScreen
  if (!drawer.isCompact() && !this.isToggleScreenUp()) {
    if (opts.pinned && opts.open) {
      footer.style.transform = 'translateX(' + x + ')';
    }
  } else {
    // add space by align
    if (opts.pinned && opts.open) {
      footer.style[opts.align] = drawerWidth;
    }
  }
};

App.prototype.handleDrawerPosition = function handleDrawerPosition () {
  // depend on align
  var spacerLeft = this.drawer.options.align === 'left'
    ? $(this.getSelector('content')).offset().left
    : 0;
  var spacerRight = this.drawer.options.align === 'right'
    ? $(this.getSelector('content')).offset().left
    : 0;

  var drawerSpace = {
    left: 'auto',
    right: spacerRight
  };
  if (this.drawer.options.align === 'left') {
    drawerSpace = {
      left: spacerLeft,
      right: 'auto'
    };
  }
  this.drawer.forcePos(drawerSpace);
};

App.prototype.handleDrawerMenu = function handleDrawerMenu (options) {
  var settings = this.settings;
  var align = this.drawer.options.align === 'left' ? 'right' : 'left';
  var compact = this.drawer.isCompact();
  var defaults = {
    selector: this.getSelector('drawerMenu'),
    align: align,
    compact: compact
  };
  var opts = $.extend({}, defaults, options);

  // remove default drawer menu settings
  delete settings.drawerMenu;
  // please use drawer instead
  this.drawerMenu = new StackedMenu(opts);

  return this
};

App.prototype.getDrawerHeight = function getDrawerHeight () {
  return $(this.getSelector('drawer')).outerHeight()
};

App.prototype.getHolderHeight = function getHolderHeight () {
  return $(this.getSelector('drawerHolder')).outerHeight()
};

App.prototype.handleHolderHeight = function handleHolderHeight (delay) {
  delay = delay || 0;
  var self = this;
  // normalize the holder height first
  $(this.getSelector('drawerHolder')).css('min-height', '');

  var updater = function () {
    var drawerHeight = self.getDrawerHeight();
    var holderHeight = self.getHolderHeight();
    if (drawerHeight >= holderHeight) {
      $(self.getSelector('drawerHolder')).css('min-height', self.getDrawerHeight());
    }
  };

  if (!this.isLayoutFixed() && this.drawer.isOpen()) {
    // so we get the current height
    if (delay > 0) {
      setTimeout(function () {
        updater();
      }, delay);
    } else {
        updater();
    }
  }
};

App.prototype.handleExtraDrawer = function handleExtraDrawer () {
  var self = this;
  this.extraDrawer = new Drawerjs({
    selector: self.getSelector('extra'),
    holder: false,
    pinned: false,
    align: 'right',
    width: 320,
    fixed: true,
    open: false,
    holderBehavior: false,
    useCustom: {
      drawer: {
        color: '#e8e8e8',
        backgroundColor: '#382B3F'
      }
    }
  });
  $(this.extraDrawer.selector).addClass('app-exdrawer');

  return this
};

App.prototype.handleExtraDrawerHolder = function handleExtraDrawerHolder (boxed) {
  if (this.extraDrawer) {
    // depend on boxed layout
    $(this.extraDrawer.wrapper).css('background-color', $(this.drawer.holder).css('background-color'));
    if (boxed) {
      var bg = $('body').css('background-color');
      $(this.extraDrawer.wrapper).css('background-color', bg);
    }
  }
};

App.prototype.handleInteractions = function handleInteractions () {
  var self = this;
  // How the App respond to window.resize
  $(window).on('resize', function () {
    // handle App drawer
    if (!self.isMobile()) {
      // force open on screen > toggleScreen
      if (self.isToggleScreenUp()) {
        self.drawer.open();
      } else {
        self.drawer.close();
      }
    }
    // handle layout
    if (self.isLayoutBoxed()) {
      self.handleLayoutBoxed(true);
    }
    if (self.isLayoutFixed() || self.isHeaderFixed()) {
      self.handleStickyLayout();
    }
    self.handleHolderHeight();
  })
  // How the App respond to window.scroll
  // sticky on scroll
  .on('scroll', function () {
    // add scrollindicator
    $('body').addClass('has-scrolled');
    // handle sticky
    self.handleStickyLayout();
  })
  // use debounce (alternative to detect scrollend) to remove scroll indicator
  .on('scroll', this.debounce(function () {
    $('body').removeClass('has-scrolled');
  }, 150));
  // How the App respond to drawer
  $(this.drawer.selector).on('drawer:open drawer:close drawer:compact drawer:align', function (e) {
    self.handleLayoutMode(self.getLayoutMode());
    self.handleStickyLayout();
    self.handleFooterSpace();
    // wait until transition end
    $(self.drawer.selector).one(self.whichTransitionEvent(), function () {
      self.handleHolderHeight();
    });

    // handle global state classes
    if (e.type === 'drawer:open' || e.type === 'drawer:close') {
      $('body').toggleClass('has-drawer-open', self.drawer.isOpen());
    } else if (e.type === 'drawer:compact') {
      $('body').toggleClass('has-drawer-compact', self.drawer.isCompact());
    } else if (e.type === 'drawer:align') {
      $('body')
        .removeClass('has-drawer-left has-drawer-right')
        .addClass('has-drawer-' + self.drawer.options.align);
    }

    // align and compact menu are depend to app drawer
    if (e.type === 'drawer:align') {
      var mAlign = self.drawer.options.align === 'left' ? 'right' : 'left';
      self.drawerMenu.align(mAlign);
      // handle layout box
      self.handleLayoutBoxed(self.isLayoutBoxed());
    } else if (e.type === 'drawer:compact') {
      self.drawerMenu.compact(self.drawer.isCompact());
    }
  });
  // How the App respond to drawerMenu
  $(this.drawerMenu.selector).on('menu:slideup menu:slidedown menu:hoverable', this.debounce(function () {
    // handle holder height
    self.handleHolderHeight();
  }, 80));
};
