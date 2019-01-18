$(document).ready(function (window) {
  'use strict'
  // BEGIN INITIALIZE
  // setting up default app options
  var defaults = {
    onReady: function (app) {
      app.handleDrawerPs()
    }
  }
  // you can custom variable configs in configs.js file
  var settings = $.extend({}, defaults, configs)
  // initialize core setups as global var, so it can be used anywhere.
  window.vision = new App(settings)
  window.visionDrawer = vision.drawer
  window.visionDrawerMenu = vision.drawerMenu
  window.visionExtraDrawer = vision.extraDrawer
  // END INITIALIZE

  // BEGIN INTERACTION HANDLE
  // BEGIN APP THEME SETUPS
  $('#optionsThemesList > a').on('click', function () {
    var theme = $(this).data('theme')
    vision.setTheme(theme)
  })
  // END APP THEME SETUPS

  // BEGIN APP LAYOUT SETUPS
  // handle layout mode
  $('[name="optionLayoutMode"]').on('change', function () {
    var mode = $(this).val()
    vision.handleLayoutMode(mode)
    // prevent checked
    $('#optionLayoutBoxed').prop('checked', vision.isLayoutBoxed())
  })
  // handle layout fixed
  $('#optionLayoutFixed').on('click', function () {
    var fixed = $(this).is(':checked')
    vision.handleLayoutFixed(fixed)
    // prevent checked
    $('#optionHeaderFixed').prop('checked', vision.isHeaderFixed())
  })
  // handle layout boxed
  $('#optionLayoutBoxed').on('change', function () {
    var boxed = $(this).is(':checked')
    vision.handleLayoutBoxed(boxed)
    // prevent checked
    $(this).prop('checked', vision.isLayoutBoxed())
    $('[name="optionLayoutMode"][value="' + vision.getLayoutMode() + '"]').prop('checked', true)
  })
  // handle layout fullscreen
  $('#optionLayoutFullscreen').on('change', function () {
    var fs = $(this).is(':checked')
    vision.handleLayoutFullscreen(fs)
  })
  // listen to screenfull
  screenfull.onchange(function () {
    // manually set layout property
    vision.settings.layout.fullscreen = screenfull.isFullscreen
    // prevent checked
    $('#optionLayoutFullscreen').prop('checked', screenfull.isFullscreen)
  })
  // END APP LAYOUT SETUPS

  // BEGIN APP HEADER SETUPS
  $('#optionHeaderFixed').on('change', function () {
    var fixed = $(this).is(':checked')
    vision.handleHeaderFixed(fixed)
    // prevent checked
    $('#optionLayoutFixed').prop('checked', vision.isLayoutFixed())
  })
  // END APP HEADER SETUPS

  // BEGIN APP DRAWER SETUPS
  // toggle visible app drawer
  $('[data-toggle="drawer"]').on('click', function (e) {
    e.preventDefault()
    visionDrawer.toggle()
  })
  $('[data-toggle="drawer-compact"]').on('click', function (e) {
    e.preventDefault()
    visionDrawer.compact(!visionDrawer.isCompact())
  })
  $('#optionDrawerVisible').on('change', function () {
    var toggle = $(this).is(':checked') ? 'open' : 'close'
    visionDrawer[toggle]()
  })
  // toggle compact app drawer
  $('#optionDrawerCompact').on('change', function () {
    var isCompact = $(this).is(':checked')
    visionDrawer.compact(isCompact)
  })
  // toggle align app drawer
  $('#optionDrawerAlign').on('change', function () {
    var align = $(this).is(':checked') ? 'right' : 'left'
    visionDrawer.align(align)
  })
  // handle drawer ps on...
  $(visionDrawer.selector).on('drawer:init drawer:compact drawer:fixed drawer:pinned', function() {
    vision.handleDrawerPs()
  })
  // END APP DRAWER SETUPS

  // BEGIN APP DRAWER MENU SETUPS
  $('#optionMenuHoverable').on('change', function () {
    // keep in mind that hoverable not support on fixed layout!
    var hoverable = $(this).is(':checked') && !vision.isLayoutFixed()

    visionDrawerMenu.hoverable(hoverable)
  })
  $('#optionMenuCloseOther').on('change', function () {
    visionDrawerMenu.options.closeOther = $(this).is(':checked')
  })
  // END APP DRAWER MENU SETUPS

  // BEGIN APP CONTENT SETUPS
  $('#optionContentFluid').on('change', function () {
    var fluid = $(this).is(':checked')
    vision.handleContentFluid(fluid)
  })
  // END APP CONTENT SETUPS

  // BEGIN APP FOOTER SETUPS
  $('#optionFooterFixed').on('change', function () {
    var fixed = $(this).is(':checked')
    vision.handleFooterFixed(fixed)
  })
  $('#optionFooterHidden').on('change', function () {
    var hidden = $(this).is(':checked')
    vision.handleFooterHidden(hidden)
  })
  // END APP FOOTER SETUPS

  // BEGIN EXTRA DRAWER SETUPS
  $('[data-toggle="extraDrawer"]').on('click', function (e) {
    e.preventDefault()
    visionExtraDrawer.toggle()
  })
  // listen to extra drawer
  // END EXTRA DRAWER SETUPS
  // END INTERACTION HANDLE

  // BEGIN ADDITIONAL RULES
  // bind options list on init and listener
  // options list inputs
  var initOptionsList = function () {
    // content
    $('#optionsThemesList > a').removeClass('active')
    $('#optionsThemesList > a[data-theme="' + vision.getTheme() + '"]')
      .addClass('active')
      .prop('selected', true)
    // layout
    $('[name="optionLayoutMode"][value="' + vision.getLayoutMode() + '"]').prop('checked', true)
    $('#optionLayoutFixed').prop('checked', vision.isLayoutFixed())
    $('#optionLayoutBoxed').prop('checked', vision.isLayoutBoxed())
    // content
    $('#optionContentFluid').prop('checked', vision.isContentFluid())
    // footer
    $('#optionFooterFixed').prop('checked', vision.isFooterFixed())
    $('#optionFooterHidden').prop('checked', vision.isFooterHidden())
    // drawer
    var isRight = (visionDrawer.options.align === 'right')
    $('#optionDrawerFixed').prop('checked', visionDrawer.isFixed())
    $('#optionDrawerVisible').prop('checked', visionDrawer.isOpen())
    $('#optionDrawerCompact').prop('checked', visionDrawer.isCompact())
    $('#optionDrawerAlign').prop('checked', isRight)
    // drawer menu
    $('#optionMenuHoverable').prop('checked', visionDrawerMenu.isHoverable())
    $('#optionMenuCloseOther').prop('checked', visionDrawerMenu.options.closeOther)
  }
  initOptionsList()

  // listen
  $(visionDrawer.selector).on('drawer:fixed', function () {
    $('#optionDrawerFixed').prop('checked', visionDrawer.isFixed())
  })
  $(visionDrawer.selector).on('drawer:open drawer:close', function () {
    $('#optionDrawerVisible').prop('checked', visionDrawer.isOpen())
  })
  $(visionDrawer.selector).on('drawer:compact', function () {
    $('#optionDrawerCompact').prop('checked', visionDrawer.isCompact())
  })
  $(visionDrawer.selector).on('drawer:align', function () {
    var isRight = (visionDrawer.options.align === 'right')
    $('#optionDrawerAlign').prop('checked', isRight)
  })
  $(visionDrawerMenu.selector).on('menu:hoverable', function () {
    $('#optionMenuHoverable').prop('checked', visionDrawerMenu.isHoverable())
  })
  // END ADDITIONAL RULES
}(window))
