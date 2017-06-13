/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {***REMOVED***

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		***REMOVED***

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; ***REMOVED***

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	***REMOVED***

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; ***REMOVED***
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	***REMOVED***

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); ***REMOVED***

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pdfjsLib = __webpack_require__(1);
var CSS_UNITS = 96.0 / 72.0;
var DEFAULT_SCALE_VALUE = 'auto';
var DEFAULT_SCALE = 1.0;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var UNKNOWN_SCALE = 0;
var MAX_AUTO_SCALE = 1.25;
var SCROLLBAR_PADDING = 40;
var VERTICAL_PADDING = 5;
var RendererType = {
  CANVAS: 'canvas',
  SVG: 'svg'
***REMOVED***
var mozL10n = document.mozL10n || document.webL10n;
var PDFJS = pdfjsLib.PDFJS;
PDFJS.disableFullscreen = PDFJS.disableFullscreen === undefined ? false : PDFJS.disableFullscreen;
PDFJS.useOnlyCssZoom = PDFJS.useOnlyCssZoom === undefined ? false : PDFJS.useOnlyCssZoom;
PDFJS.maxCanvasPixels = PDFJS.maxCanvasPixels === undefined ? 16777216 : PDFJS.maxCanvasPixels;
PDFJS.disableHistory = PDFJS.disableHistory === undefined ? false : PDFJS.disableHistory;
PDFJS.disableTextLayer = PDFJS.disableTextLayer === undefined ? false : PDFJS.disableTextLayer;
PDFJS.ignoreCurrentPositionOnZoom = PDFJS.ignoreCurrentPositionOnZoom === undefined ? false : PDFJS.ignoreCurrentPositionOnZoom;
PDFJS.locale = PDFJS.locale === undefined ? navigator.language : PDFJS.locale;
function getOutputScale(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  var pixelRatio = devicePixelRatio / backingStoreRatio;
  return {
    sx: pixelRatio,
    sy: pixelRatio,
    scaled: pixelRatio !== 1
***REMOVED***;
}
function scrollIntoView(element, spot, skipOverflowHiddenElements) {
  var parent = element.offsetParent;
  if (!parent) {
    console.error('offsetParent is not set -- cannot scroll');
    return;
***REMOVED***
  var checkOverflow = skipOverflowHiddenElements || false;
  var offsetY = element.offsetTop + element.clientTop;
  var offsetX = element.offsetLeft + element.clientLeft;
  while (parent.clientHeight === parent.scrollHeight || checkOverflow && getComputedStyle(parent).overflow === 'hidden') {
    if (parent.dataset._scaleY) {
      offsetY /= parent.dataset._scaleY;
      offsetX /= parent.dataset._scaleX;
  ***REMOVED***
    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;
    if (!parent) {
      return;
  ***REMOVED***
***REMOVED***
  if (spot) {
    if (spot.top !== undefined) {
      offsetY += spot.top;
  ***REMOVED***
    if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
  ***REMOVED***
***REMOVED***
  parent.scrollTop = offsetY;
}
function watchScroll(viewAreaElement, callback) {
  var debounceScroll = function debounceScroll(evt) {
    if (rAF) {
      return;
  ***REMOVED***
    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      var currentY = viewAreaElement.scrollTop;
      var lastY = state.lastY;
      if (currentY !== lastY) {
        state.down = currentY > lastY;
    ***REMOVED***
      state.lastY = currentY;
      callback(state);
  ***REMOVED***);
***REMOVED***;
  var state = {
    down: true,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
***REMOVED***;
  var rAF = null;
  viewAreaElement.addEventListener('scroll', debounceScroll, true);
  return state;
}
function parseQueryString(query) {
  var parts = query.split('&');
  var params = {***REMOVED***
  for (var i = 0, ii = parts.length; i < ii; ++i) {
    var param = parts[i].split('=');
    var key = param[0].toLowerCase();
    var value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
***REMOVED***
  return params;
}
function binarySearchFirstItem(items, condition) {
  var minIndex = 0;
  var maxIndex = items.length - 1;
  if (items.length === 0 || !condition(items[maxIndex])) {
    return items.length;
***REMOVED***
  if (condition(items[minIndex])) {
    return minIndex;
***REMOVED***
  while (minIndex < maxIndex) {
    var currentIndex = minIndex + maxIndex >> 1;
    var currentItem = items[currentIndex];
    if (condition(currentItem)) {
      maxIndex = currentIndex;
  ***REMOVED*** else {
      minIndex = currentIndex + 1;
  ***REMOVED***
***REMOVED***
  return minIndex;
}
function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
***REMOVED***
  var xinv = 1 / x;
  var limit = 8;
  if (xinv > limit) {
    return [1, limit];
***REMOVED*** else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
***REMOVED***
  var x_ = x > 1 ? xinv : x;
  var a = 0,
      b = 1,
      c = 1,
      d = 1;
  while (true) {
    var p = a + c,
        q = b + d;
    if (q > limit) {
      break;
  ***REMOVED***
    if (x_ <= p / q) {
      c = p;
      d = q;
  ***REMOVED*** else {
      a = p;
      b = q;
  ***REMOVED***
***REMOVED***
  var result;
  if (x_ - a / b < c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
***REMOVED*** else {
    result = x_ === x ? [c, d] : [d, c];
***REMOVED***
  return result;
}
function roundToDivide(x, div) {
  var r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}
function getVisibleElements(scrollEl, views, sortByVisibility) {
  var top = scrollEl.scrollTop,
      bottom = top + scrollEl.clientHeight;
  var left = scrollEl.scrollLeft,
      right = left + scrollEl.clientWidth;
  function isElementBottomBelowViewTop(view) {
    var element = view.div;
    var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
***REMOVED***
  var visible = [],
      view,
      element;
  var currentHeight, viewHeight, hiddenHeight, percentHeight;
  var currentWidth, viewWidth;
  var firstVisibleElementInd = views.length === 0 ? 0 : binarySearchFirstItem(views, isElementBottomBelowViewTop);
  for (var i = firstVisibleElementInd, ii = views.length; i < ii; i++) {
    view = views[i];
    element = view.div;
    currentHeight = element.offsetTop + element.clientTop;
    viewHeight = element.clientHeight;
    if (currentHeight > bottom) {
      break;
  ***REMOVED***
    currentWidth = element.offsetLeft + element.clientLeft;
    viewWidth = element.clientWidth;
    if (currentWidth + viewWidth < left || currentWidth > right) {
      continue;
  ***REMOVED***
    hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, currentHeight + viewHeight - bottom);
    percentHeight = (viewHeight - hiddenHeight) * 100 / viewHeight | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view: view,
      percent: percentHeight
  ***REMOVED***);
***REMOVED***
  var first = visible[0];
  var last = visible[visible.length - 1];
  if (sortByVisibility) {
    visible.sort(function (a, b) {
      var pc = a.percent - b.percent;
      if (Math.abs(pc) > 0.001) {
        return -pc;
    ***REMOVED***
      return a.id - b.id;
  ***REMOVED***);
***REMOVED***
  return {
    first: first,
    last: last,
    views: visible
***REMOVED***;
}
function noContextMenuHandler(e) {
  e.preventDefault();
}
function getPDFFileNameFromURL(url, defaultFilename) {
  if (typeof defaultFilename === 'undefined') {
    defaultFilename = 'document.pdf';
***REMOVED***
  var reURI = /^(?:(?:[^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  var reFilename = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  var splitURI = reURI.exec(url);
  var suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);
  if (suggestedFilename) {
    suggestedFilename = suggestedFilename[0];
    if (suggestedFilename.indexOf('%') !== -1) {
      try {
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
    ***REMOVED*** catch (e) {}
  ***REMOVED***
***REMOVED***
  return suggestedFilename || defaultFilename;
}
function normalizeWheelEventDelta(evt) {
  var delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
  var angle = Math.atan2(evt.deltaY, evt.deltaX);
  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
***REMOVED***
  var MOUSE_DOM_DELTA_PIXEL_MODE = 0;
  var MOUSE_DOM_DELTA_LINE_MODE = 1;
  var MOUSE_PIXELS_PER_LINE = 30;
  var MOUSE_LINES_PER_PAGE = 30;
  if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
***REMOVED*** else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
    delta /= MOUSE_LINES_PER_PAGE;
***REMOVED***
  return delta;
}
var animationStarted = new Promise(function (resolve) {
  window.requestAnimationFrame(resolve);
});
var localized = new Promise(function (resolve, reject) {
  if (!mozL10n) {
    resolve();
    return;
***REMOVED***
  if (mozL10n.getReadyState() !== 'loading') {
    resolve();
    return;
***REMOVED***
  window.addEventListener('localized', function localized(evt) {
    resolve();
***REMOVED***);
});
var EventBus = function EventBusClosure() {
  function EventBus() {
    this._listeners = Object.create(null);
***REMOVED***
  EventBus.prototype = {
    on: function EventBus_on(eventName, listener) {
      var eventListeners = this._listeners[eventName];
      if (!eventListeners) {
        eventListeners = [];
        this._listeners[eventName] = eventListeners;
    ***REMOVED***
      eventListeners.push(listener);
  ***REMOVED***,
    off: function EventBus_on(eventName, listener) {
      var eventListeners = this._listeners[eventName];
      var i;
      if (!eventListeners || (i = eventListeners.indexOf(listener)) < 0) {
        return;
    ***REMOVED***
      eventListeners.splice(i, 1);
  ***REMOVED***,
    dispatch: function EventBus_dispath(eventName) {
      var eventListeners = this._listeners[eventName];
      if (!eventListeners || eventListeners.length === 0) {
        return;
    ***REMOVED***
      var args = Array.prototype.slice.call(arguments, 1);
      eventListeners.slice(0).forEach(function (listener) {
        listener.apply(null, args);
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;
  return EventBus;
}();
var ProgressBar = function ProgressBarClosure() {
  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
***REMOVED***
  function ProgressBar(id, opts) {
    this.visible = true;
    this.div = document.querySelector(id + ' .progress');
    this.bar = this.div.parentNode;
    this.height = opts.height || 100;
    this.width = opts.width || 100;
    this.units = opts.units || '%';
    this.div.style.height = this.height + this.units;
    this.percent = 0;
***REMOVED***
  ProgressBar.prototype = {
    updateBar: function ProgressBar_updateBar() {
      if (this._indeterminate) {
        this.div.classList.add('indeterminate');
        this.div.style.width = this.width + this.units;
        return;
    ***REMOVED***
      this.div.classList.remove('indeterminate');
      var progressSize = this.width * this._percent / 100;
      this.div.style.width = progressSize + this.units;
  ***REMOVED***,
    get percent() {
      return this._percent;
  ***REMOVED***,
    set percent(val) {
      this._indeterminate = isNaN(val);
      this._percent = clamp(val, 0, 100);
      this.updateBar();
  ***REMOVED***,
    setWidth: function ProgressBar_setWidth(viewer) {
      if (viewer) {
        var container = viewer.parentNode;
        var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
        if (scrollbarWidth > 0) {
          this.bar.setAttribute('style', 'width: calc(100% - ' + scrollbarWidth + 'px);');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    hide: function ProgressBar_hide() {
      if (!this.visible) {
        return;
    ***REMOVED***
      this.visible = false;
      this.bar.classList.add('hidden');
      document.body.classList.remove('loadingInProgress');
  ***REMOVED***,
    show: function ProgressBar_show() {
      if (this.visible) {
        return;
    ***REMOVED***
      this.visible = true;
      document.body.classList.add('loadingInProgress');
      this.bar.classList.remove('hidden');
  ***REMOVED***
***REMOVED***;
  return ProgressBar;
}();
exports.CSS_UNITS = CSS_UNITS;
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
exports.MIN_SCALE = MIN_SCALE;
exports.MAX_SCALE = MAX_SCALE;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
exports.RendererType = RendererType;
exports.mozL10n = mozL10n;
exports.EventBus = EventBus;
exports.ProgressBar = ProgressBar;
exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
exports.noContextMenuHandler = noContextMenuHandler;
exports.parseQueryString = parseQueryString;
exports.getVisibleElements = getVisibleElements;
exports.roundToDivide = roundToDivide;
exports.approximateFraction = approximateFraction;
exports.getOutputScale = getOutputScale;
exports.scrollIntoView = scrollIntoView;
exports.watchScroll = watchScroll;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.animationStarted = animationStarted;
exports.localized = localized;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


{
  var pdfjsLib;
  if (typeof __pdfjsdev_webpack__ === 'undefined') {
    if (typeof window !== 'undefined' && window['pdfjs-dist/build/pdf']) {
      pdfjsLib = window['pdfjs-dist/build/pdf'];
  ***REMOVED*** else if (typeof require === 'function') {
      pdfjsLib = require('../build/pdf.js');
  ***REMOVED*** else {
      throw new Error('Neither `require` nor `window` found');
  ***REMOVED***
***REMOVED***
  module.exports = pdfjsLib;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var EventBus = uiUtils.EventBus;
function attachDOMEventsToEventBus(eventBus) {
  eventBus.on('documentload', function () {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('documentload', true, true, {});
    window.dispatchEvent(event);
***REMOVED***);
  eventBus.on('pagerendered', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagerendered', true, true, {
      pageNumber: e.pageNumber,
      cssTransform: e.cssTransform
  ***REMOVED***);
    e.source.div.dispatchEvent(event);
***REMOVED***);
  eventBus.on('textlayerrendered', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('textlayerrendered', true, true, { pageNumber: e.pageNumber });
    e.source.textLayerDiv.dispatchEvent(event);
***REMOVED***);
  eventBus.on('pagechange', function (e) {
    var event = document.createEvent('UIEvents');
    event.initUIEvent('pagechange', true, true, window, 0);
    event.pageNumber = e.pageNumber;
    e.source.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('pagesinit', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagesinit', true, true, null);
    e.source.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('pagesloaded', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagesloaded', true, true, { pagesCount: e.pagesCount });
    e.source.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('scalechange', function (e) {
    var event = document.createEvent('UIEvents');
    event.initUIEvent('scalechange', true, true, window, 0);
    event.scale = e.scale;
    event.presetValue = e.presetValue;
    e.source.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('updateviewarea', function (e) {
    var event = document.createEvent('UIEvents');
    event.initUIEvent('updateviewarea', true, true, window, 0);
    event.location = e.location;
    e.source.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('find', function (e) {
    if (e.source === window) {
      return;
  ***REMOVED***
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('find' + e.type, true, true, {
      query: e.query,
      phraseSearch: e.phraseSearch,
      caseSensitive: e.caseSensitive,
      highlightAll: e.highlightAll,
      findPrevious: e.findPrevious
  ***REMOVED***);
    window.dispatchEvent(event);
***REMOVED***);
  eventBus.on('attachmentsloaded', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('attachmentsloaded', true, true, { attachmentsCount: e.attachmentsCount });
    e.source.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('sidebarviewchanged', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('sidebarviewchanged', true, true, { view: e.view });
    e.source.outerContainer.dispatchEvent(event);
***REMOVED***);
  eventBus.on('pagemode', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('pagemode', true, true, { mode: e.mode });
    e.source.pdfViewer.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('namedaction', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('namedaction', true, true, { action: e.action });
    e.source.pdfViewer.container.dispatchEvent(event);
***REMOVED***);
  eventBus.on('presentationmodechanged', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('presentationmodechanged', true, true, {
      active: e.active,
      switchInProgress: e.switchInProgress
  ***REMOVED***);
    window.dispatchEvent(event);
***REMOVED***);
  eventBus.on('outlineloaded', function (e) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('outlineloaded', true, true, { outlineCount: e.outlineCount });
    e.source.container.dispatchEvent(event);
***REMOVED***);
}
var globalEventBus = null;
function getGlobalEventBus() {
  if (globalEventBus) {
    return globalEventBus;
***REMOVED***
  globalEventBus = new EventBus();
  attachDOMEventsToEventBus(globalEventBus);
  return globalEventBus;
}
exports.attachDOMEventsToEventBus = attachDOMEventsToEventBus;
exports.getGlobalEventBus = getGlobalEventBus;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CLEANUP_TIMEOUT = 30000;
var RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
***REMOVED***
var PDFRenderingQueue = function PDFRenderingQueueClosure() {
  function PDFRenderingQueue() {
    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
***REMOVED***
  PDFRenderingQueue.prototype = {
    setViewer: function PDFRenderingQueue_setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
  ***REMOVED***,
    setThumbnailViewer: function PDFRenderingQueue_setThumbnailViewer(pdfThumbnailViewer) {
      this.pdfThumbnailViewer = pdfThumbnailViewer;
  ***REMOVED***,
    isHighestPriority: function PDFRenderingQueue_isHighestPriority(view) {
      return this.highestPriorityPage === view.renderingId;
  ***REMOVED***,
    renderHighestPriority: function PDFRenderingQueue_renderHighestPriority(currentlyVisiblePages) {
      if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
    ***REMOVED***
      if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
        return;
    ***REMOVED***
      if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
        if (this.pdfThumbnailViewer.forceRendering()) {
          return;
      ***REMOVED***
    ***REMOVED***
      if (this.printing) {
        return;
    ***REMOVED***
      if (this.onIdle) {
        this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
    ***REMOVED***
  ***REMOVED***,
    getHighestPriority: function PDFRenderingQueue_getHighestPriority(visible, views, scrolledDown) {
      var visibleViews = visible.views;
      var numVisible = visibleViews.length;
      if (numVisible === 0) {
        return false;
    ***REMOVED***
      for (var i = 0; i < numVisible; ++i) {
        var view = visibleViews[i].view;
        if (!this.isViewFinished(view)) {
          return view;
      ***REMOVED***
    ***REMOVED***
      if (scrolledDown) {
        var nextPageIndex = visible.last.id;
        if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
          return views[nextPageIndex];
      ***REMOVED***
    ***REMOVED*** else {
        var previousPageIndex = visible.first.id - 2;
        if (views[previousPageIndex] && !this.isViewFinished(views[previousPageIndex])) {
          return views[previousPageIndex];
      ***REMOVED***
    ***REMOVED***
      return null;
  ***REMOVED***,
    isViewFinished: function PDFRenderingQueue_isViewFinished(view) {
      return view.renderingState === RenderingStates.FINISHED;
  ***REMOVED***,
    renderView: function PDFRenderingQueue_renderView(view) {
      var state = view.renderingState;
      switch (state) {
        case RenderingStates.FINISHED:
          return false;
        case RenderingStates.PAUSED:
          this.highestPriorityPage = view.renderingId;
          view.resume();
          break;
        case RenderingStates.RUNNING:
          this.highestPriorityPage = view.renderingId;
          break;
        case RenderingStates.INITIAL:
          this.highestPriorityPage = view.renderingId;
          var continueRendering = function () {
            this.renderHighestPriority();
        ***REMOVED***.bind(this);
          view.draw().then(continueRendering, continueRendering);
          break;
    ***REMOVED***
      return true;
  ***REMOVED***
***REMOVED***;
  return PDFRenderingQueue;
}();
exports.RenderingStates = RenderingStates;
exports.PDFRenderingQueue = PDFRenderingQueue;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OverlayManager = {
  overlays: {},
  active: null,
  register: function overlayManagerRegister(name, element, callerCloseMethod, canForceClose) {
    return new Promise(function (resolve) {
      var container;
      if (!name || !element || !(container = element.parentNode)) {
        throw new Error('Not enough parameters.');
    ***REMOVED*** else if (this.overlays[name]) {
        throw new Error('The overlay is already registered.');
    ***REMOVED***
      this.overlays[name] = {
        element: element,
        container: container,
        callerCloseMethod: callerCloseMethod || null,
        canForceClose: canForceClose || false
    ***REMOVED***;
      resolve();
  ***REMOVED***.bind(this));
***REMOVED***,
  unregister: function overlayManagerUnregister(name) {
    return new Promise(function (resolve) {
      if (!this.overlays[name]) {
        throw new Error('The overlay does not exist.');
    ***REMOVED*** else if (this.active === name) {
        throw new Error('The overlay cannot be removed while it is active.');
    ***REMOVED***
      delete this.overlays[name];
      resolve();
  ***REMOVED***.bind(this));
***REMOVED***,
  open: function overlayManagerOpen(name) {
    return new Promise(function (resolve) {
      if (!this.overlays[name]) {
        throw new Error('The overlay does not exist.');
    ***REMOVED*** else if (this.active) {
        if (this.overlays[name].canForceClose) {
          this._closeThroughCaller();
      ***REMOVED*** else if (this.active === name) {
          throw new Error('The overlay is already active.');
      ***REMOVED*** else {
          throw new Error('Another overlay is currently active.');
      ***REMOVED***
    ***REMOVED***
      this.active = name;
      this.overlays[this.active].element.classList.remove('hidden');
      this.overlays[this.active].container.classList.remove('hidden');
      window.addEventListener('keydown', this._keyDown);
      resolve();
  ***REMOVED***.bind(this));
***REMOVED***,
  close: function overlayManagerClose(name) {
    return new Promise(function (resolve) {
      if (!this.overlays[name]) {
        throw new Error('The overlay does not exist.');
    ***REMOVED*** else if (!this.active) {
        throw new Error('The overlay is currently not active.');
    ***REMOVED*** else if (this.active !== name) {
        throw new Error('Another overlay is currently active.');
    ***REMOVED***
      this.overlays[this.active].container.classList.add('hidden');
      this.overlays[this.active].element.classList.add('hidden');
      this.active = null;
      window.removeEventListener('keydown', this._keyDown);
      resolve();
  ***REMOVED***.bind(this));
***REMOVED***,
  _keyDown: function overlayManager_keyDown(evt) {
    var self = OverlayManager;
    if (self.active && evt.keyCode === 27) {
      self._closeThroughCaller();
      evt.preventDefault();
  ***REMOVED***
***REMOVED***,
  _closeThroughCaller: function overlayManager_closeThroughCaller() {
    if (this.overlays[this.active].callerCloseMethod) {
      this.overlays[this.active].callerCloseMethod();
  ***REMOVED***
    if (this.active) {
      this.close(this.active);
  ***REMOVED***
***REMOVED***
***REMOVED***
exports.OverlayManager = OverlayManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var domEvents = __webpack_require__(2);
var parseQueryString = uiUtils.parseQueryString;
var PageNumberRegExp = /^\d+$/;
function isPageNumber(str) {
  return PageNumberRegExp.test(str);
}
var PDFLinkService = function PDFLinkServiceClosure() {
  function PDFLinkService(options) {
    options = options || {***REMOVED***
    this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
***REMOVED***
  PDFLinkService.prototype = {
    setDocument: function PDFLinkService_setDocument(pdfDocument, baseUrl) {
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
  ***REMOVED***,
    setViewer: function PDFLinkService_setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
  ***REMOVED***,
    setHistory: function PDFLinkService_setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
  ***REMOVED***,
    get pagesCount() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
  ***REMOVED***,
    get page() {
      return this.pdfViewer.currentPageNumber;
  ***REMOVED***,
    set page(value) {
      this.pdfViewer.currentPageNumber = value;
  ***REMOVED***,
    navigateTo: function PDFLinkService_navigateTo(dest) {
      var destString = '';
      var self = this;
      var goToDestination = function (destRef) {
        var pageNumber;
        if (destRef instanceof Object) {
          pageNumber = self._cachedPageNumber(destRef);
      ***REMOVED*** else if ((destRef | 0) === destRef) {
          pageNumber = destRef + 1;
      ***REMOVED*** else {
          console.error('PDFLinkService_navigateTo: "' + destRef + '" is not a valid destination reference.');
          return;
      ***REMOVED***
        if (pageNumber) {
          if (pageNumber < 1 || pageNumber > self.pagesCount) {
            console.error('PDFLinkService_navigateTo: "' + pageNumber + '" is a non-existent page number.');
            return;
        ***REMOVED***
          self.pdfViewer.scrollPageIntoView({
            pageNumber: pageNumber,
            destArray: dest
        ***REMOVED***);
          if (self.pdfHistory) {
            self.pdfHistory.push({
              dest: dest,
              hash: destString,
              page: pageNumber
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED*** else {
          self.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
            self.cachePageRef(pageIndex + 1, destRef);
            goToDestination(destRef);
        ***REMOVED***).catch(function () {
            console.error('PDFLinkService_navigateTo: "' + destRef + '" is not a valid page reference.');
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
      var destinationPromise;
      if (typeof dest === 'string') {
        destString = dest;
        destinationPromise = this.pdfDocument.getDestination(dest);
    ***REMOVED*** else {
        destinationPromise = Promise.resolve(dest);
    ***REMOVED***
      destinationPromise.then(function (destination) {
        dest = destination;
        if (!(destination instanceof Array)) {
          console.error('PDFLinkService_navigateTo: "' + destination + '" is not a valid destination array.');
          return;
      ***REMOVED***
        goToDestination(destination[0]);
    ***REMOVED***);
  ***REMOVED***,
    getDestinationHash: function PDFLinkService_getDestinationHash(dest) {
      if (typeof dest === 'string') {
        return this.getAnchorUrl('#' + (isPageNumber(dest) ? 'nameddest=' : '') + escape(dest));
    ***REMOVED***
      if (dest instanceof Array) {
        var str = JSON.stringify(dest);
        return this.getAnchorUrl('#' + escape(str));
    ***REMOVED***
      return this.getAnchorUrl('');
  ***REMOVED***,
    getAnchorUrl: function PDFLinkService_getAnchorUrl(anchor) {
      return (this.baseUrl || '') + anchor;
  ***REMOVED***,
    setHash: function PDFLinkService_setHash(hash) {
      var pageNumber, dest;
      if (hash.indexOf('=') >= 0) {
        var params = parseQueryString(hash);
        if ('search' in params) {
          this.eventBus.dispatch('findfromurlhash', {
            source: this,
            query: params['search'].replace(/"/g, ''),
            phraseSearch: params['phrase'] === 'true'
        ***REMOVED***);
      ***REMOVED***
        if ('nameddest' in params) {
          if (this.pdfHistory) {
            this.pdfHistory.updateNextHashParam(params.nameddest);
        ***REMOVED***
          this.navigateTo(params.nameddest);
          return;
      ***REMOVED***
        if ('page' in params) {
          pageNumber = params.page | 0 || 1;
      ***REMOVED***
        if ('zoom' in params) {
          var zoomArgs = params.zoom.split(',');
          var zoomArg = zoomArgs[0];
          var zoomArgNumber = parseFloat(zoomArg);
          if (zoomArg.indexOf('Fit') === -1) {
            dest = [null, { name: 'XYZ' }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
        ***REMOVED*** else {
            if (zoomArg === 'Fit' || zoomArg === 'FitB') {
              dest = [null, { name: zoomArg }];
          ***REMOVED*** else if (zoomArg === 'FitH' || zoomArg === 'FitBH' || zoomArg === 'FitV' || zoomArg === 'FitBV') {
              dest = [null, { name: zoomArg }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
          ***REMOVED*** else if (zoomArg === 'FitR') {
              if (zoomArgs.length !== 5) {
                console.error('PDFLinkService_setHash: ' + 'Not enough parameters for \'FitR\'.');
            ***REMOVED*** else {
                dest = [null, { name: zoomArg }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
            ***REMOVED***
          ***REMOVED*** else {
              console.error('PDFLinkService_setHash: \'' + zoomArg + '\' is not a valid zoom value.');
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
        if (dest) {
          this.pdfViewer.scrollPageIntoView({
            pageNumber: pageNumber || this.page,
            destArray: dest,
            allowNegativeOffset: true
        ***REMOVED***);
      ***REMOVED*** else if (pageNumber) {
          this.page = pageNumber;
      ***REMOVED***
        if ('pagemode' in params) {
          this.eventBus.dispatch('pagemode', {
            source: this,
            mode: params.pagemode
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED*** else {
        if (isPageNumber(hash) && hash <= this.pagesCount) {
          console.warn('PDFLinkService_setHash: specifying a page number ' + 'directly after the hash symbol (#) is deprecated, ' + 'please use the "#page=' + hash + '" form instead.');
          this.page = hash | 0;
      ***REMOVED***
        dest = unescape(hash);
        try {
          dest = JSON.parse(dest);
          if (!(dest instanceof Array)) {
            dest = dest.toString();
        ***REMOVED***
      ***REMOVED*** catch (ex) {}
        if (typeof dest === 'string' || isValidExplicitDestination(dest)) {
          if (this.pdfHistory) {
            this.pdfHistory.updateNextHashParam(dest);
        ***REMOVED***
          this.navigateTo(dest);
          return;
      ***REMOVED***
        console.error('PDFLinkService_setHash: \'' + unescape(hash) + '\' is not a valid destination.');
    ***REMOVED***
  ***REMOVED***,
    executeNamedAction: function PDFLinkService_executeNamedAction(action) {
      switch (action) {
        case 'GoBack':
          if (this.pdfHistory) {
            this.pdfHistory.back();
        ***REMOVED***
          break;
        case 'GoForward':
          if (this.pdfHistory) {
            this.pdfHistory.forward();
        ***REMOVED***
          break;
        case 'NextPage':
          if (this.page < this.pagesCount) {
            this.page++;
        ***REMOVED***
          break;
        case 'PrevPage':
          if (this.page > 1) {
            this.page--;
        ***REMOVED***
          break;
        case 'LastPage':
          this.page = this.pagesCount;
          break;
        case 'FirstPage':
          this.page = 1;
          break;
        default:
          break;
    ***REMOVED***
      this.eventBus.dispatch('namedaction', {
        source: this,
        action: action
    ***REMOVED***);
  ***REMOVED***,
    onFileAttachmentAnnotation: function (params) {
      this.eventBus.dispatch('fileattachmentannotation', {
        source: this,
        id: params.id,
        filename: params.filename,
        content: params.content
    ***REMOVED***);
  ***REMOVED***,
    cachePageRef: function PDFLinkService_cachePageRef(pageNum, pageRef) {
      var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
      this._pagesRefCache[refStr] = pageNum;
  ***REMOVED***,
    _cachedPageNumber: function PDFLinkService_cachedPageNumber(pageRef) {
      var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
      return this._pagesRefCache && this._pagesRefCache[refStr] || null;
  ***REMOVED***
***REMOVED***;
  function isValidExplicitDestination(dest) {
    if (!(dest instanceof Array)) {
      return false;
  ***REMOVED***
    var destLength = dest.length,
        allowNull = true;
    if (destLength < 2) {
      return false;
  ***REMOVED***
    var page = dest[0];
    if (!(typeof page === 'object' && typeof page.num === 'number' && (page.num | 0) === page.num && typeof page.gen === 'number' && (page.gen | 0) === page.gen) && !(typeof page === 'number' && (page | 0) === page && page >= 0)) {
      return false;
  ***REMOVED***
    var zoom = dest[1];
    if (!(typeof zoom === 'object' && typeof zoom.name === 'string')) {
      return false;
  ***REMOVED***
    switch (zoom.name) {
      case 'XYZ':
        if (destLength !== 5) {
          return false;
      ***REMOVED***
        break;
      case 'Fit':
      case 'FitB':
        return destLength === 2;
      case 'FitH':
      case 'FitBH':
      case 'FitV':
      case 'FitBV':
        if (destLength !== 3) {
          return false;
      ***REMOVED***
        break;
      case 'FitR':
        if (destLength !== 6) {
          return false;
      ***REMOVED***
        allowNull = false;
        break;
      default:
        return false;
  ***REMOVED***
    for (var i = 2; i < destLength; i++) {
      var param = dest[i];
      if (!(typeof param === 'number' || allowNull && param === null)) {
        return false;
    ***REMOVED***
  ***REMOVED***
    return true;
***REMOVED***
  return PDFLinkService;
}();
var SimpleLinkService = function SimpleLinkServiceClosure() {
  function SimpleLinkService() {}
  SimpleLinkService.prototype = {
    get page() {
      return 0;
  ***REMOVED***,
    set page(value) {},
    navigateTo: function (dest) {},
    getDestinationHash: function (dest) {
      return '#';
  ***REMOVED***,
    getAnchorUrl: function (hash) {
      return '#';
  ***REMOVED***,
    setHash: function (hash) {},
    executeNamedAction: function (action) {},
    onFileAttachmentAnnotation: function (params) {},
    cachePageRef: function (pageNum, pageRef) {}
***REMOVED***;
  return SimpleLinkService;
}();
exports.PDFLinkService = PDFLinkService;
exports.SimpleLinkService = SimpleLinkService;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtilsLib = __webpack_require__(0);
var downloadManagerLib = __webpack_require__(11);
var pdfHistoryLib = __webpack_require__(18);
var preferencesLib = __webpack_require__(8);
var pdfSidebarLib = __webpack_require__(22);
var viewHistoryLib = __webpack_require__(29);
var pdfThumbnailViewerLib = __webpack_require__(24);
var toolbarLib = __webpack_require__(28);
var secondaryToolbarLib = __webpack_require__(26);
var passwordPromptLib = __webpack_require__(14);
var pdfPresentationModeLib = __webpack_require__(21);
var pdfDocumentPropertiesLib = __webpack_require__(16);
var handToolLib = __webpack_require__(13);
var pdfViewerLib = __webpack_require__(25);
var pdfRenderingQueueLib = __webpack_require__(3);
var pdfLinkServiceLib = __webpack_require__(5);
var pdfOutlineViewerLib = __webpack_require__(19);
var overlayManagerLib = __webpack_require__(4);
var pdfAttachmentViewerLib = __webpack_require__(15);
var pdfFindControllerLib = __webpack_require__(7);
var pdfFindBarLib = __webpack_require__(17);
var domEventsLib = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var UNKNOWN_SCALE = uiUtilsLib.UNKNOWN_SCALE;
var DEFAULT_SCALE_VALUE = uiUtilsLib.DEFAULT_SCALE_VALUE;
var MIN_SCALE = uiUtilsLib.MIN_SCALE;
var MAX_SCALE = uiUtilsLib.MAX_SCALE;
var ProgressBar = uiUtilsLib.ProgressBar;
var getPDFFileNameFromURL = uiUtilsLib.getPDFFileNameFromURL;
var noContextMenuHandler = uiUtilsLib.noContextMenuHandler;
var mozL10n = uiUtilsLib.mozL10n;
var parseQueryString = uiUtilsLib.parseQueryString;
var PDFHistory = pdfHistoryLib.PDFHistory;
var Preferences = preferencesLib.Preferences;
var SidebarView = pdfSidebarLib.SidebarView;
var PDFSidebar = pdfSidebarLib.PDFSidebar;
var ViewHistory = viewHistoryLib.ViewHistory;
var PDFThumbnailViewer = pdfThumbnailViewerLib.PDFThumbnailViewer;
var Toolbar = toolbarLib.Toolbar;
var SecondaryToolbar = secondaryToolbarLib.SecondaryToolbar;
var PasswordPrompt = passwordPromptLib.PasswordPrompt;
var PDFPresentationMode = pdfPresentationModeLib.PDFPresentationMode;
var PDFDocumentProperties = pdfDocumentPropertiesLib.PDFDocumentProperties;
var HandTool = handToolLib.HandTool;
var PresentationModeState = pdfViewerLib.PresentationModeState;
var PDFViewer = pdfViewerLib.PDFViewer;
var RenderingStates = pdfRenderingQueueLib.RenderingStates;
var PDFRenderingQueue = pdfRenderingQueueLib.PDFRenderingQueue;
var PDFLinkService = pdfLinkServiceLib.PDFLinkService;
var PDFOutlineViewer = pdfOutlineViewerLib.PDFOutlineViewer;
var OverlayManager = overlayManagerLib.OverlayManager;
var PDFAttachmentViewer = pdfAttachmentViewerLib.PDFAttachmentViewer;
var PDFFindController = pdfFindControllerLib.PDFFindController;
var PDFFindBar = pdfFindBarLib.PDFFindBar;
var getGlobalEventBus = domEventsLib.getGlobalEventBus;
var normalizeWheelEventDelta = uiUtilsLib.normalizeWheelEventDelta;
var animationStarted = uiUtilsLib.animationStarted;
var localized = uiUtilsLib.localized;
var RendererType = uiUtilsLib.RendererType;
var DEFAULT_SCALE_DELTA = 1.1;
var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
function configure(PDFJS) {
  PDFJS.imageResourcesPath = './images/';
  PDFJS.workerSrc = '../build/pdf.worker.js';
  PDFJS.cMapUrl = '../web/cmaps/';
  PDFJS.cMapPacked = true;
}
var DefaultExernalServices = {
  updateFindControlState: function (data) {},
  initPassiveLoading: function (callbacks) {},
  fallback: function (data, callback) {},
  reportTelemetry: function (data) {},
  createDownloadManager: function () {
    return new downloadManagerLib.DownloadManager();
***REMOVED***,
  supportsIntegratedFind: false,
  supportsDocumentFonts: true,
  supportsDocumentColors: true,
  supportedMouseWheelZoomModifierKeys: {
    ctrlKey: true,
    metaKey: true
***REMOVED***
***REMOVED***
var PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  initialDestination: null,
  initialized: false,
  fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  store: null,
  downloadManager: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  pageRotation: 0,
  isInitialViewSet: false,
  viewerPrefs: {
    sidebarViewOnLoad: SidebarView.NONE,
    pdfBugEnabled: false,
    showPreviousViewOnLoad: true,
    defaultZoomValue: '',
    disablePageLabels: false,
    renderer: 'canvas',
    enhanceTextSelection: false,
    renderInteractiveForms: false,
    enablePrintAutoRotate: false
***REMOVED***,
  isViewerEmbedded: window.parent !== window,
  url: '',
  baseUrl: '',
  externalServices: DefaultExernalServices,
  initialize: function pdfViewInitialize(appConfig) {
    var self = this;
    var PDFJS = pdfjsLib.PDFJS;
    Preferences.initialize();
    this.preferences = Preferences;
    configure(PDFJS);
    this.appConfig = appConfig;
    return this._readPreferences().then(function () {
      return self._initializeViewerComponents();
  ***REMOVED***).then(function () {
      self.bindEvents();
      self.bindWindowEvents();
      localized.then(function () {
        self.eventBus.dispatch('localized');
    ***REMOVED***);
      if (self.isViewerEmbedded && !PDFJS.isExternalLinkTargetSet()) {
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.TOP;
    ***REMOVED***
      self.initialized = true;
  ***REMOVED***);
***REMOVED***,
  _readPreferences: function () {
    var self = this;
    var PDFJS = pdfjsLib.PDFJS;
    return Promise.all([Preferences.get('enableWebGL').then(function resolved(value) {
      PDFJS.disableWebGL = !value;
  ***REMOVED***), Preferences.get('sidebarViewOnLoad').then(function resolved(value) {
      self.viewerPrefs['sidebarViewOnLoad'] = value;
  ***REMOVED***), Preferences.get('pdfBugEnabled').then(function resolved(value) {
      self.viewerPrefs['pdfBugEnabled'] = value;
  ***REMOVED***), Preferences.get('showPreviousViewOnLoad').then(function resolved(value) {
      self.viewerPrefs['showPreviousViewOnLoad'] = value;
  ***REMOVED***), Preferences.get('defaultZoomValue').then(function resolved(value) {
      self.viewerPrefs['defaultZoomValue'] = value;
  ***REMOVED***), Preferences.get('enhanceTextSelection').then(function resolved(value) {
      self.viewerPrefs['enhanceTextSelection'] = value;
  ***REMOVED***), Preferences.get('disableTextLayer').then(function resolved(value) {
      if (PDFJS.disableTextLayer === true) {
        return;
    ***REMOVED***
      PDFJS.disableTextLayer = value;
  ***REMOVED***), Preferences.get('disableRange').then(function resolved(value) {
      if (PDFJS.disableRange === true) {
        return;
    ***REMOVED***
      PDFJS.disableRange = value;
  ***REMOVED***), Preferences.get('disableStream').then(function resolved(value) {
      if (PDFJS.disableStream === true) {
        return;
    ***REMOVED***
      PDFJS.disableStream = value;
  ***REMOVED***), Preferences.get('disableAutoFetch').then(function resolved(value) {
      PDFJS.disableAutoFetch = value;
  ***REMOVED***), Preferences.get('disableFontFace').then(function resolved(value) {
      if (PDFJS.disableFontFace === true) {
        return;
    ***REMOVED***
      PDFJS.disableFontFace = value;
  ***REMOVED***), Preferences.get('useOnlyCssZoom').then(function resolved(value) {
      PDFJS.useOnlyCssZoom = value;
  ***REMOVED***), Preferences.get('externalLinkTarget').then(function resolved(value) {
      if (PDFJS.isExternalLinkTargetSet()) {
        return;
    ***REMOVED***
      PDFJS.externalLinkTarget = value;
  ***REMOVED***), Preferences.get('renderer').then(function resolved(value) {
      self.viewerPrefs['renderer'] = value;
  ***REMOVED***), Preferences.get('renderInteractiveForms').then(function resolved(value) {
      self.viewerPrefs['renderInteractiveForms'] = value;
  ***REMOVED***), Preferences.get('disablePageLabels').then(function resolved(value) {
      self.viewerPrefs['disablePageLabels'] = value;
  ***REMOVED***), Preferences.get('enablePrintAutoRotate').then(function resolved(value) {
      self.viewerPrefs['enablePrintAutoRotate'] = value;
  ***REMOVED***)]).catch(function (reason) {});
***REMOVED***,
  _initializeViewerComponents: function () {
    var self = this;
    var appConfig = this.appConfig;
    return new Promise(function (resolve, reject) {
      var eventBus = appConfig.eventBus || getGlobalEventBus();
      self.eventBus = eventBus;
      var pdfRenderingQueue = new PDFRenderingQueue();
      pdfRenderingQueue.onIdle = self.cleanup.bind(self);
      self.pdfRenderingQueue = pdfRenderingQueue;
      var pdfLinkService = new PDFLinkService({ eventBus: eventBus });
      self.pdfLinkService = pdfLinkService;
      var downloadManager = self.externalServices.createDownloadManager();
      self.downloadManager = downloadManager;
      var container = appConfig.mainContainer;
      var viewer = appConfig.viewerContainer;
      self.pdfViewer = new PDFViewer({
        container: container,
        viewer: viewer,
        eventBus: eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        downloadManager: downloadManager,
        renderer: self.viewerPrefs['renderer'],
        enhanceTextSelection: self.viewerPrefs['enhanceTextSelection'],
        renderInteractiveForms: self.viewerPrefs['renderInteractiveForms'],
        enablePrintAutoRotate: self.viewerPrefs['enablePrintAutoRotate']
    ***REMOVED***);
      pdfRenderingQueue.setViewer(self.pdfViewer);
      pdfLinkService.setViewer(self.pdfViewer);
      var thumbnailContainer = appConfig.sidebar.thumbnailView;
      self.pdfThumbnailViewer = new PDFThumbnailViewer({
        container: thumbnailContainer,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService
    ***REMOVED***);
      pdfRenderingQueue.setThumbnailViewer(self.pdfThumbnailViewer);
      self.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus: eventBus
    ***REMOVED***);
      pdfLinkService.setHistory(self.pdfHistory);
      self.findController = new PDFFindController({ pdfViewer: self.pdfViewer });
      self.findController.onUpdateResultsCount = function (matchCount) {
        if (self.supportsIntegratedFind) {
          return;
      ***REMOVED***
        self.findBar.updateResultsCount(matchCount);
    ***REMOVED***;
      self.findController.onUpdateState = function (state, previous, matchCount) {
        if (self.supportsIntegratedFind) {
          self.externalServices.updateFindControlState({
            result: state,
            findPrevious: previous
        ***REMOVED***);
      ***REMOVED*** else {
          self.findBar.updateUIState(state, previous, matchCount);
      ***REMOVED***
    ***REMOVED***;
      self.pdfViewer.setFindController(self.findController);
      var findBarConfig = Object.create(appConfig.findBar);
      findBarConfig.findController = self.findController;
      findBarConfig.eventBus = eventBus;
      self.findBar = new PDFFindBar(findBarConfig);
      self.overlayManager = OverlayManager;
      self.handTool = new HandTool({
        container: container,
        eventBus: eventBus
    ***REMOVED***);
      self.pdfDocumentProperties = new PDFDocumentProperties(appConfig.documentProperties);
      self.toolbar = new Toolbar(appConfig.toolbar, container, eventBus);
      self.secondaryToolbar = new SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);
      if (self.supportsFullscreen) {
        self.pdfPresentationMode = new PDFPresentationMode({
          container: container,
          viewer: viewer,
          pdfViewer: self.pdfViewer,
          eventBus: eventBus,
          contextMenuItems: appConfig.fullscreen
      ***REMOVED***);
    ***REMOVED***
      self.passwordPrompt = new PasswordPrompt(appConfig.passwordOverlay);
      self.pdfOutlineViewer = new PDFOutlineViewer({
        container: appConfig.sidebar.outlineView,
        eventBus: eventBus,
        linkService: pdfLinkService
    ***REMOVED***);
      self.pdfAttachmentViewer = new PDFAttachmentViewer({
        container: appConfig.sidebar.attachmentsView,
        eventBus: eventBus,
        downloadManager: downloadManager
    ***REMOVED***);
      var sidebarConfig = Object.create(appConfig.sidebar);
      sidebarConfig.pdfViewer = self.pdfViewer;
      sidebarConfig.pdfThumbnailViewer = self.pdfThumbnailViewer;
      sidebarConfig.pdfOutlineViewer = self.pdfOutlineViewer;
      sidebarConfig.eventBus = eventBus;
      self.pdfSidebar = new PDFSidebar(sidebarConfig);
      self.pdfSidebar.onToggled = self.forceRendering.bind(self);
      resolve(undefined);
  ***REMOVED***);
***REMOVED***,
  run: function pdfViewRun(config) {
    this.initialize(config).then(webViewerInitialized);
***REMOVED***,
  zoomIn: function pdfViewZoomIn(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
  ***REMOVED*** while (--ticks > 0 && newScale < MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
***REMOVED***,
  zoomOut: function pdfViewZoomOut(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
  ***REMOVED*** while (--ticks > 0 && newScale > MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
***REMOVED***,
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
***REMOVED***,
  set page(val) {
    this.pdfViewer.currentPageNumber = val;
***REMOVED***,
  get page() {
    return this.pdfViewer.currentPageNumber;
***REMOVED***,
  get printing() {
    return !!this.printService;
***REMOVED***,
  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
***REMOVED***,
  get supportsFullscreen() {
    var support;
    var doc = document.documentElement;
    support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen || doc.msRequestFullscreen);
    if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false || document.msFullscreenEnabled === false) {
      support = false;
  ***REMOVED***
    if (support && pdfjsLib.PDFJS.disableFullscreen === true) {
      support = false;
  ***REMOVED***
    return pdfjsLib.shadow(this, 'supportsFullscreen', support);
***REMOVED***,
  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
***REMOVED***,
  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
***REMOVED***,
  get supportsDocumentColors() {
    return this.externalServices.supportsDocumentColors;
***REMOVED***,
  get loadingBar() {
    var bar = new ProgressBar('#loadingBar', {});
    return pdfjsLib.shadow(this, 'loadingBar', bar);
***REMOVED***,
  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
***REMOVED***,
  initPassiveLoading: function pdfViewInitPassiveLoading() {
    throw new Error('Not implemented: initPassiveLoading');
***REMOVED***,
  setTitleUsingUrl: function pdfViewSetTitleUsingUrl(url) {
    this.url = url;
    this.baseUrl = url.split('#')[0];
    var title = getPDFFileNameFromURL(url, '');
    if (!title) {
      try {
        title = decodeURIComponent(pdfjsLib.getFilenameFromUrl(url)) || url;
    ***REMOVED*** catch (e) {
        title = url;
    ***REMOVED***
  ***REMOVED***
    this.setTitle(title);
***REMOVED***,
  setTitle: function pdfViewSetTitle(title) {
    if (this.isViewerEmbedded) {
      return;
  ***REMOVED***
    document.title = title;
***REMOVED***,
  close: function pdfViewClose() {
    var errorWrapper = this.appConfig.errorWrapper.container;
    errorWrapper.setAttribute('hidden', 'true');
    if (!this.pdfLoadingTask) {
      return Promise.resolve();
  ***REMOVED***
    var promise = this.pdfLoadingTask.destroy();
    this.pdfLoadingTask = null;
    if (this.pdfDocument) {
      this.pdfDocument = null;
      this.pdfThumbnailViewer.setDocument(null);
      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null, null);
  ***REMOVED***
    this.store = null;
    this.isInitialViewSet = false;
    this.pdfSidebar.reset();
    this.pdfOutlineViewer.reset();
    this.pdfAttachmentViewer.reset();
    this.findController.reset();
    this.findBar.reset();
    this.toolbar.reset();
    this.secondaryToolbar.reset();
    if (typeof PDFBug !== 'undefined') {
      PDFBug.cleanup();
  ***REMOVED***
    return promise;
***REMOVED***,
  open: function pdfViewOpen(file, args) {
    if (arguments.length > 2 || typeof args === 'number') {
      return Promise.reject(new Error('Call of open() with obsolete signature.'));
  ***REMOVED***
    if (this.pdfLoadingTask) {
      return this.close().then(function () {
        Preferences.reload();
        return this.open(file, args);
    ***REMOVED***.bind(this));
  ***REMOVED***
    var parameters = Object.create(null),
        scale;
    if (typeof file === 'string') {
      this.setTitleUsingUrl(file);
      parameters.url = file;
  ***REMOVED*** else if (file && 'byteLength' in file) {
      parameters.data = file;
  ***REMOVED*** else if (file.url && file.originalUrl) {
      this.setTitleUsingUrl(file.originalUrl);
      parameters.url = file.url;
  ***REMOVED***
    if (args) {
      for (var prop in args) {
        parameters[prop] = args[prop];
    ***REMOVED***
      if (args.scale) {
        scale = args.scale;
    ***REMOVED***
      if (args.length) {
        this.pdfDocumentProperties.setFileSize(args.length);
    ***REMOVED***
  ***REMOVED***
    var self = this;
    self.downloadComplete = false;
    var loadingTask = pdfjsLib.getDocument(parameters);
    this.pdfLoadingTask = loadingTask;
    loadingTask.onPassword = function passwordNeeded(updateCallback, reason) {
      self.passwordPrompt.setUpdateCallback(updateCallback, reason);
      self.passwordPrompt.open();
  ***REMOVED***;
    loadingTask.onProgress = function getDocumentProgress(progressData) {
      self.progress(progressData.loaded / progressData.total);
  ***REMOVED***;
    loadingTask.onUnsupportedFeature = this.fallback.bind(this);
    return loadingTask.promise.then(function getDocumentCallback(pdfDocument) {
      self.load(pdfDocument, scale);
  ***REMOVED***, function getDocumentError(exception) {
      var message = exception && exception.message;
      var loadingErrorMessage = mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
      if (exception instanceof pdfjsLib.InvalidPDFException) {
        loadingErrorMessage = mozL10n.get('invalid_file_error', null, 'Invalid or corrupted PDF file.');
    ***REMOVED*** else if (exception instanceof pdfjsLib.MissingPDFException) {
        loadingErrorMessage = mozL10n.get('missing_file_error', null, 'Missing PDF file.');
    ***REMOVED*** else if (exception instanceof pdfjsLib.UnexpectedResponseException) {
        loadingErrorMessage = mozL10n.get('unexpected_response_error', null, 'Unexpected server response.');
    ***REMOVED***
      var moreInfo = { message: message ***REMOVED***
      self.error(loadingErrorMessage, moreInfo);
      throw new Error(loadingErrorMessage);
  ***REMOVED***);
***REMOVED***,
  download: function pdfViewDownload() {
    function downloadByUrl() {
      downloadManager.downloadUrl(url, filename);
  ***REMOVED***
    var url = this.baseUrl;
    var filename = getPDFFileNameFromURL(this.url);
    var downloadManager = this.downloadManager;
    downloadManager.onerror = function (err) {
      PDFViewerApplication.error('PDF failed to download.');
  ***REMOVED***;
    if (!this.pdfDocument) {
      downloadByUrl();
      return;
  ***REMOVED***
    if (!this.downloadComplete) {
      downloadByUrl();
      return;
  ***REMOVED***
    this.pdfDocument.getData().then(function getDataSuccess(data) {
      var blob = pdfjsLib.createBlob(data, 'application/pdf');
      downloadManager.download(blob, url, filename);
  ***REMOVED***, downloadByUrl).then(null, downloadByUrl);
***REMOVED***,
  fallback: function pdfViewFallback(featureId) {},
  error: function pdfViewError(message, moreInfo) {
    var moreInfoText = mozL10n.get('error_version_info', {
      version: pdfjsLib.version || '?',
      build: pdfjsLib.build || '?'
  ***REMOVED***, 'PDF.js v{{version}} (build: {{build}})') + '\n';
    if (moreInfo) {
      moreInfoText += mozL10n.get('error_message', { message: moreInfo.message }, 'Message: {{message}}');
      if (moreInfo.stack) {
        moreInfoText += '\n' + mozL10n.get('error_stack', { stack: moreInfo.stack }, 'Stack: {{stack}}');
    ***REMOVED*** else {
        if (moreInfo.filename) {
          moreInfoText += '\n' + mozL10n.get('error_file', { file: moreInfo.filename }, 'File: {{file}}');
      ***REMOVED***
        if (moreInfo.lineNumber) {
          moreInfoText += '\n' + mozL10n.get('error_line', { line: moreInfo.lineNumber }, 'Line: {{line}}');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
    var errorWrapperConfig = this.appConfig.errorWrapper;
    var errorWrapper = errorWrapperConfig.container;
    errorWrapper.removeAttribute('hidden');
    var errorMessage = errorWrapperConfig.errorMessage;
    errorMessage.textContent = message;
    var closeButton = errorWrapperConfig.closeButton;
    closeButton.onclick = function () {
      errorWrapper.setAttribute('hidden', 'true');
  ***REMOVED***;
    var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
    var moreInfoButton = errorWrapperConfig.moreInfoButton;
    var lessInfoButton = errorWrapperConfig.lessInfoButton;
    moreInfoButton.onclick = function () {
      errorMoreInfo.removeAttribute('hidden');
      moreInfoButton.setAttribute('hidden', 'true');
      lessInfoButton.removeAttribute('hidden');
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + 'px';
  ***REMOVED***;
    lessInfoButton.onclick = function () {
      errorMoreInfo.setAttribute('hidden', 'true');
      moreInfoButton.removeAttribute('hidden');
      lessInfoButton.setAttribute('hidden', 'true');
  ***REMOVED***;
    moreInfoButton.oncontextmenu = noContextMenuHandler;
    lessInfoButton.oncontextmenu = noContextMenuHandler;
    closeButton.oncontextmenu = noContextMenuHandler;
    moreInfoButton.removeAttribute('hidden');
    lessInfoButton.setAttribute('hidden', 'true');
    errorMoreInfo.value = moreInfoText;
***REMOVED***,
  progress: function pdfViewProgress(level) {
    var percent = Math.round(level * 100);
    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
      if (pdfjsLib.PDFJS.disableAutoFetch && percent) {
        if (this.disableAutoFetchLoadingBarTimeout) {
          clearTimeout(this.disableAutoFetchLoadingBarTimeout);
          this.disableAutoFetchLoadingBarTimeout = null;
      ***REMOVED***
        this.loadingBar.show();
        this.disableAutoFetchLoadingBarTimeout = setTimeout(function () {
          this.loadingBar.hide();
          this.disableAutoFetchLoadingBarTimeout = null;
      ***REMOVED***.bind(this), DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
    ***REMOVED***
  ***REMOVED***
***REMOVED***,
  load: function pdfViewLoad(pdfDocument, scale) {
    var self = this;
    scale = scale || UNKNOWN_SCALE;
    this.pdfDocument = pdfDocument;
    this.pdfDocumentProperties.setDocumentAndUrl(pdfDocument, this.url);
    var downloadedPromise = pdfDocument.getDownloadInfo().then(function () {
      self.downloadComplete = true;
      self.loadingBar.hide();
  ***REMOVED***);
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    var id = this.documentFingerprint = pdfDocument.fingerprint;
    var store = this.store = new ViewHistory(id);
    var baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    var pdfViewer = this.pdfViewer;
    pdfViewer.currentScale = scale;
    pdfViewer.setDocument(pdfDocument);
    var firstPagePromise = pdfViewer.firstPagePromise;
    var pagesPromise = pdfViewer.pagesPromise;
    var onePageRendered = pdfViewer.onePageRendered;
    this.pageRotation = 0;
    var pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    firstPagePromise.then(function (pdfPage) {
      downloadedPromise.then(function () {
        self.eventBus.dispatch('documentload', { source: self });
    ***REMOVED***);
      self.loadingBar.setWidth(self.appConfig.viewerContainer);
      if (!pdfjsLib.PDFJS.disableHistory && !self.isViewerEmbedded) {
        if (!self.viewerPrefs['showPreviousViewOnLoad']) {
          self.pdfHistory.clearHistoryState();
      ***REMOVED***
        self.pdfHistory.initialize(self.documentFingerprint);
        if (self.pdfHistory.initialDestination) {
          self.initialDestination = self.pdfHistory.initialDestination;
      ***REMOVED*** else if (self.pdfHistory.initialBookmark) {
          self.initialBookmark = self.pdfHistory.initialBookmark;
      ***REMOVED***
    ***REMOVED***
      var initialParams = {
        destination: self.initialDestination,
        bookmark: self.initialBookmark,
        hash: null
    ***REMOVED***;
      store.initializedPromise.then(function resolved() {
        var storedHash = null,
            sidebarView = null;
        if (self.viewerPrefs['showPreviousViewOnLoad'] && store.get('exists', false)) {
          var pageNum = store.get('page', '1');
          var zoom = self.viewerPrefs['defaultZoomValue'] || store.get('zoom', DEFAULT_SCALE_VALUE);
          var left = store.get('scrollLeft', '0');
          var top = store.get('scrollTop', '0');
          storedHash = 'page=' + pageNum + '&zoom=' + zoom + ',' + left + ',' + top;
          sidebarView = store.get('sidebarView', SidebarView.NONE);
      ***REMOVED*** else if (self.viewerPrefs['defaultZoomValue']) {
          storedHash = 'page=1&zoom=' + self.viewerPrefs['defaultZoomValue'];
      ***REMOVED***
        self.setInitialView(storedHash, {
          scale: scale,
          sidebarView: sidebarView
      ***REMOVED***);
        initialParams.hash = storedHash;
        if (!self.isViewerEmbedded) {
          self.pdfViewer.focus();
      ***REMOVED***
    ***REMOVED***, function rejected(reason) {
        console.error(reason);
        self.setInitialView(null, { scale: scale });
    ***REMOVED***);
      pagesPromise.then(function resolved() {
        if (!initialParams.destination && !initialParams.bookmark && !initialParams.hash) {
          return;
      ***REMOVED***
        if (self.hasEqualPageSizes) {
          return;
      ***REMOVED***
        self.initialDestination = initialParams.destination;
        self.initialBookmark = initialParams.bookmark;
        self.pdfViewer.currentScaleValue = self.pdfViewer.currentScaleValue;
        self.setInitialView(initialParams.hash);
    ***REMOVED***);
  ***REMOVED***);
    pdfDocument.getPageLabels().then(function (labels) {
      if (!labels || self.viewerPrefs['disablePageLabels']) {
        return;
    ***REMOVED***
      var i = 0,
          numLabels = labels.length;
      if (numLabels !== self.pagesCount) {
        console.error('The number of Page Labels does not match ' + 'the number of pages in the document.');
        return;
    ***REMOVED***
      while (i < numLabels && labels[i] === (i + 1).toString()) {
        i++;
    ***REMOVED***
      if (i === numLabels) {
        return;
    ***REMOVED***
      pdfViewer.setPageLabels(labels);
      pdfThumbnailViewer.setPageLabels(labels);
      self.toolbar.setPagesCount(pdfDocument.numPages, true);
      self.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  ***REMOVED***);
    pagesPromise.then(function () {
      if (self.supportsPrinting) {
        pdfDocument.getJavaScript().then(function (javaScript) {
          if (javaScript.length) {
            console.warn('Warning: JavaScript is not supported');
            self.fallback(pdfjsLib.UNSUPPORTED_FEATURES.javaScript);
        ***REMOVED***
          var regex = /\bprint\s*\(/;
          for (var i = 0, ii = javaScript.length; i < ii; i++) {
            var js = javaScript[i];
            if (js && regex.test(js)) {
              setTimeout(function () {
                window.print();
            ***REMOVED***);
              return;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***);
    Promise.all([onePageRendered, animationStarted]).then(function () {
      pdfDocument.getOutline().then(function (outline) {
        self.pdfOutlineViewer.render({ outline: outline });
    ***REMOVED***);
      pdfDocument.getAttachments().then(function (attachments) {
        self.pdfAttachmentViewer.render({ attachments: attachments });
    ***REMOVED***);
  ***REMOVED***);
    pdfDocument.getMetadata().then(function (data) {
      var info = data.info,
          metadata = data.metadata;
      self.documentInfo = info;
      self.metadata = metadata;
      console.log('PDF ' + pdfDocument.fingerprint + ' [' + info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() + ' / ' + (info.Creator || '-').trim() + ']' + ' (PDF.js: ' + (pdfjsLib.version || '-') + (!pdfjsLib.PDFJS.disableWebGL ? ' [WebGL]' : '') + ')');
      var pdfTitle;
      if (metadata && metadata.has('dc:title')) {
        var title = metadata.get('dc:title');
        if (title !== 'Untitled') {
          pdfTitle = title;
      ***REMOVED***
    ***REMOVED***
      if (!pdfTitle && info && info['Title']) {
        pdfTitle = info['Title'];
    ***REMOVED***
      if (pdfTitle) {
        self.setTitle(pdfTitle + ' - ' + document.title);
    ***REMOVED***
      if (info.IsAcroFormPresent) {
        console.warn('Warning: AcroForm/XFA is not supported');
        self.fallback(pdfjsLib.UNSUPPORTED_FEATURES.forms);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***,
  setInitialView: function pdfViewSetInitialView(storedHash, options) {
    var scale = options && options.scale;
    var sidebarView = options && options.sidebarView;
    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(this.viewerPrefs['sidebarViewOnLoad'] || sidebarView | 0);
    if (this.initialDestination) {
      this.pdfLinkService.navigateTo(this.initialDestination);
      this.initialDestination = null;
  ***REMOVED*** else if (this.initialBookmark) {
      this.pdfLinkService.setHash(this.initialBookmark);
      this.pdfHistory.push({ hash: this.initialBookmark }, true);
      this.initialBookmark = null;
  ***REMOVED*** else if (storedHash) {
      this.pdfLinkService.setHash(storedHash);
  ***REMOVED*** else if (scale) {
      this.pdfViewer.currentScaleValue = scale;
      this.page = 1;
  ***REMOVED***
    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);
    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
  ***REMOVED***
***REMOVED***,
  cleanup: function pdfViewCleanup() {
    if (!this.pdfDocument) {
      return;
  ***REMOVED***
    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();
    if (this.pdfViewer.renderer !== RendererType.SVG) {
      this.pdfDocument.cleanup();
  ***REMOVED***
***REMOVED***,
  forceRendering: function pdfViewForceRendering() {
    this.pdfRenderingQueue.printing = this.printing;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
    this.pdfRenderingQueue.renderHighestPriority();
***REMOVED***,
  beforePrint: function pdfViewSetupBeforePrint() {
    if (this.printService) {
      return;
  ***REMOVED***
    if (!this.supportsPrinting) {
      var printMessage = mozL10n.get('printing_not_supported', null, 'Warning: Printing is not fully supported by this browser.');
      this.error(printMessage);
      return;
  ***REMOVED***
    if (!this.pdfViewer.pageViewsReady) {
      var notReadyMessage = mozL10n.get('printing_not_ready', null, 'Warning: The PDF is not fully loaded for printing.');
      window.alert(notReadyMessage);
      return;
  ***REMOVED***
    var pagesOverview = this.pdfViewer.getPagesOverview();
    var printContainer = this.appConfig.printContainer;
    var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
***REMOVED***,
  get hasEqualPageSizes() {
    var firstPage = this.pdfViewer.getPageView(0);
    for (var i = 1, ii = this.pagesCount; i < ii; ++i) {
      var pageView = this.pdfViewer.getPageView(i);
      if (pageView.width !== firstPage.width || pageView.height !== firstPage.height) {
        return false;
    ***REMOVED***
  ***REMOVED***
    return true;
***REMOVED***,
  afterPrint: function pdfViewSetupAfterPrint() {
    if (this.printService) {
      this.printService.destroy();
      this.printService = null;
  ***REMOVED***
    this.forceRendering();
***REMOVED***,
  rotatePages: function pdfViewRotatePages(delta) {
    var pageNumber = this.page;
    this.pageRotation = (this.pageRotation + 360 + delta) % 360;
    this.pdfViewer.pagesRotation = this.pageRotation;
    this.pdfThumbnailViewer.pagesRotation = this.pageRotation;
    this.forceRendering();
    this.pdfViewer.currentPageNumber = pageNumber;
***REMOVED***,
  requestPresentationMode: function pdfViewRequestPresentationMode() {
    if (!this.pdfPresentationMode) {
      return;
  ***REMOVED***
    this.pdfPresentationMode.request();
***REMOVED***,
  bindEvents: function pdfViewBindEvents() {
    var eventBus = this.eventBus;
    eventBus.on('resize', webViewerResize);
    eventBus.on('hashchange', webViewerHashchange);
    eventBus.on('beforeprint', this.beforePrint.bind(this));
    eventBus.on('afterprint', this.afterPrint.bind(this));
    eventBus.on('pagerendered', webViewerPageRendered);
    eventBus.on('textlayerrendered', webViewerTextLayerRendered);
    eventBus.on('updateviewarea', webViewerUpdateViewarea);
    eventBus.on('pagechanging', webViewerPageChanging);
    eventBus.on('scalechanging', webViewerScaleChanging);
    eventBus.on('sidebarviewchanged', webViewerSidebarViewChanged);
    eventBus.on('pagemode', webViewerPageMode);
    eventBus.on('namedaction', webViewerNamedAction);
    eventBus.on('presentationmodechanged', webViewerPresentationModeChanged);
    eventBus.on('presentationmode', webViewerPresentationMode);
    eventBus.on('openfile', webViewerOpenFile);
    eventBus.on('print', webViewerPrint);
    eventBus.on('download', webViewerDownload);
    eventBus.on('firstpage', webViewerFirstPage);
    eventBus.on('lastpage', webViewerLastPage);
    eventBus.on('nextpage', webViewerNextPage);
    eventBus.on('previouspage', webViewerPreviousPage);
    eventBus.on('zoomin', webViewerZoomIn);
    eventBus.on('zoomout', webViewerZoomOut);
    eventBus.on('pagenumberchanged', webViewerPageNumberChanged);
    eventBus.on('scalechanged', webViewerScaleChanged);
    eventBus.on('rotatecw', webViewerRotateCw);
    eventBus.on('rotateccw', webViewerRotateCcw);
    eventBus.on('documentproperties', webViewerDocumentProperties);
    eventBus.on('find', webViewerFind);
    eventBus.on('findfromurlhash', webViewerFindFromUrlHash);
    eventBus.on('fileinputchange', webViewerFileInputChange);
***REMOVED***,
  bindWindowEvents: function pdfViewBindWindowEvents() {
    var eventBus = this.eventBus;
    window.addEventListener('wheel', webViewerWheel);
    window.addEventListener('click', webViewerClick);
    window.addEventListener('keydown', webViewerKeyDown);
    window.addEventListener('resize', function windowResize() {
      eventBus.dispatch('resize');
  ***REMOVED***);
    window.addEventListener('hashchange', function windowHashChange() {
      eventBus.dispatch('hashchange', { hash: document.location.hash.substring(1) });
  ***REMOVED***);
    window.addEventListener('beforeprint', function windowBeforePrint() {
      eventBus.dispatch('beforeprint');
  ***REMOVED***);
    window.addEventListener('afterprint', function windowAfterPrint() {
      eventBus.dispatch('afterprint');
  ***REMOVED***);
    window.addEventListener('change', function windowChange(evt) {
      var files = evt.target.files;
      if (!files || files.length === 0) {
        return;
    ***REMOVED***
      eventBus.dispatch('fileinputchange', { fileInput: evt.target });
  ***REMOVED***);
***REMOVED***
***REMOVED***
var validateFileURL;
var HOSTED_VIEWER_ORIGINS = ['null', 'http://mozilla.github.io', 'https://mozilla.github.io'];
validateFileURL = function validateFileURL(file) {
  try {
    var viewerOrigin = new URL(window.location.href).origin || 'null';
    if (HOSTED_VIEWER_ORIGINS.indexOf(viewerOrigin) >= 0) {
      return;
  ***REMOVED***
    var fileOrigin = new URL(file, window.location.href).origin;
    if (fileOrigin !== viewerOrigin) {
      throw new Error('file origin does not match viewer\'s');
  ***REMOVED***
***REMOVED*** catch (e) {
    var message = e && e.message;
    var loadingErrorMessage = mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
    var moreInfo = { message: message ***REMOVED***
    PDFViewerApplication.error(loadingErrorMessage, moreInfo);
    throw e;
***REMOVED***
***REMOVED***
function loadAndEnablePDFBug(enabledTabs) {
  return new Promise(function (resolve, reject) {
    var appConfig = PDFViewerApplication.appConfig;
    var script = document.createElement('script');
    script.src = appConfig.debuggerScriptPath;
    script.onload = function () {
      PDFBug.enable(enabledTabs);
      PDFBug.init(pdfjsLib, appConfig.mainContainer);
      resolve();
  ***REMOVED***;
    script.onerror = function () {
      reject(new Error('Cannot load debugger at ' + script.src));
  ***REMOVED***;
    (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
***REMOVED***);
}
function webViewerInitialized() {
  var appConfig = PDFViewerApplication.appConfig;
  var file;
  var queryString = document.location.search.substring(1);
  var params = parseQueryString(queryString);
  file = 'file' in params ? params.file : appConfig.defaultUrl;
  validateFileURL(file);
  var waitForBeforeOpening = [];
  var fileInput = document.createElement('input');
  fileInput.id = appConfig.openFileInputName;
  fileInput.className = 'fileInput';
  fileInput.setAttribute('type', 'file');
  fileInput.oncontextmenu = noContextMenuHandler;
  document.body.appendChild(fileInput);
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    appConfig.toolbar.openFile.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.openFileButton.setAttribute('hidden', 'true');
***REMOVED*** else {
    fileInput.value = null;
***REMOVED***
  var PDFJS = pdfjsLib.PDFJS;
  if (PDFViewerApplication.viewerPrefs['pdfBugEnabled']) {
    var hash = document.location.hash.substring(1);
    var hashParams = parseQueryString(hash);
    if ('disableworker' in hashParams) {
      PDFJS.disableWorker = hashParams['disableworker'] === 'true';
  ***REMOVED***
    if ('disablerange' in hashParams) {
      PDFJS.disableRange = hashParams['disablerange'] === 'true';
  ***REMOVED***
    if ('disablestream' in hashParams) {
      PDFJS.disableStream = hashParams['disablestream'] === 'true';
  ***REMOVED***
    if ('disableautofetch' in hashParams) {
      PDFJS.disableAutoFetch = hashParams['disableautofetch'] === 'true';
  ***REMOVED***
    if ('disablefontface' in hashParams) {
      PDFJS.disableFontFace = hashParams['disablefontface'] === 'true';
  ***REMOVED***
    if ('disablehistory' in hashParams) {
      PDFJS.disableHistory = hashParams['disablehistory'] === 'true';
  ***REMOVED***
    if ('webgl' in hashParams) {
      PDFJS.disableWebGL = hashParams['webgl'] !== 'true';
  ***REMOVED***
    if ('useonlycsszoom' in hashParams) {
      PDFJS.useOnlyCssZoom = hashParams['useonlycsszoom'] === 'true';
  ***REMOVED***
    if ('verbosity' in hashParams) {
      PDFJS.verbosity = hashParams['verbosity'] | 0;
  ***REMOVED***
    if ('ignorecurrentpositiononzoom' in hashParams) {
      PDFJS.ignoreCurrentPositionOnZoom = hashParams['ignorecurrentpositiononzoom'] === 'true';
  ***REMOVED***
    if ('locale' in hashParams) {
      PDFJS.locale = hashParams['locale'];
  ***REMOVED***
    if ('textlayer' in hashParams) {
      switch (hashParams['textlayer']) {
        case 'off':
          PDFJS.disableTextLayer = true;
          break;
        case 'visible':
        case 'shadow':
        case 'hover':
          var viewer = appConfig.viewerContainer;
          viewer.classList.add('textLayer-' + hashParams['textlayer']);
          break;
    ***REMOVED***
  ***REMOVED***
    if ('pdfbug' in hashParams) {
      PDFJS.pdfBug = true;
      var pdfBug = hashParams['pdfbug'];
      var enabled = pdfBug.split(',');
      waitForBeforeOpening.push(loadAndEnablePDFBug(enabled));
  ***REMOVED***
***REMOVED***
  mozL10n.setLanguage(PDFJS.locale);
  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add('hidden');
    appConfig.secondaryToolbar.printButton.classList.add('hidden');
***REMOVED***
  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add('hidden');
    appConfig.secondaryToolbar.presentationModeButton.classList.add('hidden');
***REMOVED***
  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add('hidden');
***REMOVED***
  appConfig.sidebar.mainContainer.addEventListener('transitionend', function (e) {
    if (e.target === this) {
      PDFViewerApplication.eventBus.dispatch('resize');
  ***REMOVED***
***REMOVED***, true);
  appConfig.sidebar.toggleButton.addEventListener('click', function () {
    PDFViewerApplication.pdfSidebar.toggle();
***REMOVED***);
  Promise.all(waitForBeforeOpening).then(function () {
    webViewerOpenFileViaURL(file);
***REMOVED***).catch(function (reason) {
    PDFViewerApplication.error(mozL10n.get('loading_error', null, 'An error occurred while opening.'), reason);
***REMOVED***);
}
var webViewerOpenFileViaURL;
webViewerOpenFileViaURL = function webViewerOpenFileViaURL(file) {
  if (file && file.lastIndexOf('file:', 0) === 0) {
    PDFViewerApplication.setTitleUsingUrl(file);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      PDFViewerApplication.open(new Uint8Array(xhr.response));
  ***REMOVED***;
    try {
      xhr.open('GET', file);
      xhr.responseType = 'arraybuffer';
      xhr.send();
  ***REMOVED*** catch (e) {
      PDFViewerApplication.error(mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.'), e);
  ***REMOVED***
    return;
***REMOVED***
  if (file) {
    PDFViewerApplication.open(file);
***REMOVED***
***REMOVED***
function webViewerPageRendered(e) {
  var pageNumber = e.pageNumber;
  var pageIndex = pageNumber - 1;
  var pageView = PDFViewerApplication.pdfViewer.getPageView(pageIndex);
  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
***REMOVED***
  if (!pageView) {
    return;
***REMOVED***
  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    var thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageIndex);
    thumbnailView.setImage(pageView);
***REMOVED***
  if (pdfjsLib.PDFJS.pdfBug && Stats.enabled && pageView.stats) {
    Stats.add(pageNumber, pageView.stats);
***REMOVED***
  if (pageView.error) {
    PDFViewerApplication.error(mozL10n.get('rendering_error', null, 'An error occurred while rendering the page.'), pageView.error);
***REMOVED***
}
function webViewerTextLayerRendered(e) {}
function webViewerPageMode(e) {
  var mode = e.mode,
      view;
  switch (mode) {
    case 'thumbs':
      view = SidebarView.THUMBS;
      break;
    case 'bookmarks':
    case 'outline':
      view = SidebarView.OUTLINE;
      break;
    case 'attachments':
      view = SidebarView.ATTACHMENTS;
      break;
    case 'none':
      view = SidebarView.NONE;
      break;
    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
***REMOVED***
  PDFViewerApplication.pdfSidebar.switchView(view, true);
}
function webViewerNamedAction(e) {
  var action = e.action;
  switch (action) {
    case 'GoToPage':
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;
    case 'Find':
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
    ***REMOVED***
      break;
***REMOVED***
}
function webViewerPresentationModeChanged(e) {
  var active = e.active;
  var switchInProgress = e.switchInProgress;
  PDFViewerApplication.pdfViewer.presentationModeState = switchInProgress ? PresentationModeState.CHANGING : active ? PresentationModeState.FULLSCREEN : PresentationModeState.NORMAL;
}
function webViewerSidebarViewChanged(e) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
  var store = PDFViewerApplication.store;
  if (!store || !PDFViewerApplication.isInitialViewSet) {
    return;
***REMOVED***
  store.initializedPromise.then(function () {
    store.set('sidebarView', e.view).catch(function () {});
***REMOVED***);
}
function webViewerUpdateViewarea(e) {
  var location = e.location,
      store = PDFViewerApplication.store;
  if (store) {
    store.initializedPromise.then(function () {
      store.setMultiple({
        'exists': true,
        'page': location.pageNumber,
        'zoom': location.scale,
        'scrollLeft': location.left,
        'scrollTop': location.top
    ***REMOVED***).catch(function () {});
  ***REMOVED***);
***REMOVED***
  var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  PDFViewerApplication.pdfHistory.updateCurrentBookmark(location.pdfOpenParams, location.pageNumber);
  var currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  var loading = currentPage.renderingState !== RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}
function webViewerResize() {
  var currentScaleValue = PDFViewerApplication.pdfViewer.currentScaleValue;
  if (currentScaleValue === 'auto' || currentScaleValue === 'page-fit' || currentScaleValue === 'page-width') {
    PDFViewerApplication.pdfViewer.currentScaleValue = currentScaleValue;
***REMOVED*** else if (!currentScaleValue) {
    PDFViewerApplication.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
***REMOVED***
  PDFViewerApplication.pdfViewer.update();
}
function webViewerHashchange(e) {
  if (PDFViewerApplication.pdfHistory.isHashChangeUnlocked) {
    var hash = e.hash;
    if (!hash) {
      return;
  ***REMOVED***
    if (!PDFViewerApplication.isInitialViewSet) {
      PDFViewerApplication.initialBookmark = hash;
  ***REMOVED*** else {
      PDFViewerApplication.pdfLinkService.setHash(hash);
  ***REMOVED***
***REMOVED***
}
var webViewerFileInputChange;
webViewerFileInputChange = function webViewerFileInputChange(e) {
  var file = e.fileInput.files[0];
  if (!pdfjsLib.PDFJS.disableCreateObjectURL && typeof URL !== 'undefined' && URL.createObjectURL) {
    PDFViewerApplication.open(URL.createObjectURL(file));
***REMOVED*** else {
    var fileReader = new FileReader();
    fileReader.onload = function webViewerChangeFileReaderOnload(evt) {
      var buffer = evt.target.result;
      var uint8Array = new Uint8Array(buffer);
      PDFViewerApplication.open(uint8Array);
  ***REMOVED***;
    fileReader.readAsArrayBuffer(file);
***REMOVED***
  PDFViewerApplication.setTitleUsingUrl(file.name);
  var appConfig = PDFViewerApplication.appConfig;
  appConfig.toolbar.viewBookmark.setAttribute('hidden', 'true');
  appConfig.secondaryToolbar.viewBookmarkButton.setAttribute('hidden', 'true');
  appConfig.toolbar.download.setAttribute('hidden', 'true');
  appConfig.secondaryToolbar.downloadButton.setAttribute('hidden', 'true');
***REMOVED***
function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}
function webViewerOpenFile() {
  var openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
  document.getElementById(openFileInputName).click();
}
function webViewerPrint() {
  window.print();
}
function webViewerDownload() {
  PDFViewerApplication.download();
}
function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
***REMOVED***
}
function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
***REMOVED***
}
function webViewerNextPage() {
  PDFViewerApplication.page++;
}
function webViewerPreviousPage() {
  PDFViewerApplication.page--;
}
function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}
function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}
function webViewerPageNumberChanged(e) {
  var pdfViewer = PDFViewerApplication.pdfViewer;
  pdfViewer.currentPageLabel = e.value;
  if (e.value !== pdfViewer.currentPageNumber.toString() && e.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
***REMOVED***
}
function webViewerScaleChanged(e) {
  PDFViewerApplication.pdfViewer.currentScaleValue = e.value;
}
function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}
function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}
function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}
function webViewerFind(e) {
  PDFViewerApplication.findController.executeCommand('find' + e.type, {
    query: e.query,
    phraseSearch: e.phraseSearch,
    caseSensitive: e.caseSensitive,
    highlightAll: e.highlightAll,
    findPrevious: e.findPrevious
***REMOVED***);
}
function webViewerFindFromUrlHash(e) {
  PDFViewerApplication.findController.executeCommand('find', {
    query: e.query,
    phraseSearch: e.phraseSearch,
    caseSensitive: false,
    highlightAll: true,
    findPrevious: false
***REMOVED***);
}
function webViewerScaleChanging(e) {
  PDFViewerApplication.toolbar.setPageScale(e.presetValue, e.scale);
  PDFViewerApplication.pdfViewer.update();
}
function webViewerPageChanging(e) {
  var page = e.pageNumber;
  PDFViewerApplication.toolbar.setPageNumber(page, e.pageLabel || null);
  PDFViewerApplication.secondaryToolbar.setPageNumber(page);
  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(page);
***REMOVED***
  if (pdfjsLib.PDFJS.pdfBug && Stats.enabled) {
    var pageView = PDFViewerApplication.pdfViewer.getPageView(page - 1);
    if (pageView.stats) {
      Stats.add(page, pageView.stats);
  ***REMOVED***
***REMOVED***
}
var zoomDisabled = false,
    zoomDisabledTimeout;
function webViewerWheel(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer;
  if (pdfViewer.isInPresentationMode) {
    return;
***REMOVED***
  if (evt.ctrlKey || evt.metaKey) {
    var support = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;
    if (evt.ctrlKey && !support.ctrlKey || evt.metaKey && !support.metaKey) {
      return;
  ***REMOVED***
    evt.preventDefault();
    if (zoomDisabled) {
      return;
  ***REMOVED***
    var previousScale = pdfViewer.currentScale;
    var delta = normalizeWheelEventDelta(evt);
    var MOUSE_WHEEL_DELTA_PER_PAGE_SCALE = 3.0;
    var ticks = delta * MOUSE_WHEEL_DELTA_PER_PAGE_SCALE;
    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
  ***REMOVED*** else {
      PDFViewerApplication.zoomIn(ticks);
  ***REMOVED***
    var currentScale = pdfViewer.currentScale;
    if (previousScale !== currentScale) {
      var scaleCorrectionFactor = currentScale / previousScale - 1;
      var rect = pdfViewer.container.getBoundingClientRect();
      var dx = evt.clientX - rect.left;
      var dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
  ***REMOVED***
***REMOVED*** else {
    zoomDisabled = true;
    clearTimeout(zoomDisabledTimeout);
    zoomDisabledTimeout = setTimeout(function () {
      zoomDisabled = false;
  ***REMOVED***, 1000);
***REMOVED***
}
function webViewerClick(evt) {
  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
***REMOVED***
  var appConfig = PDFViewerApplication.appConfig;
  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
***REMOVED***
}
function webViewerKeyDown(evt) {
  if (OverlayManager.active) {
    return;
***REMOVED***
  var handled = false,
      ensureViewerFocused = false;
  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  var pdfViewer = PDFViewerApplication.pdfViewer;
  var isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;
  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          PDFViewerApplication.findBar.open();
          handled = true;
      ***REMOVED***
        break;
      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          var findState = PDFViewerApplication.findController.state;
          if (findState) {
            PDFViewerApplication.findController.executeCommand('findagain', {
              query: findState.query,
              phraseSearch: findState.phraseSearch,
              caseSensitive: findState.caseSensitive,
              highlightAll: findState.highlightAll,
              findPrevious: cmd === 5 || cmd === 12
          ***REMOVED***);
        ***REMOVED***
          handled = true;
      ***REMOVED***
        break;
      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
      ***REMOVED***
        handled = true;
        break;
      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
      ***REMOVED***
        handled = true;
        break;
      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
        ***REMOVED***);
          handled = false;
      ***REMOVED***
        break;
      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
      ***REMOVED***
        break;
      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
      ***REMOVED***
        break;
  ***REMOVED***
***REMOVED***
  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        PDFViewerApplication.download();
        handled = true;
        break;
  ***REMOVED***
***REMOVED***
  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;
      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
  ***REMOVED***
***REMOVED***
  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
  ***REMOVED***
    evt.preventDefault();
    return;
***REMOVED***
  var curElement = document.activeElement || document.querySelector(':focus');
  var curElementTagName = curElement && curElement.tagName.toUpperCase();
  if (curElementTagName === 'INPUT' || curElementTagName === 'TEXTAREA' || curElementTagName === 'SELECT') {
    if (evt.keyCode !== 27) {
      return;
  ***REMOVED***
***REMOVED***
  if (cmd === 0) {
    switch (evt.keyCode) {
      case 38:
      case 33:
      case 8:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
      ***REMOVED***
      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          break;
      ***REMOVED***
      case 75:
      case 80:
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
      ***REMOVED***
        handled = true;
        break;
      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
      ***REMOVED***
        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
      ***REMOVED***
        break;
      case 40:
      case 34:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
      ***REMOVED***
      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          break;
      ***REMOVED***
      case 74:
      case 78:
        if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page++;
      ***REMOVED***
        handled = true;
        break;
      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
      ***REMOVED***
        break;
      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
      ***REMOVED***
        break;
      case 72:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.handTool.toggle();
      ***REMOVED***
        break;
      case 82:
        PDFViewerApplication.rotatePages(90);
        break;
  ***REMOVED***
***REMOVED***
  if (cmd === 4) {
    switch (evt.keyCode) {
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
      ***REMOVED***
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
      ***REMOVED***
        handled = true;
        break;
      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
  ***REMOVED***
***REMOVED***
  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== 'BUTTON') {
      ensureViewerFocused = true;
  ***REMOVED***
***REMOVED***
  if (cmd === 2) {
    switch (evt.keyCode) {
      case 37:
        if (isViewerInPresentationMode) {
          PDFViewerApplication.pdfHistory.back();
          handled = true;
      ***REMOVED***
        break;
      case 39:
        if (isViewerInPresentationMode) {
          PDFViewerApplication.pdfHistory.forward();
          handled = true;
      ***REMOVED***
        break;
  ***REMOVED***
***REMOVED***
  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
***REMOVED***
  if (handled) {
    evt.preventDefault();
***REMOVED***
}
localized.then(function webViewerLocalized() {
  document.getElementsByTagName('html')[0].dir = mozL10n.getDirection();
});
var PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,
    createPrintService: function () {
      throw new Error('Not implemented: createPrintService');
  ***REMOVED***
***REMOVED***
***REMOVED***
exports.PDFViewerApplication = PDFViewerApplication;
exports.DefaultExernalServices = DefaultExernalServices;
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var scrollIntoView = uiUtils.scrollIntoView;
var FindStates = {
  FIND_FOUND: 0,
  FIND_NOTFOUND: 1,
  FIND_WRAPPED: 2,
  FIND_PENDING: 3
***REMOVED***
var FIND_SCROLL_OFFSET_TOP = -50;
var FIND_SCROLL_OFFSET_LEFT = -400;
var CHARACTERS_TO_NORMALIZE = {
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201A': '\'',
  '\u201B': '\'',
  '\u201C': '"',
  '\u201D': '"',
  '\u201E': '"',
  '\u201F': '"',
  '\u00BC': '1/4',
  '\u00BD': '1/2',
  '\u00BE': '3/4'
***REMOVED***
var PDFFindController = function PDFFindControllerClosure() {
  function PDFFindController(options) {
    this.pdfViewer = options.pdfViewer || null;
    this.onUpdateResultsCount = null;
    this.onUpdateState = null;
    this.reset();
    var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join('');
    this.normalizationRegex = new RegExp('[' + replace + ']', 'g');
***REMOVED***
  PDFFindController.prototype = {
    reset: function PDFFindController_reset() {
      this.startedTextExtraction = false;
      this.extractTextPromises = [];
      this.pendingFindMatches = Object.create(null);
      this.active = false;
      this.pageContents = [];
      this.pageMatches = [];
      this.pageMatchesLength = null;
      this.matchCount = 0;
      this.selected = {
        pageIdx: -1,
        matchIdx: -1
    ***REMOVED***;
      this.offset = {
        pageIdx: null,
        matchIdx: null
    ***REMOVED***;
      this.pagesToSearch = null;
      this.resumePageIdx = null;
      this.state = null;
      this.dirtyMatch = false;
      this.findTimeout = null;
      this.firstPagePromise = new Promise(function (resolve) {
        this.resolveFirstPage = resolve;
    ***REMOVED***.bind(this));
  ***REMOVED***,
    normalize: function PDFFindController_normalize(text) {
      return text.replace(this.normalizationRegex, function (ch) {
        return CHARACTERS_TO_NORMALIZE[ch];
    ***REMOVED***);
  ***REMOVED***,
    _prepareMatches: function PDFFindController_prepareMatches(matchesWithLength, matches, matchesLength) {
      function isSubTerm(matchesWithLength, currentIndex) {
        var currentElem, prevElem, nextElem;
        currentElem = matchesWithLength[currentIndex];
        nextElem = matchesWithLength[currentIndex + 1];
        if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
          currentElem.skipped = true;
          return true;
      ***REMOVED***
        for (var i = currentIndex - 1; i >= 0; i--) {
          prevElem = matchesWithLength[i];
          if (prevElem.skipped) {
            continue;
        ***REMOVED***
          if (prevElem.match + prevElem.matchLength < currentElem.match) {
            break;
        ***REMOVED***
          if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
            currentElem.skipped = true;
            return true;
        ***REMOVED***
      ***REMOVED***
        return false;
    ***REMOVED***
      var i, len;
      matchesWithLength.sort(function (a, b) {
        return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
    ***REMOVED***);
      for (i = 0, len = matchesWithLength.length; i < len; i++) {
        if (isSubTerm(matchesWithLength, i)) {
          continue;
      ***REMOVED***
        matches.push(matchesWithLength[i].match);
        matchesLength.push(matchesWithLength[i].matchLength);
    ***REMOVED***
  ***REMOVED***,
    calcFindPhraseMatch: function PDFFindController_calcFindPhraseMatch(query, pageIndex, pageContent) {
      var matches = [];
      var queryLen = query.length;
      var matchIdx = -queryLen;
      while (true) {
        matchIdx = pageContent.indexOf(query, matchIdx + queryLen);
        if (matchIdx === -1) {
          break;
      ***REMOVED***
        matches.push(matchIdx);
    ***REMOVED***
      this.pageMatches[pageIndex] = matches;
  ***REMOVED***,
    calcFindWordMatch: function PDFFindController_calcFindWordMatch(query, pageIndex, pageContent) {
      var matchesWithLength = [];
      var queryArray = query.match(/\S+/g);
      var subquery, subqueryLen, matchIdx;
      for (var i = 0, len = queryArray.length; i < len; i++) {
        subquery = queryArray[i];
        subqueryLen = subquery.length;
        matchIdx = -subqueryLen;
        while (true) {
          matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);
          if (matchIdx === -1) {
            break;
        ***REMOVED***
          matchesWithLength.push({
            match: matchIdx,
            matchLength: subqueryLen,
            skipped: false
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
      if (!this.pageMatchesLength) {
        this.pageMatchesLength = [];
    ***REMOVED***
      this.pageMatchesLength[pageIndex] = [];
      this.pageMatches[pageIndex] = [];
      this._prepareMatches(matchesWithLength, this.pageMatches[pageIndex], this.pageMatchesLength[pageIndex]);
  ***REMOVED***,
    calcFindMatch: function PDFFindController_calcFindMatch(pageIndex) {
      var pageContent = this.normalize(this.pageContents[pageIndex]);
      var query = this.normalize(this.state.query);
      var caseSensitive = this.state.caseSensitive;
      var phraseSearch = this.state.phraseSearch;
      var queryLen = query.length;
      if (queryLen === 0) {
        return;
    ***REMOVED***
      if (!caseSensitive) {
        pageContent = pageContent.toLowerCase();
        query = query.toLowerCase();
    ***REMOVED***
      if (phraseSearch) {
        this.calcFindPhraseMatch(query, pageIndex, pageContent);
    ***REMOVED*** else {
        this.calcFindWordMatch(query, pageIndex, pageContent);
    ***REMOVED***
      this.updatePage(pageIndex);
      if (this.resumePageIdx === pageIndex) {
        this.resumePageIdx = null;
        this.nextPageMatch();
    ***REMOVED***
      if (this.pageMatches[pageIndex].length > 0) {
        this.matchCount += this.pageMatches[pageIndex].length;
        this.updateUIResultsCount();
    ***REMOVED***
  ***REMOVED***,
    extractText: function PDFFindController_extractText() {
      if (this.startedTextExtraction) {
        return;
    ***REMOVED***
      this.startedTextExtraction = true;
      this.pageContents = [];
      var extractTextPromisesResolves = [];
      var numPages = this.pdfViewer.pagesCount;
      for (var i = 0; i < numPages; i++) {
        this.extractTextPromises.push(new Promise(function (resolve) {
          extractTextPromisesResolves.push(resolve);
      ***REMOVED***));
    ***REMOVED***
      var self = this;
      function extractPageText(pageIndex) {
        self.pdfViewer.getPageTextContent(pageIndex).then(function textContentResolved(textContent) {
          var textItems = textContent.items;
          var str = [];
          for (var i = 0, len = textItems.length; i < len; i++) {
            str.push(textItems[i].str);
        ***REMOVED***
          self.pageContents.push(str.join(''));
          extractTextPromisesResolves[pageIndex](pageIndex);
          if (pageIndex + 1 < self.pdfViewer.pagesCount) {
            extractPageText(pageIndex + 1);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
      extractPageText(0);
  ***REMOVED***,
    executeCommand: function PDFFindController_executeCommand(cmd, state) {
      if (this.state === null || cmd !== 'findagain') {
        this.dirtyMatch = true;
    ***REMOVED***
      this.state = state;
      this.updateUIState(FindStates.FIND_PENDING);
      this.firstPagePromise.then(function () {
        this.extractText();
        clearTimeout(this.findTimeout);
        if (cmd === 'find') {
          this.findTimeout = setTimeout(this.nextMatch.bind(this), 250);
      ***REMOVED*** else {
          this.nextMatch();
      ***REMOVED***
    ***REMOVED***.bind(this));
  ***REMOVED***,
    updatePage: function PDFFindController_updatePage(index) {
      if (this.selected.pageIdx === index) {
        this.pdfViewer.currentPageNumber = index + 1;
    ***REMOVED***
      var page = this.pdfViewer.getPageView(index);
      if (page.textLayer) {
        page.textLayer.updateMatches();
    ***REMOVED***
  ***REMOVED***,
    nextMatch: function PDFFindController_nextMatch() {
      var previous = this.state.findPrevious;
      var currentPageIndex = this.pdfViewer.currentPageNumber - 1;
      var numPages = this.pdfViewer.pagesCount;
      this.active = true;
      if (this.dirtyMatch) {
        this.dirtyMatch = false;
        this.selected.pageIdx = this.selected.matchIdx = -1;
        this.offset.pageIdx = currentPageIndex;
        this.offset.matchIdx = null;
        this.hadMatch = false;
        this.resumePageIdx = null;
        this.pageMatches = [];
        this.matchCount = 0;
        this.pageMatchesLength = null;
        var self = this;
        for (var i = 0; i < numPages; i++) {
          this.updatePage(i);
          if (!(i in this.pendingFindMatches)) {
            this.pendingFindMatches[i] = true;
            this.extractTextPromises[i].then(function (pageIdx) {
              delete self.pendingFindMatches[pageIdx];
              self.calcFindMatch(pageIdx);
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
      if (this.state.query === '') {
        this.updateUIState(FindStates.FIND_FOUND);
        return;
    ***REMOVED***
      if (this.resumePageIdx) {
        return;
    ***REMOVED***
      var offset = this.offset;
      this.pagesToSearch = numPages;
      if (offset.matchIdx !== null) {
        var numPageMatches = this.pageMatches[offset.pageIdx].length;
        if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
          this.hadMatch = true;
          offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
          this.updateMatch(true);
          return;
      ***REMOVED***
        this.advanceOffsetPage(previous);
    ***REMOVED***
      this.nextPageMatch();
  ***REMOVED***,
    matchesReady: function PDFFindController_matchesReady(matches) {
      var offset = this.offset;
      var numMatches = matches.length;
      var previous = this.state.findPrevious;
      if (numMatches) {
        this.hadMatch = true;
        offset.matchIdx = previous ? numMatches - 1 : 0;
        this.updateMatch(true);
        return true;
    ***REMOVED***
      this.advanceOffsetPage(previous);
      if (offset.wrapped) {
        offset.matchIdx = null;
        if (this.pagesToSearch < 0) {
          this.updateMatch(false);
          return true;
      ***REMOVED***
    ***REMOVED***
      return false;
  ***REMOVED***,
    updateMatchPosition: function PDFFindController_updateMatchPosition(pageIndex, index, elements, beginIdx) {
      if (this.selected.matchIdx === index && this.selected.pageIdx === pageIndex) {
        var spot = {
          top: FIND_SCROLL_OFFSET_TOP,
          left: FIND_SCROLL_OFFSET_LEFT
      ***REMOVED***;
        scrollIntoView(elements[beginIdx], spot, true);
    ***REMOVED***
  ***REMOVED***,
    nextPageMatch: function PDFFindController_nextPageMatch() {
      if (this.resumePageIdx !== null) {
        console.error('There can only be one pending page.');
    ***REMOVED***
      do {
        var pageIdx = this.offset.pageIdx;
        var matches = this.pageMatches[pageIdx];
        if (!matches) {
          this.resumePageIdx = pageIdx;
          break;
      ***REMOVED***
    ***REMOVED*** while (!this.matchesReady(matches));
  ***REMOVED***,
    advanceOffsetPage: function PDFFindController_advanceOffsetPage(previous) {
      var offset = this.offset;
      var numPages = this.extractTextPromises.length;
      offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
      offset.matchIdx = null;
      this.pagesToSearch--;
      if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
        offset.pageIdx = previous ? numPages - 1 : 0;
        offset.wrapped = true;
    ***REMOVED***
  ***REMOVED***,
    updateMatch: function PDFFindController_updateMatch(found) {
      var state = FindStates.FIND_NOTFOUND;
      var wrapped = this.offset.wrapped;
      this.offset.wrapped = false;
      if (found) {
        var previousPage = this.selected.pageIdx;
        this.selected.pageIdx = this.offset.pageIdx;
        this.selected.matchIdx = this.offset.matchIdx;
        state = wrapped ? FindStates.FIND_WRAPPED : FindStates.FIND_FOUND;
        if (previousPage !== -1 && previousPage !== this.selected.pageIdx) {
          this.updatePage(previousPage);
      ***REMOVED***
    ***REMOVED***
      this.updateUIState(state, this.state.findPrevious);
      if (this.selected.pageIdx !== -1) {
        this.updatePage(this.selected.pageIdx);
    ***REMOVED***
  ***REMOVED***,
    updateUIResultsCount: function PDFFindController_updateUIResultsCount() {
      if (this.onUpdateResultsCount) {
        this.onUpdateResultsCount(this.matchCount);
    ***REMOVED***
  ***REMOVED***,
    updateUIState: function PDFFindController_updateUIState(state, previous) {
      if (this.onUpdateState) {
        this.onUpdateState(state, previous, this.matchCount);
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  return PDFFindController;
}();
exports.FindStates = FindStates;
exports.PDFFindController = PDFFindController;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultPreferences = null;
function getDefaultPreferences() {
  if (!defaultPreferences) {
    defaultPreferences = Promise.resolve({
      "showPreviousViewOnLoad": true,
      "defaultZoomValue": "",
      "sidebarViewOnLoad": 0,
      "enableHandToolOnLoad": false,
      "enableWebGL": false,
      "pdfBugEnabled": false,
      "disableRange": false,
      "disableStream": false,
      "disableAutoFetch": false,
      "disableFontFace": false,
      "disableTextLayer": false,
      "useOnlyCssZoom": false,
      "externalLinkTarget": 0,
      "enhanceTextSelection": false,
      "renderer": "canvas",
      "renderInteractiveForms": false,
      "enablePrintAutoRotate": false,
      "disablePageLabels": false
  ***REMOVED***);
***REMOVED***
  return defaultPreferences;
}
function cloneObj(obj) {
  var result = {***REMOVED***
  for (var i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      result[i] = obj[i];
  ***REMOVED***
***REMOVED***
  return result;
}
var Preferences = {
  prefs: null,
  isInitializedPromiseResolved: false,
  initializedPromise: null,
  initialize: function preferencesInitialize() {
    return this.initializedPromise = getDefaultPreferences().then(function (defaults) {
      Object.defineProperty(this, 'defaults', {
        value: Object.freeze(defaults),
        writable: false,
        enumerable: true,
        configurable: false
    ***REMOVED***);
      this.prefs = cloneObj(defaults);
      return this._readFromStorage(defaults);
  ***REMOVED***.bind(this)).then(function (prefObj) {
      this.isInitializedPromiseResolved = true;
      if (prefObj) {
        this.prefs = prefObj;
    ***REMOVED***
  ***REMOVED***.bind(this));
***REMOVED***,
  _writeToStorage: function preferences_writeToStorage(prefObj) {
    return Promise.resolve();
***REMOVED***,
  _readFromStorage: function preferences_readFromStorage(prefObj) {
    return Promise.resolve();
***REMOVED***,
  reset: function preferencesReset() {
    return this.initializedPromise.then(function () {
      this.prefs = cloneObj(this.defaults);
      return this._writeToStorage(this.defaults);
  ***REMOVED***.bind(this));
***REMOVED***,
  reload: function preferencesReload() {
    return this.initializedPromise.then(function () {
      this._readFromStorage(this.defaults).then(function (prefObj) {
        if (prefObj) {
          this.prefs = prefObj;
      ***REMOVED***
    ***REMOVED***.bind(this));
  ***REMOVED***.bind(this));
***REMOVED***,
  set: function preferencesSet(name, value) {
    return this.initializedPromise.then(function () {
      if (this.defaults[name] === undefined) {
        throw new Error('preferencesSet: \'' + name + '\' is undefined.');
    ***REMOVED*** else if (value === undefined) {
        throw new Error('preferencesSet: no value is specified.');
    ***REMOVED***
      var valueType = typeof value;
      var defaultType = typeof this.defaults[name];
      if (valueType !== defaultType) {
        if (valueType === 'number' && defaultType === 'string') {
          value = value.toString();
      ***REMOVED*** else {
          throw new Error('Preferences_set: \'' + value + '\' is a \"' + valueType + '\", expected \"' + defaultType + '\".');
      ***REMOVED***
    ***REMOVED*** else {
        if (valueType === 'number' && (value | 0) !== value) {
          throw new Error('Preferences_set: \'' + value + '\' must be an \"integer\".');
      ***REMOVED***
    ***REMOVED***
      this.prefs[name] = value;
      return this._writeToStorage(this.prefs);
  ***REMOVED***.bind(this));
***REMOVED***,
  get: function preferencesGet(name) {
    return this.initializedPromise.then(function () {
      var defaultValue = this.defaults[name];
      if (defaultValue === undefined) {
        throw new Error('preferencesGet: \'' + name + '\' is undefined.');
    ***REMOVED*** else {
        var prefValue = this.prefs[name];
        if (prefValue !== undefined) {
          return prefValue;
      ***REMOVED***
    ***REMOVED***
      return defaultValue;
  ***REMOVED***.bind(this));
***REMOVED***
***REMOVED***
Preferences._writeToStorage = function (prefObj) {
  return new Promise(function (resolve) {
    localStorage.setItem('pdfjs.preferences', JSON.stringify(prefObj));
    resolve();
***REMOVED***);
***REMOVED***
Preferences._readFromStorage = function (prefObj) {
  return new Promise(function (resolve) {
    var readPrefs = JSON.parse(localStorage.getItem('pdfjs.preferences'));
    resolve(readPrefs);
***REMOVED***);
***REMOVED***
exports.Preferences = Preferences;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var overlayManager = __webpack_require__(4);
var app = __webpack_require__(6);
var pdfjsLib = __webpack_require__(1);
var mozL10n = uiUtils.mozL10n;
var CSS_UNITS = uiUtils.CSS_UNITS;
var PDFPrintServiceFactory = app.PDFPrintServiceFactory;
var OverlayManager = overlayManager.OverlayManager;
var activeService = null;
function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size) {
  var scratchCanvas = activeService.scratchCanvas;
  var PRINT_RESOLUTION = 150;
  var PRINT_UNITS = PRINT_RESOLUTION / 72.0;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
  var width = Math.floor(size.width * CSS_UNITS) + 'px';
  var height = Math.floor(size.height * CSS_UNITS) + 'px';
  var ctx = scratchCanvas.getContext('2d');
  ctx.save();
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.restore();
  return pdfDocument.getPage(pageNumber).then(function (pdfPage) {
    var renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport(1, size.rotation),
      intent: 'print'
  ***REMOVED***;
    return pdfPage.render(renderContext).promise;
***REMOVED***).then(function () {
    return {
      width: width,
      height: height
  ***REMOVED***;
***REMOVED***);
}
function PDFPrintService(pdfDocument, pagesOverview, printContainer) {
  this.pdfDocument = pdfDocument;
  this.pagesOverview = pagesOverview;
  this.printContainer = printContainer;
  this.currentPage = -1;
  this.scratchCanvas = document.createElement('canvas');
}
PDFPrintService.prototype = {
  layout: function () {
    this.throwIfInactive();
    var body = document.querySelector('body');
    body.setAttribute('data-pdfjsprinting', true);
    var hasEqualPageSizes = this.pagesOverview.every(function (size) {
      return size.width === this.pagesOverview[0].width && size.height === this.pagesOverview[0].height;
  ***REMOVED***, this);
    if (!hasEqualPageSizes) {
      console.warn('Not all pages have the same size. The printed ' + 'result may be incorrect!');
  ***REMOVED***
    this.pageStyleSheet = document.createElement('style');
    var pageSize = this.pagesOverview[0];
    this.pageStyleSheet.textContent = '@supports ((size:A4) and (size:1pt 1pt)) {' + '@page { size: ' + pageSize.width + 'pt ' + pageSize.height + 'pt;}' + '}';
    body.appendChild(this.pageStyleSheet);
***REMOVED***,
  destroy: function () {
    if (activeService !== this) {
      return;
  ***REMOVED***
    this.printContainer.textContent = '';
    if (this.pageStyleSheet && this.pageStyleSheet.parentNode) {
      this.pageStyleSheet.parentNode.removeChild(this.pageStyleSheet);
      this.pageStyleSheet = null;
  ***REMOVED***
    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
    ensureOverlay().then(function () {
      if (OverlayManager.active !== 'printServiceOverlay') {
        return;
    ***REMOVED***
      OverlayManager.close('printServiceOverlay');
  ***REMOVED***);
***REMOVED***,
  renderPages: function () {
    var pageCount = this.pagesOverview.length;
    var renderNextPage = function (resolve, reject) {
      this.throwIfInactive();
      if (++this.currentPage >= pageCount) {
        renderProgress(pageCount, pageCount);
        resolve();
        return;
    ***REMOVED***
      var index = this.currentPage;
      renderProgress(index, pageCount);
      renderPage(this, this.pdfDocument, index + 1, this.pagesOverview[index]).then(this.useRenderedPage.bind(this)).then(function () {
        renderNextPage(resolve, reject);
    ***REMOVED***, reject);
  ***REMOVED***.bind(this);
    return new Promise(renderNextPage);
***REMOVED***,
  useRenderedPage: function (printItem) {
    this.throwIfInactive();
    var img = document.createElement('img');
    img.style.width = printItem.width;
    img.style.height = printItem.height;
    var scratchCanvas = this.scratchCanvas;
    if ('toBlob' in scratchCanvas && !pdfjsLib.PDFJS.disableCreateObjectURL) {
      scratchCanvas.toBlob(function (blob) {
        img.src = URL.createObjectURL(blob);
    ***REMOVED***);
  ***REMOVED*** else {
      img.src = scratchCanvas.toDataURL();
  ***REMOVED***
    var wrapper = document.createElement('div');
    wrapper.appendChild(img);
    this.printContainer.appendChild(wrapper);
    return new Promise(function (resolve, reject) {
      img.onload = resolve;
      img.onerror = reject;
  ***REMOVED***);
***REMOVED***,
  performPrint: function () {
    this.throwIfInactive();
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (!this.active) {
          resolve();
          return;
      ***REMOVED***
        print.call(window);
        setTimeout(resolve, 20);
    ***REMOVED***.bind(this), 0);
  ***REMOVED***.bind(this));
***REMOVED***,
  get active() {
    return this === activeService;
***REMOVED***,
  throwIfInactive: function () {
    if (!this.active) {
      throw new Error('This print request was cancelled or completed.');
  ***REMOVED***
***REMOVED***
***REMOVED***
var print = window.print;
window.print = function print() {
  if (activeService) {
    console.warn('Ignored window.print() because of a pending print job.');
    return;
***REMOVED***
  ensureOverlay().then(function () {
    if (activeService) {
      OverlayManager.open('printServiceOverlay');
  ***REMOVED***
***REMOVED***);
  try {
    dispatchEvent('beforeprint');
***REMOVED*** finally {
    if (!activeService) {
      console.error('Expected print service to be initialized.');
      if (OverlayManager.active === 'printServiceOverlay') {
        OverlayManager.close('printServiceOverlay');
    ***REMOVED***
      return;
  ***REMOVED***
    var activeServiceOnEntry = activeService;
    activeService.renderPages().then(function () {
      return activeServiceOnEntry.performPrint();
  ***REMOVED***).catch(function () {}).then(function () {
      if (activeServiceOnEntry.active) {
        abort();
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***
function dispatchEvent(eventType) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventType, false, false, 'custom');
  window.dispatchEvent(event);
}
function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent('afterprint');
***REMOVED***
}
function renderProgress(index, total) {
  var progressContainer = document.getElementById('printServiceOverlay');
  var progress = Math.round(100 * index / total);
  var progressBar = progressContainer.querySelector('progress');
  var progressPerc = progressContainer.querySelector('.relative-progress');
  progressBar.value = progress;
  progressPerc.textContent = mozL10n.get('print_progress_percent', { progress: progress }, progress + '%');
}
var hasAttachEvent = !!document.attachEvent;
window.addEventListener('keydown', function (event) {
  if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
    window.print();
    if (hasAttachEvent) {
      return;
  ***REMOVED***
    event.preventDefault();
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
  ***REMOVED*** else {
      event.stopPropagation();
  ***REMOVED***
    return;
***REMOVED***
}, true);
if (hasAttachEvent) {
  document.attachEvent('onkeydown', function (event) {
    event = event || window.event;
    if (event.keyCode === 80 && event.ctrlKey) {
      event.keyCode = 0;
      return false;
  ***REMOVED***
***REMOVED***);
}
if ('onbeforeprint' in window) {
  var stopPropagationIfNeeded = function (event) {
    if (event.detail !== 'custom' && event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
  ***REMOVED***
***REMOVED***;
  window.addEventListener('beforeprint', stopPropagationIfNeeded);
  window.addEventListener('afterprint', stopPropagationIfNeeded);
}
var overlayPromise;
function ensureOverlay() {
  if (!overlayPromise) {
    overlayPromise = OverlayManager.register('printServiceOverlay', document.getElementById('printServiceOverlay'), abort, true);
    document.getElementById('printCancel').onclick = abort;
***REMOVED***
  return overlayPromise;
}
PDFPrintServiceFactory.instance = {
  supportsPrinting: true,
  createPrintService: function (pdfDocument, pagesOverview, printContainer) {
    if (activeService) {
      throw new Error('The print service is created and active.');
  ***REMOVED***
    activeService = new PDFPrintService(pdfDocument, pagesOverview, printContainer);
    return activeService;
***REMOVED***
***REMOVED***
exports.PDFPrintService = PDFPrintService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var pdfLinkService = __webpack_require__(5);
var pdfjsLib = __webpack_require__(1);
var mozL10n = uiUtils.mozL10n;
var SimpleLinkService = pdfLinkService.SimpleLinkService;
var AnnotationLayerBuilder = function AnnotationLayerBuilderClosure() {
  function AnnotationLayerBuilder(options) {
    this.pageDiv = options.pageDiv;
    this.pdfPage = options.pdfPage;
    this.renderInteractiveForms = options.renderInteractiveForms;
    this.linkService = options.linkService;
    this.downloadManager = options.downloadManager;
    this.div = null;
***REMOVED***
  AnnotationLayerBuilder.prototype = {
    render: function AnnotationLayerBuilder_render(viewport, intent) {
      var self = this;
      var parameters = { intent: intent === undefined ? 'display' : intent ***REMOVED***
      this.pdfPage.getAnnotations(parameters).then(function (annotations) {
        viewport = viewport.clone({ dontFlip: true });
        parameters = {
          viewport: viewport,
          div: self.div,
          annotations: annotations,
          page: self.pdfPage,
          renderInteractiveForms: self.renderInteractiveForms,
          linkService: self.linkService,
          downloadManager: self.downloadManager
      ***REMOVED***;
        if (self.div) {
          pdfjsLib.AnnotationLayer.update(parameters);
      ***REMOVED*** else {
          if (annotations.length === 0) {
            return;
        ***REMOVED***
          self.div = document.createElement('div');
          self.div.className = 'annotationLayer';
          self.pageDiv.appendChild(self.div);
          parameters.div = self.div;
          pdfjsLib.AnnotationLayer.render(parameters);
          if (typeof mozL10n !== 'undefined') {
            mozL10n.translate(self.div);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***,
    hide: function AnnotationLayerBuilder_hide() {
      if (!this.div) {
        return;
    ***REMOVED***
      this.div.setAttribute('hidden', 'true');
  ***REMOVED***
***REMOVED***;
  return AnnotationLayerBuilder;
}();
function DefaultAnnotationLayerFactory() {}
DefaultAnnotationLayerFactory.prototype = {
  createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
    return new AnnotationLayerBuilder({
      pageDiv: pageDiv,
      pdfPage: pdfPage,
      renderInteractiveForms: renderInteractiveForms,
      linkService: new SimpleLinkService()
  ***REMOVED***);
***REMOVED***
***REMOVED***
exports.AnnotationLayerBuilder = AnnotationLayerBuilder;
exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pdfjsLib = __webpack_require__(1);
function download(blobUrl, filename) {
  var a = document.createElement('a');
  if (a.click) {
    a.href = blobUrl;
    a.target = '_parent';
    if ('download' in a) {
      a.download = filename;
  ***REMOVED***
    (document.body || document.documentElement).appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
***REMOVED*** else {
    if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
      var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
      blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
  ***REMOVED***
    window.open(blobUrl, '_parent');
***REMOVED***
}
function DownloadManager() {}
DownloadManager.prototype = {
  downloadUrl: function DownloadManager_downloadUrl(url, filename) {
    if (!pdfjsLib.createValidAbsoluteUrl(url, 'http://example.com')) {
      return;
  ***REMOVED***
    download(url + '#pdfjs.action=download', filename);
***REMOVED***,
  downloadData: function DownloadManager_downloadData(data, filename, contentType) {
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], { type: contentType }), filename);
  ***REMOVED***
    var blobUrl = pdfjsLib.createObjectURL(data, contentType, pdfjsLib.PDFJS.disableCreateObjectURL);
    download(blobUrl, filename);
***REMOVED***,
  download: function DownloadManager_download(blob, url, filename) {
    if (navigator.msSaveBlob) {
      if (!navigator.msSaveBlob(blob, filename)) {
        this.downloadUrl(url, filename);
    ***REMOVED***
      return;
  ***REMOVED***
    if (pdfjsLib.PDFJS.disableCreateObjectURL) {
      this.downloadUrl(url, filename);
      return;
  ***REMOVED***
    var blobUrl = URL.createObjectURL(blob);
    download(blobUrl, filename);
***REMOVED***
***REMOVED***
exports.DownloadManager = DownloadManager;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function GrabToPan(options) {
  this.element = options.element;
  this.document = options.element.ownerDocument;
  if (typeof options.ignoreTarget === 'function') {
    this.ignoreTarget = options.ignoreTarget;
***REMOVED***
  this.onActiveChanged = options.onActiveChanged;
  this.activate = this.activate.bind(this);
  this.deactivate = this.deactivate.bind(this);
  this.toggle = this.toggle.bind(this);
  this._onmousedown = this._onmousedown.bind(this);
  this._onmousemove = this._onmousemove.bind(this);
  this._endPan = this._endPan.bind(this);
  var overlay = this.overlay = document.createElement('div');
  overlay.className = 'grab-to-pan-grabbing';
}
GrabToPan.prototype = {
  CSS_CLASS_GRAB: 'grab-to-pan-grab',
  activate: function GrabToPan_activate() {
    if (!this.active) {
      this.active = true;
      this.element.addEventListener('mousedown', this._onmousedown, true);
      this.element.classList.add(this.CSS_CLASS_GRAB);
      if (this.onActiveChanged) {
        this.onActiveChanged(true);
    ***REMOVED***
  ***REMOVED***
***REMOVED***,
  deactivate: function GrabToPan_deactivate() {
    if (this.active) {
      this.active = false;
      this.element.removeEventListener('mousedown', this._onmousedown, true);
      this._endPan();
      this.element.classList.remove(this.CSS_CLASS_GRAB);
      if (this.onActiveChanged) {
        this.onActiveChanged(false);
    ***REMOVED***
  ***REMOVED***
***REMOVED***,
  toggle: function GrabToPan_toggle() {
    if (this.active) {
      this.deactivate();
  ***REMOVED*** else {
      this.activate();
  ***REMOVED***
***REMOVED***,
  ignoreTarget: function GrabToPan_ignoreTarget(node) {
    return node[matchesSelector]('a[href], a[href] *, input, textarea, button, button *, select, option');
***REMOVED***,
  _onmousedown: function GrabToPan__onmousedown(event) {
    if (event.button !== 0 || this.ignoreTarget(event.target)) {
      return;
  ***REMOVED***
    if (event.originalTarget) {
      try {
        event.originalTarget.tagName;
    ***REMOVED*** catch (e) {
        return;
    ***REMOVED***
  ***REMOVED***
    this.scrollLeftStart = this.element.scrollLeft;
    this.scrollTopStart = this.element.scrollTop;
    this.clientXStart = event.clientX;
    this.clientYStart = event.clientY;
    this.document.addEventListener('mousemove', this._onmousemove, true);
    this.document.addEventListener('mouseup', this._endPan, true);
    this.element.addEventListener('scroll', this._endPan, true);
    event.preventDefault();
    event.stopPropagation();
    var focusedElement = document.activeElement;
    if (focusedElement && !focusedElement.contains(event.target)) {
      focusedElement.blur();
  ***REMOVED***
***REMOVED***,
  _onmousemove: function GrabToPan__onmousemove(event) {
    this.element.removeEventListener('scroll', this._endPan, true);
    if (isLeftMouseReleased(event)) {
      this._endPan();
      return;
  ***REMOVED***
    var xDiff = event.clientX - this.clientXStart;
    var yDiff = event.clientY - this.clientYStart;
    var scrollTop = this.scrollTopStart - yDiff;
    var scrollLeft = this.scrollLeftStart - xDiff;
    if (this.element.scrollTo) {
      this.element.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: 'instant'
    ***REMOVED***);
  ***REMOVED*** else {
      this.element.scrollTop = scrollTop;
      this.element.scrollLeft = scrollLeft;
  ***REMOVED***
    if (!this.overlay.parentNode) {
      document.body.appendChild(this.overlay);
  ***REMOVED***
***REMOVED***,
  _endPan: function GrabToPan__endPan() {
    this.element.removeEventListener('scroll', this._endPan, true);
    this.document.removeEventListener('mousemove', this._onmousemove, true);
    this.document.removeEventListener('mouseup', this._endPan, true);
    this.overlay.remove();
***REMOVED***
***REMOVED***
var matchesSelector;
['webkitM', 'mozM', 'msM', 'oM', 'm'].some(function (prefix) {
  var name = prefix + 'atches';
  if (name in document.documentElement) {
    matchesSelector = name;
***REMOVED***
  name += 'Selector';
  if (name in document.documentElement) {
    matchesSelector = name;
***REMOVED***
  return matchesSelector;
});
var isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
var chrome = window.chrome;
var isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
var isSafari6plus = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);
function isLeftMouseReleased(event) {
  if ('buttons' in event && isNotIEorIsIE10plus) {
    return !(event.buttons & 1);
***REMOVED***
  if (isChrome15OrOpera15plus || isSafari6plus) {
    return event.which === 0;
***REMOVED***
}
exports.GrabToPan = GrabToPan;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var grabToPan = __webpack_require__(12);
var preferences = __webpack_require__(8);
var uiUtils = __webpack_require__(0);
var GrabToPan = grabToPan.GrabToPan;
var Preferences = preferences.Preferences;
var localized = uiUtils.localized;
var HandTool = function HandToolClosure() {
  function HandTool(options) {
    this.container = options.container;
    this.eventBus = options.eventBus;
    this.wasActive = false;
    this.handTool = new GrabToPan({
      element: this.container,
      onActiveChanged: function (isActive) {
        this.eventBus.dispatch('handtoolchanged', { isActive: isActive });
    ***REMOVED***.bind(this)
  ***REMOVED***);
    this.eventBus.on('togglehandtool', this.toggle.bind(this));
    Promise.all([localized, Preferences.get('enableHandToolOnLoad')]).then(function resolved(values) {
      if (values[1] === true) {
        this.handTool.activate();
    ***REMOVED***
  ***REMOVED***.bind(this)).catch(function rejected(reason) {});
    this.eventBus.on('presentationmodechanged', function (e) {
      if (e.switchInProgress) {
        return;
    ***REMOVED***
      if (e.active) {
        this.enterPresentationMode();
    ***REMOVED*** else {
        this.exitPresentationMode();
    ***REMOVED***
  ***REMOVED***.bind(this));
***REMOVED***
  HandTool.prototype = {
    get isActive() {
      return !!this.handTool.active;
  ***REMOVED***,
    toggle: function HandTool_toggle() {
      this.handTool.toggle();
  ***REMOVED***,
    enterPresentationMode: function HandTool_enterPresentationMode() {
      if (this.isActive) {
        this.wasActive = true;
        this.handTool.deactivate();
    ***REMOVED***
  ***REMOVED***,
    exitPresentationMode: function HandTool_exitPresentationMode() {
      if (this.wasActive) {
        this.wasActive = false;
        this.handTool.activate();
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  return HandTool;
}();
exports.HandTool = HandTool;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var overlayManager = __webpack_require__(4);
var pdfjsLib = __webpack_require__(1);
var mozL10n = uiUtils.mozL10n;
var OverlayManager = overlayManager.OverlayManager;
var PasswordPrompt = function PasswordPromptClosure() {
  function PasswordPrompt(options) {
    this.overlayName = options.overlayName;
    this.container = options.container;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.updateCallback = null;
    this.reason = null;
    this.submitButton.addEventListener('click', this.verify.bind(this));
    this.cancelButton.addEventListener('click', this.close.bind(this));
    this.input.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        this.verify();
    ***REMOVED***
  ***REMOVED***.bind(this));
    OverlayManager.register(this.overlayName, this.container, this.close.bind(this), true);
***REMOVED***
  PasswordPrompt.prototype = {
    open: function PasswordPrompt_open() {
      OverlayManager.open(this.overlayName).then(function () {
        this.input.type = 'password';
        this.input.focus();
        var promptString = mozL10n.get('password_label', null, 'Enter the password to open this PDF file.');
        if (this.reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
          promptString = mozL10n.get('password_invalid', null, 'Invalid password. Please try again.');
      ***REMOVED***
        this.label.textContent = promptString;
    ***REMOVED***.bind(this));
  ***REMOVED***,
    close: function PasswordPrompt_close() {
      OverlayManager.close(this.overlayName).then(function () {
        this.input.value = '';
        this.input.type = '';
    ***REMOVED***.bind(this));
  ***REMOVED***,
    verify: function PasswordPrompt_verify() {
      var password = this.input.value;
      if (password && password.length > 0) {
        this.close();
        return this.updateCallback(password);
    ***REMOVED***
  ***REMOVED***,
    setUpdateCallback: function PasswordPrompt_setUpdateCallback(updateCallback, reason) {
      this.updateCallback = updateCallback;
      this.reason = reason;
  ***REMOVED***
***REMOVED***;
  return PasswordPrompt;
}();
exports.PasswordPrompt = PasswordPrompt;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pdfjsLib = __webpack_require__(1);
var PDFAttachmentViewer = function PDFAttachmentViewerClosure() {
  function PDFAttachmentViewer(options) {
    this.attachments = null;
    this.container = options.container;
    this.eventBus = options.eventBus;
    this.downloadManager = options.downloadManager;
    this._renderedCapability = pdfjsLib.createPromiseCapability();
    this.eventBus.on('fileattachmentannotation', this._appendAttachment.bind(this));
***REMOVED***
  PDFAttachmentViewer.prototype = {
    reset: function PDFAttachmentViewer_reset(keepRenderedCapability) {
      this.attachments = null;
      this.container.textContent = '';
      if (!keepRenderedCapability) {
        this._renderedCapability = pdfjsLib.createPromiseCapability();
    ***REMOVED***
  ***REMOVED***,
    _dispatchEvent: function PDFAttachmentViewer_dispatchEvent(attachmentsCount) {
      this.eventBus.dispatch('attachmentsloaded', {
        source: this,
        attachmentsCount: attachmentsCount
    ***REMOVED***);
      this._renderedCapability.resolve();
  ***REMOVED***,
    _bindPdfLink: function PDFAttachmentViewer_bindPdfLink(button, content, filename) {
      var blobUrl;
      button.onclick = function () {
        if (!blobUrl) {
          blobUrl = pdfjsLib.createObjectURL(content, 'application/pdf', pdfjsLib.PDFJS.disableCreateObjectURL);
      ***REMOVED***
        var viewerUrl;
        viewerUrl = '?file=' + encodeURIComponent(blobUrl + '#' + filename);
        window.open(viewerUrl);
        return false;
    ***REMOVED***;
  ***REMOVED***,
    _bindLink: function PDFAttachmentViewer_bindLink(button, content, filename) {
      button.onclick = function downloadFile(e) {
        this.downloadManager.downloadData(content, filename, '');
        return false;
    ***REMOVED***.bind(this);
  ***REMOVED***,
    render: function PDFAttachmentViewer_render(params) {
      params = params || {***REMOVED***
      var attachments = params.attachments || null;
      var attachmentsCount = 0;
      if (this.attachments) {
        var keepRenderedCapability = params.keepRenderedCapability === true;
        this.reset(keepRenderedCapability);
    ***REMOVED***
      this.attachments = attachments;
      if (!attachments) {
        this._dispatchEvent(attachmentsCount);
        return;
    ***REMOVED***
      var names = Object.keys(attachments).sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    ***REMOVED***);
      attachmentsCount = names.length;
      for (var i = 0; i < attachmentsCount; i++) {
        var item = attachments[names[i]];
        var filename = pdfjsLib.getFilenameFromUrl(item.filename);
        filename = pdfjsLib.removeNullCharacters(filename);
        var div = document.createElement('div');
        div.className = 'attachmentsItem';
        var button = document.createElement('button');
        button.textContent = filename;
        if (/\.pdf$/i.test(filename)) {
          this._bindPdfLink(button, item.content, filename);
      ***REMOVED*** else {
          this._bindLink(button, item.content, filename);
      ***REMOVED***
        div.appendChild(button);
        this.container.appendChild(div);
    ***REMOVED***
      this._dispatchEvent(attachmentsCount);
  ***REMOVED***,
    _appendAttachment: function PDFAttachmentViewer_appendAttachment(item) {
      this._renderedCapability.promise.then(function (id, filename, content) {
        var attachments = this.attachments;
        if (!attachments) {
          attachments = Object.create(null);
      ***REMOVED*** else {
          for (var name in attachments) {
            if (id === name) {
              return;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
        attachments[id] = {
          filename: filename,
          content: content
      ***REMOVED***;
        this.render({
          attachments: attachments,
          keepRenderedCapability: true
      ***REMOVED***);
    ***REMOVED***.bind(this, item.id, item.filename, item.content));
  ***REMOVED***
***REMOVED***;
  return PDFAttachmentViewer;
}();
exports.PDFAttachmentViewer = PDFAttachmentViewer;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var overlayManager = __webpack_require__(4);
var getPDFFileNameFromURL = uiUtils.getPDFFileNameFromURL;
var mozL10n = uiUtils.mozL10n;
var OverlayManager = overlayManager.OverlayManager;
var PDFDocumentProperties = function PDFDocumentPropertiesClosure() {
  function PDFDocumentProperties(options) {
    this.fields = options.fields;
    this.overlayName = options.overlayName;
    this.container = options.container;
    this.rawFileSize = 0;
    this.url = null;
    this.pdfDocument = null;
    if (options.closeButton) {
      options.closeButton.addEventListener('click', this.close.bind(this));
  ***REMOVED***
    this.dataAvailablePromise = new Promise(function (resolve) {
      this.resolveDataAvailable = resolve;
  ***REMOVED***.bind(this));
    OverlayManager.register(this.overlayName, this.container, this.close.bind(this));
***REMOVED***
  PDFDocumentProperties.prototype = {
    open: function PDFDocumentProperties_open() {
      Promise.all([OverlayManager.open(this.overlayName), this.dataAvailablePromise]).then(function () {
        this._getProperties();
    ***REMOVED***.bind(this));
  ***REMOVED***,
    close: function PDFDocumentProperties_close() {
      OverlayManager.close(this.overlayName);
  ***REMOVED***,
    setFileSize: function PDFDocumentProperties_setFileSize(fileSize) {
      if (fileSize > 0) {
        this.rawFileSize = fileSize;
    ***REMOVED***
  ***REMOVED***,
    setDocumentAndUrl: function PDFDocumentProperties_setDocumentAndUrl(pdfDocument, url) {
      this.pdfDocument = pdfDocument;
      this.url = url;
      this.resolveDataAvailable();
  ***REMOVED***,
    _getProperties: function PDFDocumentProperties_getProperties() {
      if (!OverlayManager.active) {
        return;
    ***REMOVED***
      this.pdfDocument.getDownloadInfo().then(function (data) {
        if (data.length === this.rawFileSize) {
          return;
      ***REMOVED***
        this.setFileSize(data.length);
        this._updateUI(this.fields['fileSize'], this._parseFileSize());
    ***REMOVED***.bind(this));
      this.pdfDocument.getMetadata().then(function (data) {
        var content = {
          'fileName': getPDFFileNameFromURL(this.url),
          'fileSize': this._parseFileSize(),
          'title': data.info.Title,
          'author': data.info.Author,
          'subject': data.info.Subject,
          'keywords': data.info.Keywords,
          'creationDate': this._parseDate(data.info.CreationDate),
          'modificationDate': this._parseDate(data.info.ModDate),
          'creator': data.info.Creator,
          'producer': data.info.Producer,
          'version': data.info.PDFFormatVersion,
          'pageCount': this.pdfDocument.numPages
      ***REMOVED***;
        for (var identifier in content) {
          this._updateUI(this.fields[identifier], content[identifier]);
      ***REMOVED***
    ***REMOVED***.bind(this));
  ***REMOVED***,
    _updateUI: function PDFDocumentProperties_updateUI(field, content) {
      if (field && content !== undefined && content !== '') {
        field.textContent = content;
    ***REMOVED***
  ***REMOVED***,
    _parseFileSize: function PDFDocumentProperties_parseFileSize() {
      var fileSize = this.rawFileSize,
          kb = fileSize / 1024;
      if (!kb) {
        return;
    ***REMOVED*** else if (kb < 1024) {
        return mozL10n.get('document_properties_kb', {
          size_kb: (+kb.toPrecision(3)).toLocaleString(),
          size_b: fileSize.toLocaleString()
      ***REMOVED***, '{{size_kb}} KB ({{size_b}} bytes)');
    ***REMOVED***
      return mozL10n.get('document_properties_mb', {
        size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
        size_b: fileSize.toLocaleString()
    ***REMOVED***, '{{size_mb}} MB ({{size_b}} bytes)');
  ***REMOVED***,
    _parseDate: function PDFDocumentProperties_parseDate(inputDate) {
      var dateToParse = inputDate;
      if (dateToParse === undefined) {
        return '';
    ***REMOVED***
      if (dateToParse.substring(0, 2) === 'D:') {
        dateToParse = dateToParse.substring(2);
    ***REMOVED***
      var year = parseInt(dateToParse.substring(0, 4), 10);
      var month = parseInt(dateToParse.substring(4, 6), 10) - 1;
      var day = parseInt(dateToParse.substring(6, 8), 10);
      var hours = parseInt(dateToParse.substring(8, 10), 10);
      var minutes = parseInt(dateToParse.substring(10, 12), 10);
      var seconds = parseInt(dateToParse.substring(12, 14), 10);
      var utRel = dateToParse.substring(14, 15);
      var offsetHours = parseInt(dateToParse.substring(15, 17), 10);
      var offsetMinutes = parseInt(dateToParse.substring(18, 20), 10);
      if (utRel === '-') {
        hours += offsetHours;
        minutes += offsetMinutes;
    ***REMOVED*** else if (utRel === '+') {
        hours -= offsetHours;
        minutes -= offsetMinutes;
    ***REMOVED***
      var date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
      var dateString = date.toLocaleDateString();
      var timeString = date.toLocaleTimeString();
      return mozL10n.get('document_properties_date_string', {
        date: dateString,
        time: timeString
    ***REMOVED***, '{{date}}, {{time}}');
  ***REMOVED***
***REMOVED***;
  return PDFDocumentProperties;
}();
exports.PDFDocumentProperties = PDFDocumentProperties;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var pdfFindController = __webpack_require__(7);
var mozL10n = uiUtils.mozL10n;
var FindStates = pdfFindController.FindStates;
var PDFFindBar = function PDFFindBarClosure() {
  function PDFFindBar(options) {
    this.opened = false;
    this.bar = options.bar || null;
    this.toggleButton = options.toggleButton || null;
    this.findField = options.findField || null;
    this.highlightAll = options.highlightAllCheckbox || null;
    this.caseSensitive = options.caseSensitiveCheckbox || null;
    this.findMsg = options.findMsg || null;
    this.findResultsCount = options.findResultsCount || null;
    this.findStatusIcon = options.findStatusIcon || null;
    this.findPreviousButton = options.findPreviousButton || null;
    this.findNextButton = options.findNextButton || null;
    this.findController = options.findController || null;
    this.eventBus = options.eventBus;
    if (this.findController === null) {
      throw new Error('PDFFindBar cannot be used without a ' + 'PDFFindController instance.');
  ***REMOVED***
    var self = this;
    this.toggleButton.addEventListener('click', function () {
      self.toggle();
  ***REMOVED***);
    this.findField.addEventListener('input', function () {
      self.dispatchEvent('');
  ***REMOVED***);
    this.bar.addEventListener('keydown', function (evt) {
      switch (evt.keyCode) {
        case 13:
          if (evt.target === self.findField) {
            self.dispatchEvent('again', evt.shiftKey);
        ***REMOVED***
          break;
        case 27:
          self.close();
          break;
    ***REMOVED***
  ***REMOVED***);
    this.findPreviousButton.addEventListener('click', function () {
      self.dispatchEvent('again', true);
  ***REMOVED***);
    this.findNextButton.addEventListener('click', function () {
      self.dispatchEvent('again', false);
  ***REMOVED***);
    this.highlightAll.addEventListener('click', function () {
      self.dispatchEvent('highlightallchange');
  ***REMOVED***);
    this.caseSensitive.addEventListener('click', function () {
      self.dispatchEvent('casesensitivitychange');
  ***REMOVED***);
    this.eventBus.on('resize', this._adjustWidth.bind(this));
***REMOVED***
  PDFFindBar.prototype = {
    reset: function PDFFindBar_reset() {
      this.updateUIState();
  ***REMOVED***,
    dispatchEvent: function PDFFindBar_dispatchEvent(type, findPrev) {
      this.eventBus.dispatch('find', {
        source: this,
        type: type,
        query: this.findField.value,
        caseSensitive: this.caseSensitive.checked,
        phraseSearch: true,
        highlightAll: this.highlightAll.checked,
        findPrevious: findPrev
    ***REMOVED***);
  ***REMOVED***,
    updateUIState: function PDFFindBar_updateUIState(state, previous, matchCount) {
      var notFound = false;
      var findMsg = '';
      var status = '';
      switch (state) {
        case FindStates.FIND_FOUND:
          break;
        case FindStates.FIND_PENDING:
          status = 'pending';
          break;
        case FindStates.FIND_NOTFOUND:
          findMsg = mozL10n.get('find_not_found', null, 'Phrase not found');
          notFound = true;
          break;
        case FindStates.FIND_WRAPPED:
          if (previous) {
            findMsg = mozL10n.get('find_reached_top', null, 'Reached top of document, continued from bottom');
        ***REMOVED*** else {
            findMsg = mozL10n.get('find_reached_bottom', null, 'Reached end of document, continued from top');
        ***REMOVED***
          break;
    ***REMOVED***
      if (notFound) {
        this.findField.classList.add('notFound');
    ***REMOVED*** else {
        this.findField.classList.remove('notFound');
    ***REMOVED***
      this.findField.setAttribute('data-status', status);
      this.findMsg.textContent = findMsg;
      this.updateResultsCount(matchCount);
      this._adjustWidth();
  ***REMOVED***,
    updateResultsCount: function (matchCount) {
      if (!this.findResultsCount) {
        return;
    ***REMOVED***
      if (!matchCount) {
        this.findResultsCount.classList.add('hidden');
        return;
    ***REMOVED***
      this.findResultsCount.textContent = matchCount.toLocaleString();
      this.findResultsCount.classList.remove('hidden');
  ***REMOVED***,
    open: function PDFFindBar_open() {
      if (!this.opened) {
        this.opened = true;
        this.toggleButton.classList.add('toggled');
        this.bar.classList.remove('hidden');
    ***REMOVED***
      this.findField.select();
      this.findField.focus();
      this._adjustWidth();
  ***REMOVED***,
    close: function PDFFindBar_close() {
      if (!this.opened) {
        return;
    ***REMOVED***
      this.opened = false;
      this.toggleButton.classList.remove('toggled');
      this.bar.classList.add('hidden');
      this.findController.active = false;
  ***REMOVED***,
    toggle: function PDFFindBar_toggle() {
      if (this.opened) {
        this.close();
    ***REMOVED*** else {
        this.open();
    ***REMOVED***
  ***REMOVED***,
    _adjustWidth: function PDFFindBar_adjustWidth() {
      if (!this.opened) {
        return;
    ***REMOVED***
      this.bar.classList.remove('wrapContainers');
      var findbarHeight = this.bar.clientHeight;
      var inputContainerHeight = this.bar.firstElementChild.clientHeight;
      if (findbarHeight > inputContainerHeight) {
        this.bar.classList.add('wrapContainers');
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  return PDFFindBar;
}();
exports.PDFFindBar = PDFFindBar;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domEvents = __webpack_require__(2);
function PDFHistory(options) {
  this.linkService = options.linkService;
  this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
  this.initialized = false;
  this.initialDestination = null;
  this.initialBookmark = null;
}
PDFHistory.prototype = {
  initialize: function pdfHistoryInitialize(fingerprint) {
    this.initialized = true;
    this.reInitialized = false;
    this.allowHashChange = true;
    this.historyUnlocked = true;
    this.isViewerInPresentationMode = false;
    this.previousHash = window.location.hash.substring(1);
    this.currentBookmark = '';
    this.currentPage = 0;
    this.updatePreviousBookmark = false;
    this.previousBookmark = '';
    this.previousPage = 0;
    this.nextHashParam = '';
    this.fingerprint = fingerprint;
    this.currentUid = this.uid = 0;
    this.current = {***REMOVED***
    var state = window.history.state;
    if (this._isStateObjectDefined(state)) {
      if (state.target.dest) {
        this.initialDestination = state.target.dest;
    ***REMOVED*** else {
        this.initialBookmark = state.target.hash;
    ***REMOVED***
      this.currentUid = state.uid;
      this.uid = state.uid + 1;
      this.current = state.target;
  ***REMOVED*** else {
      if (state && state.fingerprint && this.fingerprint !== state.fingerprint) {
        this.reInitialized = true;
    ***REMOVED***
      this._pushOrReplaceState({ fingerprint: this.fingerprint }, true);
  ***REMOVED***
    var self = this;
    window.addEventListener('popstate', function pdfHistoryPopstate(evt) {
      if (!self.historyUnlocked) {
        return;
    ***REMOVED***
      if (evt.state) {
        self._goTo(evt.state);
        return;
    ***REMOVED***
      if (self.uid === 0) {
        var previousParams = self.previousHash && self.currentBookmark && self.previousHash !== self.currentBookmark ? {
          hash: self.currentBookmark,
          page: self.currentPage
      ***REMOVED*** : { page: 1 ***REMOVED***
        replacePreviousHistoryState(previousParams, function () {
          updateHistoryWithCurrentHash();
      ***REMOVED***);
    ***REMOVED*** else {
        updateHistoryWithCurrentHash();
    ***REMOVED***
  ***REMOVED***);
    function updateHistoryWithCurrentHash() {
      self.previousHash = window.location.hash.slice(1);
      self._pushToHistory({ hash: self.previousHash }, false, true);
      self._updatePreviousBookmark();
  ***REMOVED***
    function replacePreviousHistoryState(params, callback) {
      self.historyUnlocked = false;
      self.allowHashChange = false;
      window.addEventListener('popstate', rewriteHistoryAfterBack);
      history.back();
      function rewriteHistoryAfterBack() {
        window.removeEventListener('popstate', rewriteHistoryAfterBack);
        window.addEventListener('popstate', rewriteHistoryAfterForward);
        self._pushToHistory(params, false, true);
        history.forward();
    ***REMOVED***
      function rewriteHistoryAfterForward() {
        window.removeEventListener('popstate', rewriteHistoryAfterForward);
        self.allowHashChange = true;
        self.historyUnlocked = true;
        callback();
    ***REMOVED***
  ***REMOVED***
    function pdfHistoryBeforeUnload() {
      var previousParams = self._getPreviousParams(null, true);
      if (previousParams) {
        var replacePrevious = !self.current.dest && self.current.hash !== self.previousHash;
        self._pushToHistory(previousParams, false, replacePrevious);
        self._updatePreviousBookmark();
    ***REMOVED***
      window.removeEventListener('beforeunload', pdfHistoryBeforeUnload);
  ***REMOVED***
    window.addEventListener('beforeunload', pdfHistoryBeforeUnload);
    window.addEventListener('pageshow', function pdfHistoryPageShow(evt) {
      window.addEventListener('beforeunload', pdfHistoryBeforeUnload);
  ***REMOVED***);
    self.eventBus.on('presentationmodechanged', function (e) {
      self.isViewerInPresentationMode = e.active;
  ***REMOVED***);
***REMOVED***,
  clearHistoryState: function pdfHistory_clearHistoryState() {
    this._pushOrReplaceState(null, true);
***REMOVED***,
  _isStateObjectDefined: function pdfHistory_isStateObjectDefined(state) {
    return state && state.uid >= 0 && state.fingerprint && this.fingerprint === state.fingerprint && state.target && state.target.hash ? true : false;
***REMOVED***,
  _pushOrReplaceState: function pdfHistory_pushOrReplaceState(stateObj, replace) {
    if (replace) {
      window.history.replaceState(stateObj, '', document.URL);
  ***REMOVED*** else {
      window.history.pushState(stateObj, '', document.URL);
  ***REMOVED***
***REMOVED***,
  get isHashChangeUnlocked() {
    if (!this.initialized) {
      return true;
  ***REMOVED***
    return this.allowHashChange;
***REMOVED***,
  _updatePreviousBookmark: function pdfHistory_updatePreviousBookmark() {
    if (this.updatePreviousBookmark && this.currentBookmark && this.currentPage) {
      this.previousBookmark = this.currentBookmark;
      this.previousPage = this.currentPage;
      this.updatePreviousBookmark = false;
  ***REMOVED***
***REMOVED***,
  updateCurrentBookmark: function pdfHistoryUpdateCurrentBookmark(bookmark, pageNum) {
    if (this.initialized) {
      this.currentBookmark = bookmark.substring(1);
      this.currentPage = pageNum | 0;
      this._updatePreviousBookmark();
  ***REMOVED***
***REMOVED***,
  updateNextHashParam: function pdfHistoryUpdateNextHashParam(param) {
    if (this.initialized) {
      this.nextHashParam = param;
  ***REMOVED***
***REMOVED***,
  push: function pdfHistoryPush(params, isInitialBookmark) {
    if (!(this.initialized && this.historyUnlocked)) {
      return;
  ***REMOVED***
    if (params.dest && !params.hash) {
      params.hash = this.current.hash && this.current.dest && this.current.dest === params.dest ? this.current.hash : this.linkService.getDestinationHash(params.dest).split('#')[1];
  ***REMOVED***
    if (params.page) {
      params.page |= 0;
  ***REMOVED***
    if (isInitialBookmark) {
      var target = window.history.state.target;
      if (!target) {
        this._pushToHistory(params, false);
        this.previousHash = window.location.hash.substring(1);
    ***REMOVED***
      this.updatePreviousBookmark = this.nextHashParam ? false : true;
      if (target) {
        this._updatePreviousBookmark();
    ***REMOVED***
      return;
  ***REMOVED***
    if (this.nextHashParam) {
      if (this.nextHashParam === params.hash) {
        this.nextHashParam = null;
        this.updatePreviousBookmark = true;
        return;
    ***REMOVED***
      this.nextHashParam = null;
  ***REMOVED***
    if (params.hash) {
      if (this.current.hash) {
        if (this.current.hash !== params.hash) {
          this._pushToHistory(params, true);
      ***REMOVED*** else {
          if (!this.current.page && params.page) {
            this._pushToHistory(params, false, true);
        ***REMOVED***
          this.updatePreviousBookmark = true;
      ***REMOVED***
    ***REMOVED*** else {
        this._pushToHistory(params, true);
    ***REMOVED***
  ***REMOVED*** else if (this.current.page && params.page && this.current.page !== params.page) {
      this._pushToHistory(params, true);
  ***REMOVED***
***REMOVED***,
  _getPreviousParams: function pdfHistory_getPreviousParams(onlyCheckPage, beforeUnload) {
    if (!(this.currentBookmark && this.currentPage)) {
      return null;
  ***REMOVED*** else if (this.updatePreviousBookmark) {
      this.updatePreviousBookmark = false;
  ***REMOVED***
    if (this.uid > 0 && !(this.previousBookmark && this.previousPage)) {
      return null;
  ***REMOVED***
    if (!this.current.dest && !onlyCheckPage || beforeUnload) {
      if (this.previousBookmark === this.currentBookmark) {
        return null;
    ***REMOVED***
  ***REMOVED*** else if (this.current.page || onlyCheckPage) {
      if (this.previousPage === this.currentPage) {
        return null;
    ***REMOVED***
  ***REMOVED*** else {
      return null;
  ***REMOVED***
    var params = {
      hash: this.currentBookmark,
      page: this.currentPage
  ***REMOVED***;
    if (this.isViewerInPresentationMode) {
      params.hash = null;
  ***REMOVED***
    return params;
***REMOVED***,
  _stateObj: function pdfHistory_stateObj(params) {
    return {
      fingerprint: this.fingerprint,
      uid: this.uid,
      target: params
  ***REMOVED***;
***REMOVED***,
  _pushToHistory: function pdfHistory_pushToHistory(params, addPrevious, overwrite) {
    if (!this.initialized) {
      return;
  ***REMOVED***
    if (!params.hash && params.page) {
      params.hash = 'page=' + params.page;
  ***REMOVED***
    if (addPrevious && !overwrite) {
      var previousParams = this._getPreviousParams();
      if (previousParams) {
        var replacePrevious = !this.current.dest && this.current.hash !== this.previousHash;
        this._pushToHistory(previousParams, false, replacePrevious);
    ***REMOVED***
  ***REMOVED***
    this._pushOrReplaceState(this._stateObj(params), overwrite || this.uid === 0);
    this.currentUid = this.uid++;
    this.current = params;
    this.updatePreviousBookmark = true;
***REMOVED***,
  _goTo: function pdfHistory_goTo(state) {
    if (!(this.initialized && this.historyUnlocked && this._isStateObjectDefined(state))) {
      return;
  ***REMOVED***
    if (!this.reInitialized && state.uid < this.currentUid) {
      var previousParams = this._getPreviousParams(true);
      if (previousParams) {
        this._pushToHistory(this.current, false);
        this._pushToHistory(previousParams, false);
        this.currentUid = state.uid;
        window.history.back();
        return;
    ***REMOVED***
  ***REMOVED***
    this.historyUnlocked = false;
    if (state.target.dest) {
      this.linkService.navigateTo(state.target.dest);
  ***REMOVED*** else {
      this.linkService.setHash(state.target.hash);
  ***REMOVED***
    this.currentUid = state.uid;
    if (state.uid > this.uid) {
      this.uid = state.uid;
  ***REMOVED***
    this.current = state.target;
    this.updatePreviousBookmark = true;
    var currentHash = window.location.hash.substring(1);
    if (this.previousHash !== currentHash) {
      this.allowHashChange = false;
  ***REMOVED***
    this.previousHash = currentHash;
    this.historyUnlocked = true;
***REMOVED***,
  back: function pdfHistoryBack() {
    this.go(-1);
***REMOVED***,
  forward: function pdfHistoryForward() {
    this.go(1);
***REMOVED***,
  go: function pdfHistoryGo(direction) {
    if (this.initialized && this.historyUnlocked) {
      var state = window.history.state;
      if (direction === -1 && state && state.uid > 0) {
        window.history.back();
    ***REMOVED*** else if (direction === 1 && state && state.uid < this.uid - 1) {
        window.history.forward();
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
exports.PDFHistory = PDFHistory;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pdfjsLib = __webpack_require__(1);
var PDFJS = pdfjsLib.PDFJS;
var DEFAULT_TITLE = '\u2013';
var PDFOutlineViewer = function PDFOutlineViewerClosure() {
  function PDFOutlineViewer(options) {
    this.outline = null;
    this.lastToggleIsShow = true;
    this.container = options.container;
    this.linkService = options.linkService;
    this.eventBus = options.eventBus;
***REMOVED***
  PDFOutlineViewer.prototype = {
    reset: function PDFOutlineViewer_reset() {
      this.outline = null;
      this.lastToggleIsShow = true;
      this.container.textContent = '';
      this.container.classList.remove('outlineWithDeepNesting');
  ***REMOVED***,
    _dispatchEvent: function PDFOutlineViewer_dispatchEvent(outlineCount) {
      this.eventBus.dispatch('outlineloaded', {
        source: this,
        outlineCount: outlineCount
    ***REMOVED***);
  ***REMOVED***,
    _bindLink: function PDFOutlineViewer_bindLink(element, item) {
      if (item.url) {
        pdfjsLib.addLinkAttributes(element, {
          url: item.url,
          target: item.newWindow ? PDFJS.LinkTarget.BLANK : undefined
      ***REMOVED***);
        return;
    ***REMOVED***
      var self = this,
          destination = item.dest;
      element.href = self.linkService.getDestinationHash(destination);
      element.onclick = function () {
        if (destination) {
          self.linkService.navigateTo(destination);
      ***REMOVED***
        return false;
    ***REMOVED***;
  ***REMOVED***,
    _setStyles: function PDFOutlineViewer_setStyles(element, item) {
      var styleStr = '';
      if (item.bold) {
        styleStr += 'font-weight: bold;';
    ***REMOVED***
      if (item.italic) {
        styleStr += 'font-style: italic;';
    ***REMOVED***
      if (styleStr) {
        element.setAttribute('style', styleStr);
    ***REMOVED***
  ***REMOVED***,
    _addToggleButton: function PDFOutlineViewer_addToggleButton(div) {
      var toggler = document.createElement('div');
      toggler.className = 'outlineItemToggler';
      toggler.onclick = function (event) {
        event.stopPropagation();
        toggler.classList.toggle('outlineItemsHidden');
        if (event.shiftKey) {
          var shouldShowAll = !toggler.classList.contains('outlineItemsHidden');
          this._toggleOutlineItem(div, shouldShowAll);
      ***REMOVED***
    ***REMOVED***.bind(this);
      div.insertBefore(toggler, div.firstChild);
  ***REMOVED***,
    _toggleOutlineItem: function PDFOutlineViewer_toggleOutlineItem(root, show) {
      this.lastToggleIsShow = show;
      var togglers = root.querySelectorAll('.outlineItemToggler');
      for (var i = 0, ii = togglers.length; i < ii; ++i) {
        togglers[i].classList[show ? 'remove' : 'add']('outlineItemsHidden');
    ***REMOVED***
  ***REMOVED***,
    toggleOutlineTree: function PDFOutlineViewer_toggleOutlineTree() {
      if (!this.outline) {
        return;
    ***REMOVED***
      this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
  ***REMOVED***,
    render: function PDFOutlineViewer_render(params) {
      var outline = params && params.outline || null;
      var outlineCount = 0;
      if (this.outline) {
        this.reset();
    ***REMOVED***
      this.outline = outline;
      if (!outline) {
        this._dispatchEvent(outlineCount);
        return;
    ***REMOVED***
      var fragment = document.createDocumentFragment();
      var queue = [{
        parent: fragment,
        items: this.outline
    ***REMOVED***];
      var hasAnyNesting = false;
      while (queue.length > 0) {
        var levelData = queue.shift();
        for (var i = 0, len = levelData.items.length; i < len; i++) {
          var item = levelData.items[i];
          var div = document.createElement('div');
          div.className = 'outlineItem';
          var element = document.createElement('a');
          this._bindLink(element, item);
          this._setStyles(element, item);
          element.textContent = pdfjsLib.removeNullCharacters(item.title) || DEFAULT_TITLE;
          div.appendChild(element);
          if (item.items.length > 0) {
            hasAnyNesting = true;
            this._addToggleButton(div);
            var itemsDiv = document.createElement('div');
            itemsDiv.className = 'outlineItems';
            div.appendChild(itemsDiv);
            queue.push({
              parent: itemsDiv,
              items: item.items
          ***REMOVED***);
        ***REMOVED***
          levelData.parent.appendChild(div);
          outlineCount++;
      ***REMOVED***
    ***REMOVED***
      if (hasAnyNesting) {
        this.container.classList.add('outlineWithDeepNesting');
    ***REMOVED***
      this.container.appendChild(fragment);
      this._dispatchEvent(outlineCount);
  ***REMOVED***
***REMOVED***;
  return PDFOutlineViewer;
}();
exports.PDFOutlineViewer = PDFOutlineViewer;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var pdfRenderingQueue = __webpack_require__(3);
var domEvents = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var CSS_UNITS = uiUtils.CSS_UNITS;
var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
var getOutputScale = uiUtils.getOutputScale;
var approximateFraction = uiUtils.approximateFraction;
var roundToDivide = uiUtils.roundToDivide;
var RendererType = uiUtils.RendererType;
var RenderingStates = pdfRenderingQueue.RenderingStates;
var TEXT_LAYER_RENDER_DELAY = 200;
var PDFPageView = function PDFPageViewClosure() {
  function PDFPageView(options) {
    var container = options.container;
    var id = options.id;
    var scale = options.scale;
    var defaultViewport = options.defaultViewport;
    var renderingQueue = options.renderingQueue;
    var textLayerFactory = options.textLayerFactory;
    var annotationLayerFactory = options.annotationLayerFactory;
    var enhanceTextSelection = options.enhanceTextSelection || false;
    var renderInteractiveForms = options.renderInteractiveForms || false;
    this.id = id;
    this.renderingId = 'page' + id;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = scale || DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this.hasRestrictedScaling = false;
    this.enhanceTextSelection = enhanceTextSelection;
    this.renderInteractiveForms = renderInteractiveForms;
    this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
    this.renderingQueue = renderingQueue;
    this.textLayerFactory = textLayerFactory;
    this.annotationLayerFactory = annotationLayerFactory;
    this.renderer = options.renderer || RendererType.CANVAS;
    this.paintTask = null;
    this.paintedViewportMap = new WeakMap();
    this.renderingState = RenderingStates.INITIAL;
    this.resume = null;
    this.error = null;
    this.onBeforeDraw = null;
    this.onAfterDraw = null;
    this.textLayer = null;
    this.zoomLayer = null;
    this.annotationLayer = null;
    var div = document.createElement('div');
    div.className = 'page';
    div.style.width = Math.floor(this.viewport.width) + 'px';
    div.style.height = Math.floor(this.viewport.height) + 'px';
    div.setAttribute('data-page-number', this.id);
    this.div = div;
    container.appendChild(div);
***REMOVED***
  PDFPageView.prototype = {
    setPdfPage: function PDFPageView_setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport(this.scale * CSS_UNITS, totalRotation);
      this.stats = pdfPage.stats;
      this.reset();
  ***REMOVED***,
    destroy: function PDFPageView_destroy() {
      this.reset();
      if (this.pdfPage) {
        this.pdfPage.cleanup();
    ***REMOVED***
  ***REMOVED***,
    _resetZoomLayer: function (removeFromDOM) {
      if (!this.zoomLayer) {
        return;
    ***REMOVED***
      var zoomLayerCanvas = this.zoomLayer.firstChild;
      this.paintedViewportMap.delete(zoomLayerCanvas);
      zoomLayerCanvas.width = 0;
      zoomLayerCanvas.height = 0;
      if (removeFromDOM) {
        this.zoomLayer.remove();
    ***REMOVED***
      this.zoomLayer = null;
  ***REMOVED***,
    reset: function PDFPageView_reset(keepZoomLayer, keepAnnotations) {
      this.cancelRendering();
      var div = this.div;
      div.style.width = Math.floor(this.viewport.width) + 'px';
      div.style.height = Math.floor(this.viewport.height) + 'px';
      var childNodes = div.childNodes;
      var currentZoomLayerNode = keepZoomLayer && this.zoomLayer || null;
      var currentAnnotationNode = keepAnnotations && this.annotationLayer && this.annotationLayer.div || null;
      for (var i = childNodes.length - 1; i >= 0; i--) {
        var node = childNodes[i];
        if (currentZoomLayerNode === node || currentAnnotationNode === node) {
          continue;
      ***REMOVED***
        div.removeChild(node);
    ***REMOVED***
      div.removeAttribute('data-loaded');
      if (currentAnnotationNode) {
        this.annotationLayer.hide();
    ***REMOVED*** else {
        this.annotationLayer = null;
    ***REMOVED***
      if (!currentZoomLayerNode) {
        if (this.canvas) {
          this.paintedViewportMap.delete(this.canvas);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
      ***REMOVED***
        this._resetZoomLayer();
    ***REMOVED***
      if (this.svg) {
        this.paintedViewportMap.delete(this.svg);
        delete this.svg;
    ***REMOVED***
      this.loadingIconDiv = document.createElement('div');
      this.loadingIconDiv.className = 'loadingIcon';
      div.appendChild(this.loadingIconDiv);
  ***REMOVED***,
    update: function PDFPageView_update(scale, rotation) {
      this.scale = scale || this.scale;
      if (typeof rotation !== 'undefined') {
        this.rotation = rotation;
    ***REMOVED***
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
        scale: this.scale * CSS_UNITS,
        rotation: totalRotation
    ***REMOVED***);
      if (this.svg) {
        this.cssTransform(this.svg, true);
        this.eventBus.dispatch('pagerendered', {
          source: this,
          pageNumber: this.id,
          cssTransform: true
      ***REMOVED***);
        return;
    ***REMOVED***
      var isScalingRestricted = false;
      if (this.canvas && pdfjsLib.PDFJS.maxCanvasPixels > 0) {
        var outputScale = this.outputScale;
        if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > pdfjsLib.PDFJS.maxCanvasPixels) {
          isScalingRestricted = true;
      ***REMOVED***
    ***REMOVED***
      if (this.canvas) {
        if (pdfjsLib.PDFJS.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
          this.cssTransform(this.canvas, true);
          this.eventBus.dispatch('pagerendered', {
            source: this,
            pageNumber: this.id,
            cssTransform: true
        ***REMOVED***);
          return;
      ***REMOVED***
        if (!this.zoomLayer) {
          this.zoomLayer = this.canvas.parentNode;
          this.zoomLayer.style.position = 'absolute';
      ***REMOVED***
    ***REMOVED***
      if (this.zoomLayer) {
        this.cssTransform(this.zoomLayer.firstChild);
    ***REMOVED***
      this.reset(true, true);
  ***REMOVED***,
    cancelRendering: function PDFPageView_cancelRendering() {
      if (this.paintTask) {
        this.paintTask.cancel();
        this.paintTask = null;
    ***REMOVED***
      this.renderingState = RenderingStates.INITIAL;
      this.resume = null;
      if (this.textLayer) {
        this.textLayer.cancel();
        this.textLayer = null;
    ***REMOVED***
  ***REMOVED***,
    updatePosition: function PDFPageView_updatePosition() {
      if (this.textLayer) {
        this.textLayer.render(TEXT_LAYER_RENDER_DELAY);
    ***REMOVED***
  ***REMOVED***,
    cssTransform: function PDFPageView_transform(target, redrawAnnotations) {
      var CustomStyle = pdfjsLib.CustomStyle;
      var width = this.viewport.width;
      var height = this.viewport.height;
      var div = this.div;
      target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + 'px';
      target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + 'px';
      var relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
      var absRotation = Math.abs(relativeRotation);
      var scaleX = 1,
          scaleY = 1;
      if (absRotation === 90 || absRotation === 270) {
        scaleX = height / width;
        scaleY = width / height;
    ***REMOVED***
      var cssTransform = 'rotate(' + relativeRotation + 'deg) ' + 'scale(' + scaleX + ',' + scaleY + ')';
      CustomStyle.setProp('transform', target, cssTransform);
      if (this.textLayer) {
        var textLayerViewport = this.textLayer.viewport;
        var textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
        var textAbsRotation = Math.abs(textRelativeRotation);
        var scale = width / textLayerViewport.width;
        if (textAbsRotation === 90 || textAbsRotation === 270) {
          scale = width / textLayerViewport.height;
      ***REMOVED***
        var textLayerDiv = this.textLayer.textLayerDiv;
        var transX, transY;
        switch (textAbsRotation) {
          case 0:
            transX = transY = 0;
            break;
          case 90:
            transX = 0;
            transY = '-' + textLayerDiv.style.height;
            break;
          case 180:
            transX = '-' + textLayerDiv.style.width;
            transY = '-' + textLayerDiv.style.height;
            break;
          case 270:
            transX = '-' + textLayerDiv.style.width;
            transY = 0;
            break;
          default:
            console.error('Bad rotation value.');
            break;
      ***REMOVED***
        CustomStyle.setProp('transform', textLayerDiv, 'rotate(' + textAbsRotation + 'deg) ' + 'scale(' + scale + ', ' + scale + ') ' + 'translate(' + transX + ', ' + transY + ')');
        CustomStyle.setProp('transformOrigin', textLayerDiv, '0% 0%');
    ***REMOVED***
      if (redrawAnnotations && this.annotationLayer) {
        this.annotationLayer.render(this.viewport, 'display');
    ***REMOVED***
  ***REMOVED***,
    get width() {
      return this.viewport.width;
  ***REMOVED***,
    get height() {
      return this.viewport.height;
  ***REMOVED***,
    getPagePoint: function PDFPageView_getPagePoint(x, y) {
      return this.viewport.convertToPdfPoint(x, y);
  ***REMOVED***,
    draw: function PDFPageView_draw() {
      if (this.renderingState !== RenderingStates.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
    ***REMOVED***
      this.renderingState = RenderingStates.RUNNING;
      var self = this;
      var pdfPage = this.pdfPage;
      var div = this.div;
      var canvasWrapper = document.createElement('div');
      canvasWrapper.style.width = div.style.width;
      canvasWrapper.style.height = div.style.height;
      canvasWrapper.classList.add('canvasWrapper');
      if (this.annotationLayer && this.annotationLayer.div) {
        div.insertBefore(canvasWrapper, this.annotationLayer.div);
    ***REMOVED*** else {
        div.appendChild(canvasWrapper);
    ***REMOVED***
      var textLayerDiv = null;
      var textLayer = null;
      if (this.textLayerFactory) {
        textLayerDiv = document.createElement('div');
        textLayerDiv.className = 'textLayer';
        textLayerDiv.style.width = canvasWrapper.style.width;
        textLayerDiv.style.height = canvasWrapper.style.height;
        if (this.annotationLayer && this.annotationLayer.div) {
          div.insertBefore(textLayerDiv, this.annotationLayer.div);
      ***REMOVED*** else {
          div.appendChild(textLayerDiv);
      ***REMOVED***
        textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.enhanceTextSelection);
    ***REMOVED***
      this.textLayer = textLayer;
      var renderContinueCallback = null;
      if (this.renderingQueue) {
        renderContinueCallback = function renderContinueCallback(cont) {
          if (!self.renderingQueue.isHighestPriority(self)) {
            self.renderingState = RenderingStates.PAUSED;
            self.resume = function resumeCallback() {
              self.renderingState = RenderingStates.RUNNING;
              cont();
          ***REMOVED***;
            return;
        ***REMOVED***
          cont();
      ***REMOVED***;
    ***REMOVED***
      var finishPaintTask = function finishPaintTask(error) {
        if (paintTask === self.paintTask) {
          self.paintTask = null;
      ***REMOVED***
        if (error === 'cancelled' || error instanceof pdfjsLib.RenderingCancelledException) {
          self.error = null;
          return Promise.resolve(undefined);
      ***REMOVED***
        self.renderingState = RenderingStates.FINISHED;
        if (self.loadingIconDiv) {
          div.removeChild(self.loadingIconDiv);
          delete self.loadingIconDiv;
      ***REMOVED***
        self._resetZoomLayer(true);
        self.error = error;
        self.stats = pdfPage.stats;
        if (self.onAfterDraw) {
          self.onAfterDraw();
      ***REMOVED***
        self.eventBus.dispatch('pagerendered', {
          source: self,
          pageNumber: self.id,
          cssTransform: false
      ***REMOVED***);
        if (error) {
          return Promise.reject(error);
      ***REMOVED***
        return Promise.resolve(undefined);
    ***REMOVED***;
      var paintTask = this.renderer === RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
      paintTask.onRenderContinue = renderContinueCallback;
      this.paintTask = paintTask;
      var resultPromise = paintTask.promise.then(function () {
        return finishPaintTask(null).then(function () {
          if (textLayer) {
            pdfPage.getTextContent({ normalizeWhitespace: true }).then(function textContentResolved(textContent) {
              textLayer.setTextContent(textContent);
              textLayer.render(TEXT_LAYER_RENDER_DELAY);
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***, function (reason) {
        return finishPaintTask(reason);
    ***REMOVED***);
      if (this.annotationLayerFactory) {
        if (!this.annotationLayer) {
          this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, this.renderInteractiveForms);
      ***REMOVED***
        this.annotationLayer.render(this.viewport, 'display');
    ***REMOVED***
      div.setAttribute('data-loaded', true);
      if (this.onBeforeDraw) {
        this.onBeforeDraw();
    ***REMOVED***
      return resultPromise;
  ***REMOVED***,
    paintOnCanvas: function (canvasWrapper) {
      var resolveRenderPromise, rejectRenderPromise;
      var promise = new Promise(function (resolve, reject) {
        resolveRenderPromise = resolve;
        rejectRenderPromise = reject;
    ***REMOVED***);
      var result = {
        promise: promise,
        onRenderContinue: function (cont) {
          cont();
      ***REMOVED***,
        cancel: function () {
          renderTask.cancel();
      ***REMOVED***
    ***REMOVED***;
      var viewport = this.viewport;
      var canvas = document.createElement('canvas');
      canvas.id = 'page' + this.id;
      canvas.setAttribute('hidden', 'hidden');
      var isCanvasHidden = true;
      var showCanvas = function () {
        if (isCanvasHidden) {
          canvas.removeAttribute('hidden');
          isCanvasHidden = false;
      ***REMOVED***
    ***REMOVED***;
      canvasWrapper.appendChild(canvas);
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext('2d', { alpha: false });
      var outputScale = getOutputScale(ctx);
      this.outputScale = outputScale;
      if (pdfjsLib.PDFJS.useOnlyCssZoom) {
        var actualSizeViewport = viewport.clone({ scale: CSS_UNITS });
        outputScale.sx *= actualSizeViewport.width / viewport.width;
        outputScale.sy *= actualSizeViewport.height / viewport.height;
        outputScale.scaled = true;
    ***REMOVED***
      if (pdfjsLib.PDFJS.maxCanvasPixels > 0) {
        var pixelsInViewport = viewport.width * viewport.height;
        var maxScale = Math.sqrt(pdfjsLib.PDFJS.maxCanvasPixels / pixelsInViewport);
        if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
          outputScale.sx = maxScale;
          outputScale.sy = maxScale;
          outputScale.scaled = true;
          this.hasRestrictedScaling = true;
      ***REMOVED*** else {
          this.hasRestrictedScaling = false;
      ***REMOVED***
    ***REMOVED***
      var sfx = approximateFraction(outputScale.sx);
      var sfy = approximateFraction(outputScale.sy);
      canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
      canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
      canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
      canvas.style.height = roundToDivide(viewport.height, sfy[1]) + 'px';
      this.paintedViewportMap.set(canvas, viewport);
      var transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
      var renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: this.viewport,
        renderInteractiveForms: this.renderInteractiveForms
    ***REMOVED***;
      var renderTask = this.pdfPage.render(renderContext);
      renderTask.onContinue = function (cont) {
        showCanvas();
        if (result.onRenderContinue) {
          result.onRenderContinue(cont);
      ***REMOVED*** else {
          cont();
      ***REMOVED***
    ***REMOVED***;
      renderTask.promise.then(function pdfPageRenderCallback() {
        showCanvas();
        resolveRenderPromise(undefined);
    ***REMOVED***, function pdfPageRenderError(error) {
        showCanvas();
        rejectRenderPromise(error);
    ***REMOVED***);
      return result;
  ***REMOVED***,
    paintOnSvg: function PDFPageView_paintOnSvg(wrapper) {
      var cancelled = false;
      var ensureNotCancelled = function () {
        if (cancelled) {
          if (pdfjsLib.PDFJS.pdfjsNext) {
            throw new pdfjsLib.RenderingCancelledException('Rendering cancelled, page ' + self.id, 'svg');
        ***REMOVED*** else {
            throw 'cancelled';
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
      var self = this;
      var pdfPage = this.pdfPage;
      var SVGGraphics = pdfjsLib.SVGGraphics;
      var actualSizeViewport = this.viewport.clone({ scale: CSS_UNITS });
      var promise = pdfPage.getOperatorList().then(function (opList) {
        ensureNotCancelled();
        var svgGfx = new SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
        return svgGfx.getSVG(opList, actualSizeViewport).then(function (svg) {
          ensureNotCancelled();
          self.svg = svg;
          self.paintedViewportMap.set(svg, actualSizeViewport);
          svg.style.width = wrapper.style.width;
          svg.style.height = wrapper.style.height;
          self.renderingState = RenderingStates.FINISHED;
          wrapper.appendChild(svg);
      ***REMOVED***);
    ***REMOVED***);
      return {
        promise: promise,
        onRenderContinue: function (cont) {
          cont();
      ***REMOVED***,
        cancel: function () {
          cancelled = true;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***,
    setPageLabel: function PDFView_setPageLabel(label) {
      this.pageLabel = typeof label === 'string' ? label : null;
      if (this.pageLabel !== null) {
        this.div.setAttribute('data-page-label', this.pageLabel);
    ***REMOVED*** else {
        this.div.removeAttribute('data-page-label');
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  return PDFPageView;
}();
exports.PDFPageView = PDFPageView;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var normalizeWheelEventDelta = uiUtils.normalizeWheelEventDelta;
var DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500;
var DELAY_BEFORE_HIDING_CONTROLS = 3000;
var ACTIVE_SELECTOR = 'pdfPresentationMode';
var CONTROLS_SELECTOR = 'pdfPresentationModeControls';
var PDFPresentationMode = function PDFPresentationModeClosure() {
  function PDFPresentationMode(options) {
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;
    this.pdfViewer = options.pdfViewer;
    this.eventBus = options.eventBus;
    var contextMenuItems = options.contextMenuItems || null;
    this.active = false;
    this.args = null;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;
    if (contextMenuItems) {
      contextMenuItems.contextFirstPage.addEventListener('click', function PDFPresentationMode_contextFirstPageClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('firstpage');
    ***REMOVED***.bind(this));
      contextMenuItems.contextLastPage.addEventListener('click', function PDFPresentationMode_contextLastPageClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('lastpage');
    ***REMOVED***.bind(this));
      contextMenuItems.contextPageRotateCw.addEventListener('click', function PDFPresentationMode_contextPageRotateCwClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('rotatecw');
    ***REMOVED***.bind(this));
      contextMenuItems.contextPageRotateCcw.addEventListener('click', function PDFPresentationMode_contextPageRotateCcwClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('rotateccw');
    ***REMOVED***.bind(this));
  ***REMOVED***
***REMOVED***
  PDFPresentationMode.prototype = {
    request: function PDFPresentationMode_request() {
      if (this.switchInProgress || this.active || !this.viewer.hasChildNodes()) {
        return false;
    ***REMOVED***
      this._addFullscreenChangeListeners();
      this._setSwitchInProgress();
      this._notifyStateChange();
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
    ***REMOVED*** else if (this.container.mozRequestFullScreen) {
        this.container.mozRequestFullScreen();
    ***REMOVED*** else if (this.container.webkitRequestFullscreen) {
        this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    ***REMOVED*** else if (this.container.msRequestFullscreen) {
        this.container.msRequestFullscreen();
    ***REMOVED*** else {
        return false;
    ***REMOVED***
      this.args = {
        page: this.pdfViewer.currentPageNumber,
        previousScale: this.pdfViewer.currentScaleValue
    ***REMOVED***;
      return true;
  ***REMOVED***,
    _mouseWheel: function PDFPresentationMode_mouseWheel(evt) {
      if (!this.active) {
        return;
    ***REMOVED***
      evt.preventDefault();
      var delta = normalizeWheelEventDelta(evt);
      var MOUSE_SCROLL_COOLDOWN_TIME = 50;
      var PAGE_SWITCH_THRESHOLD = 0.1;
      var currentTime = new Date().getTime();
      var storedTime = this.mouseScrollTimeStamp;
      if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
        return;
    ***REMOVED***
      if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
        this._resetMouseScrollState();
    ***REMOVED***
      this.mouseScrollDelta += delta;
      if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
        var totalDelta = this.mouseScrollDelta;
        this._resetMouseScrollState();
        var success = totalDelta > 0 ? this._goToPreviousPage() : this._goToNextPage();
        if (success) {
          this.mouseScrollTimeStamp = currentTime;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    get isFullscreen() {
      return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement);
  ***REMOVED***,
    _goToPreviousPage: function PDFPresentationMode_goToPreviousPage() {
      var page = this.pdfViewer.currentPageNumber;
      if (page <= 1) {
        return false;
    ***REMOVED***
      this.pdfViewer.currentPageNumber = page - 1;
      return true;
  ***REMOVED***,
    _goToNextPage: function PDFPresentationMode_goToNextPage() {
      var page = this.pdfViewer.currentPageNumber;
      if (page >= this.pdfViewer.pagesCount) {
        return false;
    ***REMOVED***
      this.pdfViewer.currentPageNumber = page + 1;
      return true;
  ***REMOVED***,
    _notifyStateChange: function PDFPresentationMode_notifyStateChange() {
      this.eventBus.dispatch('presentationmodechanged', {
        source: this,
        active: this.active,
        switchInProgress: !!this.switchInProgress
    ***REMOVED***);
  ***REMOVED***,
    _setSwitchInProgress: function PDFPresentationMode_setSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
    ***REMOVED***
      this.switchInProgress = setTimeout(function switchInProgressTimeout() {
        this._removeFullscreenChangeListeners();
        delete this.switchInProgress;
        this._notifyStateChange();
    ***REMOVED***.bind(this), DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS);
  ***REMOVED***,
    _resetSwitchInProgress: function PDFPresentationMode_resetSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
        delete this.switchInProgress;
    ***REMOVED***
  ***REMOVED***,
    _enter: function PDFPresentationMode_enter() {
      this.active = true;
      this._resetSwitchInProgress();
      this._notifyStateChange();
      this.container.classList.add(ACTIVE_SELECTOR);
      setTimeout(function enterPresentationModeTimeout() {
        this.pdfViewer.currentPageNumber = this.args.page;
        this.pdfViewer.currentScaleValue = 'page-fit';
    ***REMOVED***.bind(this), 0);
      this._addWindowListeners();
      this._showControls();
      this.contextMenuOpen = false;
      this.container.setAttribute('contextmenu', 'viewerContextMenu');
      window.getSelection().removeAllRanges();
  ***REMOVED***,
    _exit: function PDFPresentationMode_exit() {
      var page = this.pdfViewer.currentPageNumber;
      this.container.classList.remove(ACTIVE_SELECTOR);
      setTimeout(function exitPresentationModeTimeout() {
        this.active = false;
        this._removeFullscreenChangeListeners();
        this._notifyStateChange();
        this.pdfViewer.currentScaleValue = this.args.previousScale;
        this.pdfViewer.currentPageNumber = page;
        this.args = null;
    ***REMOVED***.bind(this), 0);
      this._removeWindowListeners();
      this._hideControls();
      this._resetMouseScrollState();
      this.container.removeAttribute('contextmenu');
      this.contextMenuOpen = false;
  ***REMOVED***,
    _mouseDown: function PDFPresentationMode_mouseDown(evt) {
      if (this.contextMenuOpen) {
        this.contextMenuOpen = false;
        evt.preventDefault();
        return;
    ***REMOVED***
      if (evt.button === 0) {
        var isInternalLink = evt.target.href && evt.target.classList.contains('internalLink');
        if (!isInternalLink) {
          evt.preventDefault();
          this.pdfViewer.currentPageNumber += evt.shiftKey ? -1 : 1;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    _contextMenu: function PDFPresentationMode_contextMenu() {
      this.contextMenuOpen = true;
  ***REMOVED***,
    _showControls: function PDFPresentationMode_showControls() {
      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout);
    ***REMOVED*** else {
        this.container.classList.add(CONTROLS_SELECTOR);
    ***REMOVED***
      this.controlsTimeout = setTimeout(function showControlsTimeout() {
        this.container.classList.remove(CONTROLS_SELECTOR);
        delete this.controlsTimeout;
    ***REMOVED***.bind(this), DELAY_BEFORE_HIDING_CONTROLS);
  ***REMOVED***,
    _hideControls: function PDFPresentationMode_hideControls() {
      if (!this.controlsTimeout) {
        return;
    ***REMOVED***
      clearTimeout(this.controlsTimeout);
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
  ***REMOVED***,
    _resetMouseScrollState: function PDFPresentationMode_resetMouseScrollState() {
      this.mouseScrollTimeStamp = 0;
      this.mouseScrollDelta = 0;
  ***REMOVED***,
    _touchSwipe: function PDFPresentationMode_touchSwipe(evt) {
      if (!this.active) {
        return;
    ***REMOVED***
      var SWIPE_MIN_DISTANCE_THRESHOLD = 50;
      var SWIPE_ANGLE_THRESHOLD = Math.PI / 6;
      if (evt.touches.length > 1) {
        this.touchSwipeState = null;
        return;
    ***REMOVED***
      switch (evt.type) {
        case 'touchstart':
          this.touchSwipeState = {
            startX: evt.touches[0].pageX,
            startY: evt.touches[0].pageY,
            endX: evt.touches[0].pageX,
            endY: evt.touches[0].pageY
        ***REMOVED***;
          break;
        case 'touchmove':
          if (this.touchSwipeState === null) {
            return;
        ***REMOVED***
          this.touchSwipeState.endX = evt.touches[0].pageX;
          this.touchSwipeState.endY = evt.touches[0].pageY;
          evt.preventDefault();
          break;
        case 'touchend':
          if (this.touchSwipeState === null) {
            return;
        ***REMOVED***
          var delta = 0;
          var dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
          var dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
          var absAngle = Math.abs(Math.atan2(dy, dx));
          if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
            delta = dx;
        ***REMOVED*** else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
            delta = dy;
        ***REMOVED***
          if (delta > 0) {
            this._goToPreviousPage();
        ***REMOVED*** else if (delta < 0) {
            this._goToNextPage();
        ***REMOVED***
          break;
    ***REMOVED***
  ***REMOVED***,
    _addWindowListeners: function PDFPresentationMode_addWindowListeners() {
      this.showControlsBind = this._showControls.bind(this);
      this.mouseDownBind = this._mouseDown.bind(this);
      this.mouseWheelBind = this._mouseWheel.bind(this);
      this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
      this.contextMenuBind = this._contextMenu.bind(this);
      this.touchSwipeBind = this._touchSwipe.bind(this);
      window.addEventListener('mousemove', this.showControlsBind);
      window.addEventListener('mousedown', this.mouseDownBind);
      window.addEventListener('wheel', this.mouseWheelBind);
      window.addEventListener('keydown', this.resetMouseScrollStateBind);
      window.addEventListener('contextmenu', this.contextMenuBind);
      window.addEventListener('touchstart', this.touchSwipeBind);
      window.addEventListener('touchmove', this.touchSwipeBind);
      window.addEventListener('touchend', this.touchSwipeBind);
  ***REMOVED***,
    _removeWindowListeners: function PDFPresentationMode_removeWindowListeners() {
      window.removeEventListener('mousemove', this.showControlsBind);
      window.removeEventListener('mousedown', this.mouseDownBind);
      window.removeEventListener('wheel', this.mouseWheelBind);
      window.removeEventListener('keydown', this.resetMouseScrollStateBind);
      window.removeEventListener('contextmenu', this.contextMenuBind);
      window.removeEventListener('touchstart', this.touchSwipeBind);
      window.removeEventListener('touchmove', this.touchSwipeBind);
      window.removeEventListener('touchend', this.touchSwipeBind);
      delete this.showControlsBind;
      delete this.mouseDownBind;
      delete this.mouseWheelBind;
      delete this.resetMouseScrollStateBind;
      delete this.contextMenuBind;
      delete this.touchSwipeBind;
  ***REMOVED***,
    _fullscreenChange: function PDFPresentationMode_fullscreenChange() {
      if (this.isFullscreen) {
        this._enter();
    ***REMOVED*** else {
        this._exit();
    ***REMOVED***
  ***REMOVED***,
    _addFullscreenChangeListeners: function PDFPresentationMode_addFullscreenChangeListeners() {
      this.fullscreenChangeBind = this._fullscreenChange.bind(this);
      window.addEventListener('fullscreenchange', this.fullscreenChangeBind);
      window.addEventListener('mozfullscreenchange', this.fullscreenChangeBind);
      window.addEventListener('webkitfullscreenchange', this.fullscreenChangeBind);
      window.addEventListener('MSFullscreenChange', this.fullscreenChangeBind);
  ***REMOVED***,
    _removeFullscreenChangeListeners: function PDFPresentationMode_removeFullscreenChangeListeners() {
      window.removeEventListener('fullscreenchange', this.fullscreenChangeBind);
      window.removeEventListener('mozfullscreenchange', this.fullscreenChangeBind);
      window.removeEventListener('webkitfullscreenchange', this.fullscreenChangeBind);
      window.removeEventListener('MSFullscreenChange', this.fullscreenChangeBind);
      delete this.fullscreenChangeBind;
  ***REMOVED***
***REMOVED***;
  return PDFPresentationMode;
}();
exports.PDFPresentationMode = PDFPresentationMode;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pdfRenderingQueue = __webpack_require__(3);
var uiUtils = __webpack_require__(0);
var RenderingStates = pdfRenderingQueue.RenderingStates;
var mozL10n = uiUtils.mozL10n;
var UI_NOTIFICATION_CLASS = 'pdfSidebarNotification';
var SidebarView = {
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3
***REMOVED***
var PDFSidebar = function PDFSidebarClosure() {
  function PDFSidebar(options) {
    this.isOpen = false;
    this.active = SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.onToggled = null;
    this.pdfViewer = options.pdfViewer;
    this.pdfThumbnailViewer = options.pdfThumbnailViewer;
    this.pdfOutlineViewer = options.pdfOutlineViewer;
    this.mainContainer = options.mainContainer;
    this.outerContainer = options.outerContainer;
    this.eventBus = options.eventBus;
    this.toggleButton = options.toggleButton;
    this.thumbnailButton = options.thumbnailButton;
    this.outlineButton = options.outlineButton;
    this.attachmentsButton = options.attachmentsButton;
    this.thumbnailView = options.thumbnailView;
    this.outlineView = options.outlineView;
    this.attachmentsView = options.attachmentsView;
    this.disableNotification = options.disableNotification || false;
    this._addEventListeners();
***REMOVED***
  PDFSidebar.prototype = {
    reset: function PDFSidebar_reset() {
      this.isInitialViewSet = false;
      this._hideUINotification(null);
      this.switchView(SidebarView.THUMBS);
      this.outlineButton.disabled = false;
      this.attachmentsButton.disabled = false;
  ***REMOVED***,
    get visibleView() {
      return this.isOpen ? this.active : SidebarView.NONE;
  ***REMOVED***,
    get isThumbnailViewVisible() {
      return this.isOpen && this.active === SidebarView.THUMBS;
  ***REMOVED***,
    get isOutlineViewVisible() {
      return this.isOpen && this.active === SidebarView.OUTLINE;
  ***REMOVED***,
    get isAttachmentsViewVisible() {
      return this.isOpen && this.active === SidebarView.ATTACHMENTS;
  ***REMOVED***,
    setInitialView: function PDFSidebar_setInitialView(view) {
      if (this.isInitialViewSet) {
        return;
    ***REMOVED***
      this.isInitialViewSet = true;
      if (this.isOpen && view === SidebarView.NONE) {
        this._dispatchEvent();
        return;
    ***REMOVED***
      var isViewPreserved = view === this.visibleView;
      this.switchView(view, true);
      if (isViewPreserved) {
        this._dispatchEvent();
    ***REMOVED***
  ***REMOVED***,
    switchView: function PDFSidebar_switchView(view, forceOpen) {
      if (view === SidebarView.NONE) {
        this.close();
        return;
    ***REMOVED***
      var isViewChanged = view !== this.active;
      var shouldForceRendering = false;
      switch (view) {
        case SidebarView.THUMBS:
          this.thumbnailButton.classList.add('toggled');
          this.outlineButton.classList.remove('toggled');
          this.attachmentsButton.classList.remove('toggled');
          this.thumbnailView.classList.remove('hidden');
          this.outlineView.classList.add('hidden');
          this.attachmentsView.classList.add('hidden');
          if (this.isOpen && isViewChanged) {
            this._updateThumbnailViewer();
            shouldForceRendering = true;
        ***REMOVED***
          break;
        case SidebarView.OUTLINE:
          if (this.outlineButton.disabled) {
            return;
        ***REMOVED***
          this.thumbnailButton.classList.remove('toggled');
          this.outlineButton.classList.add('toggled');
          this.attachmentsButton.classList.remove('toggled');
          this.thumbnailView.classList.add('hidden');
          this.outlineView.classList.remove('hidden');
          this.attachmentsView.classList.add('hidden');
          break;
        case SidebarView.ATTACHMENTS:
          if (this.attachmentsButton.disabled) {
            return;
        ***REMOVED***
          this.thumbnailButton.classList.remove('toggled');
          this.outlineButton.classList.remove('toggled');
          this.attachmentsButton.classList.add('toggled');
          this.thumbnailView.classList.add('hidden');
          this.outlineView.classList.add('hidden');
          this.attachmentsView.classList.remove('hidden');
          break;
        default:
          console.error('PDFSidebar_switchView: "' + view + '" is an unsupported value.');
          return;
    ***REMOVED***
      this.active = view | 0;
      if (forceOpen && !this.isOpen) {
        this.open();
        return;
    ***REMOVED***
      if (shouldForceRendering) {
        this._forceRendering();
    ***REMOVED***
      if (isViewChanged) {
        this._dispatchEvent();
    ***REMOVED***
      this._hideUINotification(this.active);
  ***REMOVED***,
    open: function PDFSidebar_open() {
      if (this.isOpen) {
        return;
    ***REMOVED***
      this.isOpen = true;
      this.toggleButton.classList.add('toggled');
      this.outerContainer.classList.add('sidebarMoving');
      this.outerContainer.classList.add('sidebarOpen');
      if (this.active === SidebarView.THUMBS) {
        this._updateThumbnailViewer();
    ***REMOVED***
      this._forceRendering();
      this._dispatchEvent();
      this._hideUINotification(this.active);
  ***REMOVED***,
    close: function PDFSidebar_close() {
      if (!this.isOpen) {
        return;
    ***REMOVED***
      this.isOpen = false;
      this.toggleButton.classList.remove('toggled');
      this.outerContainer.classList.add('sidebarMoving');
      this.outerContainer.classList.remove('sidebarOpen');
      this._forceRendering();
      this._dispatchEvent();
  ***REMOVED***,
    toggle: function PDFSidebar_toggle() {
      if (this.isOpen) {
        this.close();
    ***REMOVED*** else {
        this.open();
    ***REMOVED***
  ***REMOVED***,
    _dispatchEvent: function PDFSidebar_dispatchEvent() {
      this.eventBus.dispatch('sidebarviewchanged', {
        source: this,
        view: this.visibleView
    ***REMOVED***);
  ***REMOVED***,
    _forceRendering: function PDFSidebar_forceRendering() {
      if (this.onToggled) {
        this.onToggled();
    ***REMOVED*** else {
        this.pdfViewer.forceRendering();
        this.pdfThumbnailViewer.forceRendering();
    ***REMOVED***
  ***REMOVED***,
    _updateThumbnailViewer: function PDFSidebar_updateThumbnailViewer() {
      var pdfViewer = this.pdfViewer;
      var thumbnailViewer = this.pdfThumbnailViewer;
      var pagesCount = pdfViewer.pagesCount;
      for (var pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
        var pageView = pdfViewer.getPageView(pageIndex);
        if (pageView && pageView.renderingState === RenderingStates.FINISHED) {
          var thumbnailView = thumbnailViewer.getThumbnail(pageIndex);
          thumbnailView.setImage(pageView);
      ***REMOVED***
    ***REMOVED***
      thumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
  ***REMOVED***,
    _showUINotification: function (view) {
      if (this.disableNotification) {
        return;
    ***REMOVED***
      this.toggleButton.title = mozL10n.get('toggle_sidebar_notification.title', null, 'Toggle Sidebar (document contains outline/attachments)');
      if (!this.isOpen) {
        this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
    ***REMOVED*** else if (view === this.active) {
        return;
    ***REMOVED***
      switch (view) {
        case SidebarView.OUTLINE:
          this.outlineButton.classList.add(UI_NOTIFICATION_CLASS);
          break;
        case SidebarView.ATTACHMENTS:
          this.attachmentsButton.classList.add(UI_NOTIFICATION_CLASS);
          break;
    ***REMOVED***
  ***REMOVED***,
    _hideUINotification: function (view) {
      if (this.disableNotification) {
        return;
    ***REMOVED***
      var removeNotification = function (view) {
        switch (view) {
          case SidebarView.OUTLINE:
            this.outlineButton.classList.remove(UI_NOTIFICATION_CLASS);
            break;
          case SidebarView.ATTACHMENTS:
            this.attachmentsButton.classList.remove(UI_NOTIFICATION_CLASS);
            break;
      ***REMOVED***
    ***REMOVED***.bind(this);
      if (!this.isOpen && view !== null) {
        return;
    ***REMOVED***
      this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
      if (view !== null) {
        removeNotification(view);
        return;
    ***REMOVED***
      for (view in SidebarView) {
        removeNotification(SidebarView[view]);
    ***REMOVED***
      this.toggleButton.title = mozL10n.get('toggle_sidebar.title', null, 'Toggle Sidebar');
  ***REMOVED***,
    _addEventListeners: function PDFSidebar_addEventListeners() {
      var self = this;
      self.mainContainer.addEventListener('transitionend', function (evt) {
        if (evt.target === this) {
          self.outerContainer.classList.remove('sidebarMoving');
      ***REMOVED***
    ***REMOVED***);
      self.thumbnailButton.addEventListener('click', function () {
        self.switchView(SidebarView.THUMBS);
    ***REMOVED***);
      self.outlineButton.addEventListener('click', function () {
        self.switchView(SidebarView.OUTLINE);
    ***REMOVED***);
      self.outlineButton.addEventListener('dblclick', function () {
        self.pdfOutlineViewer.toggleOutlineTree();
    ***REMOVED***);
      self.attachmentsButton.addEventListener('click', function () {
        self.switchView(SidebarView.ATTACHMENTS);
    ***REMOVED***);
      self.eventBus.on('outlineloaded', function (e) {
        var outlineCount = e.outlineCount;
        self.outlineButton.disabled = !outlineCount;
        if (outlineCount) {
          self._showUINotification(SidebarView.OUTLINE);
      ***REMOVED*** else if (self.active === SidebarView.OUTLINE) {
          self.switchView(SidebarView.THUMBS);
      ***REMOVED***
    ***REMOVED***);
      self.eventBus.on('attachmentsloaded', function (e) {
        var attachmentsCount = e.attachmentsCount;
        self.attachmentsButton.disabled = !attachmentsCount;
        if (attachmentsCount) {
          self._showUINotification(SidebarView.ATTACHMENTS);
      ***REMOVED*** else if (self.active === SidebarView.ATTACHMENTS) {
          self.switchView(SidebarView.THUMBS);
      ***REMOVED***
    ***REMOVED***);
      self.eventBus.on('presentationmodechanged', function (e) {
        if (!e.active && !e.switchInProgress && self.isThumbnailViewVisible) {
          self._updateThumbnailViewer();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;
  return PDFSidebar;
}();
exports.SidebarView = SidebarView;
exports.PDFSidebar = PDFSidebar;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var pdfRenderingQueue = __webpack_require__(3);
var mozL10n = uiUtils.mozL10n;
var getOutputScale = uiUtils.getOutputScale;
var RenderingStates = pdfRenderingQueue.RenderingStates;
var THUMBNAIL_WIDTH = 98;
var THUMBNAIL_CANVAS_BORDER_WIDTH = 1;
var PDFThumbnailView = function PDFThumbnailViewClosure() {
  function getTempCanvas(width, height) {
    var tempCanvas = PDFThumbnailView.tempImageCache;
    if (!tempCanvas) {
      tempCanvas = document.createElement('canvas');
      PDFThumbnailView.tempImageCache = tempCanvas;
  ***REMOVED***
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCanvas.mozOpaque = true;
    var ctx = tempCanvas.getContext('2d', { alpha: false });
    ctx.save();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return tempCanvas;
***REMOVED***
  function PDFThumbnailView(options) {
    var container = options.container;
    var id = options.id;
    var defaultViewport = options.defaultViewport;
    var linkService = options.linkService;
    var renderingQueue = options.renderingQueue;
    var disableCanvasToImageConversion = options.disableCanvasToImageConversion || false;
    this.id = id;
    this.renderingId = 'thumbnail' + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = RenderingStates.INITIAL;
    this.resume = null;
    this.disableCanvasToImageConversion = disableCanvasToImageConversion;
    this.pageWidth = this.viewport.width;
    this.pageHeight = this.viewport.height;
    this.pageRatio = this.pageWidth / this.pageHeight;
    this.canvasWidth = THUMBNAIL_WIDTH;
    this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
    this.scale = this.canvasWidth / this.pageWidth;
    var anchor = document.createElement('a');
    anchor.href = linkService.getAnchorUrl('#page=' + id);
    anchor.title = mozL10n.get('thumb_page_title', { page: id }, 'Page {{page}}');
    anchor.onclick = function stopNavigation() {
      linkService.page = id;
      return false;
  ***REMOVED***;
    this.anchor = anchor;
    var div = document.createElement('div');
    div.className = 'thumbnail';
    div.setAttribute('data-page-number', this.id);
    this.div = div;
    if (id === 1) {
      div.classList.add('selected');
  ***REMOVED***
    var ring = document.createElement('div');
    ring.className = 'thumbnailSelectionRing';
    var borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
    ring.style.width = this.canvasWidth + borderAdjustment + 'px';
    ring.style.height = this.canvasHeight + borderAdjustment + 'px';
    this.ring = ring;
    div.appendChild(ring);
    anchor.appendChild(div);
    container.appendChild(anchor);
***REMOVED***
  PDFThumbnailView.prototype = {
    setPdfPage: function PDFThumbnailView_setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport(1, totalRotation);
      this.reset();
  ***REMOVED***,
    reset: function PDFThumbnailView_reset() {
      this.cancelRendering();
      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this.pageRatio = this.pageWidth / this.pageHeight;
      this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
      this.scale = this.canvasWidth / this.pageWidth;
      this.div.removeAttribute('data-loaded');
      var ring = this.ring;
      var childNodes = ring.childNodes;
      for (var i = childNodes.length - 1; i >= 0; i--) {
        ring.removeChild(childNodes[i]);
    ***REMOVED***
      var borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
      ring.style.width = this.canvasWidth + borderAdjustment + 'px';
      ring.style.height = this.canvasHeight + borderAdjustment + 'px';
      if (this.canvas) {
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
    ***REMOVED***
      if (this.image) {
        this.image.removeAttribute('src');
        delete this.image;
    ***REMOVED***
  ***REMOVED***,
    update: function PDFThumbnailView_update(rotation) {
      if (typeof rotation !== 'undefined') {
        this.rotation = rotation;
    ***REMOVED***
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
        scale: 1,
        rotation: totalRotation
    ***REMOVED***);
      this.reset();
  ***REMOVED***,
    cancelRendering: function PDFThumbnailView_cancelRendering() {
      if (this.renderTask) {
        this.renderTask.cancel();
        this.renderTask = null;
    ***REMOVED***
      this.renderingState = RenderingStates.INITIAL;
      this.resume = null;
  ***REMOVED***,
    _getPageDrawContext: function PDFThumbnailView_getPageDrawContext(noCtxScale) {
      var canvas = document.createElement('canvas');
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext('2d', { alpha: false });
      var outputScale = getOutputScale(ctx);
      canvas.width = this.canvasWidth * outputScale.sx | 0;
      canvas.height = this.canvasHeight * outputScale.sy | 0;
      canvas.style.width = this.canvasWidth + 'px';
      canvas.style.height = this.canvasHeight + 'px';
      if (!noCtxScale && outputScale.scaled) {
        ctx.scale(outputScale.sx, outputScale.sy);
    ***REMOVED***
      return ctx;
  ***REMOVED***,
    _convertCanvasToImage: function PDFThumbnailView_convertCanvasToImage() {
      if (!this.canvas) {
        return;
    ***REMOVED***
      if (this.renderingState !== RenderingStates.FINISHED) {
        return;
    ***REMOVED***
      var id = this.renderingId;
      var className = 'thumbnailImage';
      var ariaLabel = mozL10n.get('thumb_page_canvas', { page: this.pageId }, 'Thumbnail of Page {{page}}');
      if (this.disableCanvasToImageConversion) {
        this.canvas.id = id;
        this.canvas.className = className;
        this.canvas.setAttribute('aria-label', ariaLabel);
        this.div.setAttribute('data-loaded', true);
        this.ring.appendChild(this.canvas);
        return;
    ***REMOVED***
      var image = document.createElement('img');
      image.id = id;
      image.className = className;
      image.setAttribute('aria-label', ariaLabel);
      image.style.width = this.canvasWidth + 'px';
      image.style.height = this.canvasHeight + 'px';
      image.src = this.canvas.toDataURL();
      this.image = image;
      this.div.setAttribute('data-loaded', true);
      this.ring.appendChild(image);
      this.canvas.width = 0;
      this.canvas.height = 0;
      delete this.canvas;
  ***REMOVED***,
    draw: function PDFThumbnailView_draw() {
      if (this.renderingState !== RenderingStates.INITIAL) {
        console.error('Must be in new state before drawing');
        return Promise.resolve(undefined);
    ***REMOVED***
      this.renderingState = RenderingStates.RUNNING;
      var resolveRenderPromise, rejectRenderPromise;
      var promise = new Promise(function (resolve, reject) {
        resolveRenderPromise = resolve;
        rejectRenderPromise = reject;
    ***REMOVED***);
      var self = this;
      function thumbnailDrawCallback(error) {
        if (renderTask === self.renderTask) {
          self.renderTask = null;
      ***REMOVED***
        if (error === 'cancelled') {
          rejectRenderPromise(error);
          return;
      ***REMOVED***
        self.renderingState = RenderingStates.FINISHED;
        self._convertCanvasToImage();
        if (!error) {
          resolveRenderPromise(undefined);
      ***REMOVED*** else {
          rejectRenderPromise(error);
      ***REMOVED***
    ***REMOVED***
      var ctx = this._getPageDrawContext();
      var drawViewport = this.viewport.clone({ scale: this.scale });
      var renderContinueCallback = function renderContinueCallback(cont) {
        if (!self.renderingQueue.isHighestPriority(self)) {
          self.renderingState = RenderingStates.PAUSED;
          self.resume = function resumeCallback() {
            self.renderingState = RenderingStates.RUNNING;
            cont();
        ***REMOVED***;
          return;
      ***REMOVED***
        cont();
    ***REMOVED***;
      var renderContext = {
        canvasContext: ctx,
        viewport: drawViewport
    ***REMOVED***;
      var renderTask = this.renderTask = this.pdfPage.render(renderContext);
      renderTask.onContinue = renderContinueCallback;
      renderTask.promise.then(function pdfPageRenderCallback() {
        thumbnailDrawCallback(null);
    ***REMOVED***, function pdfPageRenderError(error) {
        thumbnailDrawCallback(error);
    ***REMOVED***);
      return promise;
  ***REMOVED***,
    setImage: function PDFThumbnailView_setImage(pageView) {
      if (this.renderingState !== RenderingStates.INITIAL) {
        return;
    ***REMOVED***
      var img = pageView.canvas;
      if (!img) {
        return;
    ***REMOVED***
      if (!this.pdfPage) {
        this.setPdfPage(pageView.pdfPage);
    ***REMOVED***
      this.renderingState = RenderingStates.FINISHED;
      var ctx = this._getPageDrawContext(true);
      var canvas = ctx.canvas;
      if (img.width <= 2 * canvas.width) {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        this._convertCanvasToImage();
        return;
    ***REMOVED***
      var MAX_NUM_SCALING_STEPS = 3;
      var reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
      var reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
      var reducedImage = getTempCanvas(reducedWidth, reducedHeight);
      var reducedImageCtx = reducedImage.getContext('2d');
      while (reducedWidth > img.width || reducedHeight > img.height) {
        reducedWidth >>= 1;
        reducedHeight >>= 1;
    ***REMOVED***
      reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);
      while (reducedWidth > 2 * canvas.width) {
        reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
        reducedWidth >>= 1;
        reducedHeight >>= 1;
    ***REMOVED***
      ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);
      this._convertCanvasToImage();
  ***REMOVED***,
    get pageId() {
      return this.pageLabel !== null ? this.pageLabel : this.id;
  ***REMOVED***,
    setPageLabel: function PDFThumbnailView_setPageLabel(label) {
      this.pageLabel = typeof label === 'string' ? label : null;
      this.anchor.title = mozL10n.get('thumb_page_title', { page: this.pageId }, 'Page {{page}}');
      if (this.renderingState !== RenderingStates.FINISHED) {
        return;
    ***REMOVED***
      var ariaLabel = mozL10n.get('thumb_page_canvas', { page: this.pageId }, 'Thumbnail of Page {{page}}');
      if (this.image) {
        this.image.setAttribute('aria-label', ariaLabel);
    ***REMOVED*** else if (this.disableCanvasToImageConversion && this.canvas) {
        this.canvas.setAttribute('aria-label', ariaLabel);
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  return PDFThumbnailView;
}();
PDFThumbnailView.tempImageCache = null;
exports.PDFThumbnailView = PDFThumbnailView;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var pdfThumbnailView = __webpack_require__(23);
var watchScroll = uiUtils.watchScroll;
var getVisibleElements = uiUtils.getVisibleElements;
var scrollIntoView = uiUtils.scrollIntoView;
var PDFThumbnailView = pdfThumbnailView.PDFThumbnailView;
var THUMBNAIL_SCROLL_MARGIN = -19;
var PDFThumbnailViewer = function PDFThumbnailViewerClosure() {
  function PDFThumbnailViewer(options) {
    this.container = options.container;
    this.renderingQueue = options.renderingQueue;
    this.linkService = options.linkService;
    this.scroll = watchScroll(this.container, this._scrollUpdated.bind(this));
    this._resetView();
***REMOVED***
  PDFThumbnailViewer.prototype = {
    _scrollUpdated: function PDFThumbnailViewer_scrollUpdated() {
      this.renderingQueue.renderHighestPriority();
  ***REMOVED***,
    getThumbnail: function PDFThumbnailViewer_getThumbnail(index) {
      return this.thumbnails[index];
  ***REMOVED***,
    _getVisibleThumbs: function PDFThumbnailViewer_getVisibleThumbs() {
      return getVisibleElements(this.container, this.thumbnails);
  ***REMOVED***,
    scrollThumbnailIntoView: function PDFThumbnailViewer_scrollThumbnailIntoView(page) {
      var selected = document.querySelector('.thumbnail.selected');
      if (selected) {
        selected.classList.remove('selected');
    ***REMOVED***
      var thumbnail = document.querySelector('div.thumbnail[data-page-number="' + page + '"]');
      if (thumbnail) {
        thumbnail.classList.add('selected');
    ***REMOVED***
      var visibleThumbs = this._getVisibleThumbs();
      var numVisibleThumbs = visibleThumbs.views.length;
      if (numVisibleThumbs > 0) {
        var first = visibleThumbs.first.id;
        var last = numVisibleThumbs > 1 ? visibleThumbs.last.id : first;
        if (page <= first || page >= last) {
          scrollIntoView(thumbnail, { top: THUMBNAIL_SCROLL_MARGIN });
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    get pagesRotation() {
      return this._pagesRotation;
  ***REMOVED***,
    set pagesRotation(rotation) {
      this._pagesRotation = rotation;
      for (var i = 0, l = this.thumbnails.length; i < l; i++) {
        var thumb = this.thumbnails[i];
        thumb.update(rotation);
    ***REMOVED***
  ***REMOVED***,
    cleanup: function PDFThumbnailViewer_cleanup() {
      var tempCanvas = PDFThumbnailView.tempImageCache;
      if (tempCanvas) {
        tempCanvas.width = 0;
        tempCanvas.height = 0;
    ***REMOVED***
      PDFThumbnailView.tempImageCache = null;
  ***REMOVED***,
    _resetView: function PDFThumbnailViewer_resetView() {
      this.thumbnails = [];
      this._pageLabels = null;
      this._pagesRotation = 0;
      this._pagesRequests = [];
      this.container.textContent = '';
  ***REMOVED***,
    setDocument: function PDFThumbnailViewer_setDocument(pdfDocument) {
      if (this.pdfDocument) {
        this._cancelRendering();
        this._resetView();
    ***REMOVED***
      this.pdfDocument = pdfDocument;
      if (!pdfDocument) {
        return Promise.resolve();
    ***REMOVED***
      return pdfDocument.getPage(1).then(function (firstPage) {
        var pagesCount = pdfDocument.numPages;
        var viewport = firstPage.getViewport(1.0);
        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var thumbnail = new PDFThumbnailView({
            container: this.container,
            id: pageNum,
            defaultViewport: viewport.clone(),
            linkService: this.linkService,
            renderingQueue: this.renderingQueue,
            disableCanvasToImageConversion: false
        ***REMOVED***);
          this.thumbnails.push(thumbnail);
      ***REMOVED***
    ***REMOVED***.bind(this));
  ***REMOVED***,
    _cancelRendering: function PDFThumbnailViewer_cancelRendering() {
      for (var i = 0, ii = this.thumbnails.length; i < ii; i++) {
        if (this.thumbnails[i]) {
          this.thumbnails[i].cancelRendering();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    setPageLabels: function PDFThumbnailViewer_setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
    ***REMOVED***
      if (!labels) {
        this._pageLabels = null;
    ***REMOVED*** else if (!(labels instanceof Array && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error('PDFThumbnailViewer_setPageLabels: Invalid page labels.');
    ***REMOVED*** else {
        this._pageLabels = labels;
    ***REMOVED***
      for (var i = 0, ii = this.thumbnails.length; i < ii; i++) {
        var thumbnailView = this.thumbnails[i];
        var label = this._pageLabels && this._pageLabels[i];
        thumbnailView.setPageLabel(label);
    ***REMOVED***
  ***REMOVED***,
    _ensurePdfPageLoaded: function PDFThumbnailViewer_ensurePdfPageLoaded(thumbView) {
      if (thumbView.pdfPage) {
        return Promise.resolve(thumbView.pdfPage);
    ***REMOVED***
      var pageNumber = thumbView.id;
      if (this._pagesRequests[pageNumber]) {
        return this._pagesRequests[pageNumber];
    ***REMOVED***
      var promise = this.pdfDocument.getPage(pageNumber).then(function (pdfPage) {
        thumbView.setPdfPage(pdfPage);
        this._pagesRequests[pageNumber] = null;
        return pdfPage;
    ***REMOVED***.bind(this));
      this._pagesRequests[pageNumber] = promise;
      return promise;
  ***REMOVED***,
    forceRendering: function () {
      var visibleThumbs = this._getVisibleThumbs();
      var thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this.thumbnails, this.scroll.down);
      if (thumbView) {
        this._ensurePdfPageLoaded(thumbView).then(function () {
          this.renderingQueue.renderView(thumbView);
      ***REMOVED***.bind(this));
        return true;
    ***REMOVED***
      return false;
  ***REMOVED***
***REMOVED***;
  return PDFThumbnailViewer;
}();
exports.PDFThumbnailViewer = PDFThumbnailViewer;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var pdfPageView = __webpack_require__(20);
var pdfRenderingQueue = __webpack_require__(3);
var textLayerBuilder = __webpack_require__(27);
var annotationLayerBuilder = __webpack_require__(10);
var pdfLinkService = __webpack_require__(5);
var domEvents = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var UNKNOWN_SCALE = uiUtils.UNKNOWN_SCALE;
var SCROLLBAR_PADDING = uiUtils.SCROLLBAR_PADDING;
var VERTICAL_PADDING = uiUtils.VERTICAL_PADDING;
var MAX_AUTO_SCALE = uiUtils.MAX_AUTO_SCALE;
var CSS_UNITS = uiUtils.CSS_UNITS;
var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
var DEFAULT_SCALE_VALUE = uiUtils.DEFAULT_SCALE_VALUE;
var RendererType = uiUtils.RendererType;
var scrollIntoView = uiUtils.scrollIntoView;
var watchScroll = uiUtils.watchScroll;
var getVisibleElements = uiUtils.getVisibleElements;
var PDFPageView = pdfPageView.PDFPageView;
var RenderingStates = pdfRenderingQueue.RenderingStates;
var PDFRenderingQueue = pdfRenderingQueue.PDFRenderingQueue;
var TextLayerBuilder = textLayerBuilder.TextLayerBuilder;
var AnnotationLayerBuilder = annotationLayerBuilder.AnnotationLayerBuilder;
var SimpleLinkService = pdfLinkService.SimpleLinkService;
var PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
***REMOVED***
var DEFAULT_CACHE_SIZE = 10;
var PDFViewer = function pdfViewer() {
  function PDFPageViewBuffer(size) {
    var data = [];
    this.push = function cachePush(view) {
      var i = data.indexOf(view);
      if (i >= 0) {
        data.splice(i, 1);
    ***REMOVED***
      data.push(view);
      if (data.length > size) {
        data.shift().destroy();
    ***REMOVED***
  ***REMOVED***;
    this.resize = function (newSize) {
      size = newSize;
      while (data.length > size) {
        data.shift().destroy();
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
  function isSameScale(oldScale, newScale) {
    if (newScale === oldScale) {
      return true;
  ***REMOVED***
    if (Math.abs(newScale - oldScale) < 1e-15) {
      return true;
  ***REMOVED***
    return false;
***REMOVED***
  function isPortraitOrientation(size) {
    return size.width <= size.height;
***REMOVED***
  function PDFViewer(options) {
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;
    this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
    this.linkService = options.linkService || new SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.removePageBorders = options.removePageBorders || false;
    this.enhanceTextSelection = options.enhanceTextSelection || false;
    this.renderInteractiveForms = options.renderInteractiveForms || false;
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || RendererType.CANVAS;
    this.defaultRenderingQueue = !options.renderingQueue;
    if (this.defaultRenderingQueue) {
      this.renderingQueue = new PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
  ***REMOVED*** else {
      this.renderingQueue = options.renderingQueue;
  ***REMOVED***
    this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = PresentationModeState.UNKNOWN;
    this._resetView();
    if (this.removePageBorders) {
      this.viewer.classList.add('removePageBorders');
  ***REMOVED***
***REMOVED***
  PDFViewer.prototype = {
    get pagesCount() {
      return this._pages.length;
  ***REMOVED***,
    getPageView: function (index) {
      return this._pages[index];
  ***REMOVED***,
    get pageViewsReady() {
      return this._pageViewsReady;
  ***REMOVED***,
    get currentPageNumber() {
      return this._currentPageNumber;
  ***REMOVED***,
    set currentPageNumber(val) {
      if ((val | 0) !== val) {
        throw new Error('Invalid page number.');
    ***REMOVED***
      if (!this.pdfDocument) {
        this._currentPageNumber = val;
        return;
    ***REMOVED***
      this._setCurrentPageNumber(val, true);
  ***REMOVED***,
    _setCurrentPageNumber: function PDFViewer_setCurrentPageNumber(val, resetCurrentPageView) {
      if (this._currentPageNumber === val) {
        if (resetCurrentPageView) {
          this._resetCurrentPageView();
      ***REMOVED***
        return;
    ***REMOVED***
      if (!(0 < val && val <= this.pagesCount)) {
        console.error('PDFViewer_setCurrentPageNumber: "' + val + '" is out of bounds.');
        return;
    ***REMOVED***
      var arg = {
        source: this,
        pageNumber: val,
        pageLabel: this._pageLabels && this._pageLabels[val - 1]
    ***REMOVED***;
      this._currentPageNumber = val;
      this.eventBus.dispatch('pagechanging', arg);
      this.eventBus.dispatch('pagechange', arg);
      if (resetCurrentPageView) {
        this._resetCurrentPageView();
    ***REMOVED***
  ***REMOVED***,
    get currentPageLabel() {
      return this._pageLabels && this._pageLabels[this._currentPageNumber - 1];
  ***REMOVED***,
    set currentPageLabel(val) {
      var pageNumber = val | 0;
      if (this._pageLabels) {
        var i = this._pageLabels.indexOf(val);
        if (i >= 0) {
          pageNumber = i + 1;
      ***REMOVED***
    ***REMOVED***
      this.currentPageNumber = pageNumber;
  ***REMOVED***,
    get currentScale() {
      return this._currentScale !== UNKNOWN_SCALE ? this._currentScale : DEFAULT_SCALE;
  ***REMOVED***,
    set currentScale(val) {
      if (isNaN(val)) {
        throw new Error('Invalid numeric scale');
    ***REMOVED***
      if (!this.pdfDocument) {
        this._currentScale = val;
        this._currentScaleValue = val !== UNKNOWN_SCALE ? val.toString() : null;
        return;
    ***REMOVED***
      this._setScale(val, false);
  ***REMOVED***,
    get currentScaleValue() {
      return this._currentScaleValue;
  ***REMOVED***,
    set currentScaleValue(val) {
      if (!this.pdfDocument) {
        this._currentScale = isNaN(val) ? UNKNOWN_SCALE : val;
        this._currentScaleValue = val.toString();
        return;
    ***REMOVED***
      this._setScale(val, false);
  ***REMOVED***,
    get pagesRotation() {
      return this._pagesRotation;
  ***REMOVED***,
    set pagesRotation(rotation) {
      if (!(typeof rotation === 'number' && rotation % 90 === 0)) {
        throw new Error('Invalid pages rotation angle.');
    ***REMOVED***
      this._pagesRotation = rotation;
      if (!this.pdfDocument) {
        return;
    ***REMOVED***
      for (var i = 0, l = this._pages.length; i < l; i++) {
        var pageView = this._pages[i];
        pageView.update(pageView.scale, rotation);
    ***REMOVED***
      this._setScale(this._currentScaleValue, true);
      if (this.defaultRenderingQueue) {
        this.update();
    ***REMOVED***
  ***REMOVED***,
    setDocument: function (pdfDocument) {
      if (this.pdfDocument) {
        this._cancelRendering();
        this._resetView();
    ***REMOVED***
      this.pdfDocument = pdfDocument;
      if (!pdfDocument) {
        return;
    ***REMOVED***
      var pagesCount = pdfDocument.numPages;
      var self = this;
      var resolvePagesPromise;
      var pagesPromise = new Promise(function (resolve) {
        resolvePagesPromise = resolve;
    ***REMOVED***);
      this.pagesPromise = pagesPromise;
      pagesPromise.then(function () {
        self._pageViewsReady = true;
        self.eventBus.dispatch('pagesloaded', {
          source: self,
          pagesCount: pagesCount
      ***REMOVED***);
    ***REMOVED***);
      var isOnePageRenderedResolved = false;
      var resolveOnePageRendered = null;
      var onePageRendered = new Promise(function (resolve) {
        resolveOnePageRendered = resolve;
    ***REMOVED***);
      this.onePageRendered = onePageRendered;
      var bindOnAfterAndBeforeDraw = function (pageView) {
        pageView.onBeforeDraw = function pdfViewLoadOnBeforeDraw() {
          self._buffer.push(this);
      ***REMOVED***;
        pageView.onAfterDraw = function pdfViewLoadOnAfterDraw() {
          if (!isOnePageRenderedResolved) {
            isOnePageRenderedResolved = true;
            resolveOnePageRendered();
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***;
      var firstPagePromise = pdfDocument.getPage(1);
      this.firstPagePromise = firstPagePromise;
      return firstPagePromise.then(function (pdfPage) {
        var scale = this.currentScale;
        var viewport = pdfPage.getViewport(scale * CSS_UNITS);
        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var textLayerFactory = null;
          if (!pdfjsLib.PDFJS.disableTextLayer) {
            textLayerFactory = this;
        ***REMOVED***
          var pageView = new PDFPageView({
            container: this.viewer,
            eventBus: this.eventBus,
            id: pageNum,
            scale: scale,
            defaultViewport: viewport.clone(),
            renderingQueue: this.renderingQueue,
            textLayerFactory: textLayerFactory,
            annotationLayerFactory: this,
            enhanceTextSelection: this.enhanceTextSelection,
            renderInteractiveForms: this.renderInteractiveForms,
            renderer: this.renderer
        ***REMOVED***);
          bindOnAfterAndBeforeDraw(pageView);
          this._pages.push(pageView);
      ***REMOVED***
        var linkService = this.linkService;
        onePageRendered.then(function () {
          if (!pdfjsLib.PDFJS.disableAutoFetch) {
            var getPagesLeft = pagesCount;
            for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
              pdfDocument.getPage(pageNum).then(function (pageNum, pdfPage) {
                var pageView = self._pages[pageNum - 1];
                if (!pageView.pdfPage) {
                  pageView.setPdfPage(pdfPage);
              ***REMOVED***
                linkService.cachePageRef(pageNum, pdfPage.ref);
                getPagesLeft--;
                if (!getPagesLeft) {
                  resolvePagesPromise();
              ***REMOVED***
            ***REMOVED***.bind(null, pageNum));
          ***REMOVED***
        ***REMOVED*** else {
            resolvePagesPromise();
        ***REMOVED***
      ***REMOVED***);
        self.eventBus.dispatch('pagesinit', { source: self });
        if (this.defaultRenderingQueue) {
          this.update();
      ***REMOVED***
        if (this.findController) {
          this.findController.resolveFirstPage();
      ***REMOVED***
    ***REMOVED***.bind(this));
  ***REMOVED***,
    setPageLabels: function PDFViewer_setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
    ***REMOVED***
      if (!labels) {
        this._pageLabels = null;
    ***REMOVED*** else if (!(labels instanceof Array && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error('PDFViewer_setPageLabels: Invalid page labels.');
    ***REMOVED*** else {
        this._pageLabels = labels;
    ***REMOVED***
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        var pageView = this._pages[i];
        var label = this._pageLabels && this._pageLabels[i];
        pageView.setPageLabel(label);
    ***REMOVED***
  ***REMOVED***,
    _resetView: function () {
      this._pages = [];
      this._currentPageNumber = 1;
      this._currentScale = UNKNOWN_SCALE;
      this._currentScaleValue = null;
      this._pageLabels = null;
      this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
      this._location = null;
      this._pagesRotation = 0;
      this._pagesRequests = [];
      this._pageViewsReady = false;
      this.viewer.textContent = '';
  ***REMOVED***,
    _scrollUpdate: function PDFViewer_scrollUpdate() {
      if (this.pagesCount === 0) {
        return;
    ***REMOVED***
      this.update();
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        this._pages[i].updatePosition();
    ***REMOVED***
  ***REMOVED***,
    _setScaleDispatchEvent: function pdfViewer_setScaleDispatchEvent(newScale, newValue, preset) {
      var arg = {
        source: this,
        scale: newScale,
        presetValue: preset ? newValue : undefined
    ***REMOVED***;
      this.eventBus.dispatch('scalechanging', arg);
      this.eventBus.dispatch('scalechange', arg);
  ***REMOVED***,
    _setScaleUpdatePages: function pdfViewer_setScaleUpdatePages(newScale, newValue, noScroll, preset) {
      this._currentScaleValue = newValue.toString();
      if (isSameScale(this._currentScale, newScale)) {
        if (preset) {
          this._setScaleDispatchEvent(newScale, newValue, true);
      ***REMOVED***
        return;
    ***REMOVED***
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        this._pages[i].update(newScale);
    ***REMOVED***
      this._currentScale = newScale;
      if (!noScroll) {
        var page = this._currentPageNumber,
            dest;
        if (this._location && !pdfjsLib.PDFJS.ignoreCurrentPositionOnZoom && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
          page = this._location.pageNumber;
          dest = [null, { name: 'XYZ' }, this._location.left, this._location.top, null];
      ***REMOVED***
        this.scrollPageIntoView({
          pageNumber: page,
          destArray: dest,
          allowNegativeOffset: true
      ***REMOVED***);
    ***REMOVED***
      this._setScaleDispatchEvent(newScale, newValue, preset);
      if (this.defaultRenderingQueue) {
        this.update();
    ***REMOVED***
  ***REMOVED***,
    _setScale: function PDFViewer_setScale(value, noScroll) {
      var scale = parseFloat(value);
      if (scale > 0) {
        this._setScaleUpdatePages(scale, value, noScroll, false);
    ***REMOVED*** else {
        var currentPage = this._pages[this._currentPageNumber - 1];
        if (!currentPage) {
          return;
      ***REMOVED***
        var hPadding = this.isInPresentationMode || this.removePageBorders ? 0 : SCROLLBAR_PADDING;
        var vPadding = this.isInPresentationMode || this.removePageBorders ? 0 : VERTICAL_PADDING;
        var pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale;
        var pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;
        switch (value) {
          case 'page-actual':
            scale = 1;
            break;
          case 'page-width':
            scale = pageWidthScale;
            break;
          case 'page-height':
            scale = pageHeightScale;
            break;
          case 'page-fit':
            scale = Math.min(pageWidthScale, pageHeightScale);
            break;
          case 'auto':
            var isLandscape = currentPage.width > currentPage.height;
            var horizontalScale = isLandscape ? Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
            scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
            break;
          default:
            console.error('PDFViewer_setScale: "' + value + '" is an unknown zoom value.');
            return;
      ***REMOVED***
        this._setScaleUpdatePages(scale, value, noScroll, true);
    ***REMOVED***
  ***REMOVED***,
    _resetCurrentPageView: function () {
      if (this.isInPresentationMode) {
        this._setScale(this._currentScaleValue, true);
    ***REMOVED***
      var pageView = this._pages[this._currentPageNumber - 1];
      scrollIntoView(pageView.div);
  ***REMOVED***,
    scrollPageIntoView: function PDFViewer_scrollPageIntoView(params) {
      if (!this.pdfDocument) {
        return;
    ***REMOVED***
      if (arguments.length > 1 || typeof params === 'number') {
        console.warn('Call of scrollPageIntoView() with obsolete signature.');
        var paramObj = {***REMOVED***
        if (typeof params === 'number') {
          paramObj.pageNumber = params;
      ***REMOVED***
        if (arguments[1] instanceof Array) {
          paramObj.destArray = arguments[1];
      ***REMOVED***
        params = paramObj;
    ***REMOVED***
      var pageNumber = params.pageNumber || 0;
      var dest = params.destArray || null;
      var allowNegativeOffset = params.allowNegativeOffset || false;
      if (this.isInPresentationMode || !dest) {
        this._setCurrentPageNumber(pageNumber, true);
        return;
    ***REMOVED***
      var pageView = this._pages[pageNumber - 1];
      if (!pageView) {
        console.error('PDFViewer_scrollPageIntoView: ' + 'Invalid "pageNumber" parameter.');
        return;
    ***REMOVED***
      var x = 0,
          y = 0;
      var width = 0,
          height = 0,
          widthScale,
          heightScale;
      var changeOrientation = pageView.rotation % 180 === 0 ? false : true;
      var pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / CSS_UNITS;
      var pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / CSS_UNITS;
      var scale = 0;
      switch (dest[1].name) {
        case 'XYZ':
          x = dest[2];
          y = dest[3];
          scale = dest[4];
          x = x !== null ? x : 0;
          y = y !== null ? y : pageHeight;
          break;
        case 'Fit':
        case 'FitB':
          scale = 'page-fit';
          break;
        case 'FitH':
        case 'FitBH':
          y = dest[2];
          scale = 'page-width';
          if (y === null && this._location) {
            x = this._location.left;
            y = this._location.top;
        ***REMOVED***
          break;
        case 'FitV':
        case 'FitBV':
          x = dest[2];
          width = pageWidth;
          height = pageHeight;
          scale = 'page-height';
          break;
        case 'FitR':
          x = dest[2];
          y = dest[3];
          width = dest[4] - x;
          height = dest[5] - y;
          var hPadding = this.removePageBorders ? 0 : SCROLLBAR_PADDING;
          var vPadding = this.removePageBorders ? 0 : VERTICAL_PADDING;
          widthScale = (this.container.clientWidth - hPadding) / width / CSS_UNITS;
          heightScale = (this.container.clientHeight - vPadding) / height / CSS_UNITS;
          scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
          break;
        default:
          console.error('PDFViewer_scrollPageIntoView: \'' + dest[1].name + '\' is not a valid destination type.');
          return;
    ***REMOVED***
      if (scale && scale !== this._currentScale) {
        this.currentScaleValue = scale;
    ***REMOVED*** else if (this._currentScale === UNKNOWN_SCALE) {
        this.currentScaleValue = DEFAULT_SCALE_VALUE;
    ***REMOVED***
      if (scale === 'page-fit' && !dest[4]) {
        scrollIntoView(pageView.div);
        return;
    ***REMOVED***
      var boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
      var left = Math.min(boundingRect[0][0], boundingRect[1][0]);
      var top = Math.min(boundingRect[0][1], boundingRect[1][1]);
      if (!allowNegativeOffset) {
        left = Math.max(left, 0);
        top = Math.max(top, 0);
    ***REMOVED***
      scrollIntoView(pageView.div, {
        left: left,
        top: top
    ***REMOVED***);
  ***REMOVED***,
    _updateLocation: function (firstPage) {
      var currentScale = this._currentScale;
      var currentScaleValue = this._currentScaleValue;
      var normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
      var pageNumber = firstPage.id;
      var pdfOpenParams = '#page=' + pageNumber;
      pdfOpenParams += '&zoom=' + normalizedScaleValue;
      var currentPageView = this._pages[pageNumber - 1];
      var container = this.container;
      var topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
      var intLeft = Math.round(topLeft[0]);
      var intTop = Math.round(topLeft[1]);
      pdfOpenParams += ',' + intLeft + ',' + intTop;
      this._location = {
        pageNumber: pageNumber,
        scale: normalizedScaleValue,
        top: intTop,
        left: intLeft,
        pdfOpenParams: pdfOpenParams
    ***REMOVED***;
  ***REMOVED***,
    update: function PDFViewer_update() {
      var visible = this._getVisiblePages();
      var visiblePages = visible.views;
      if (visiblePages.length === 0) {
        return;
    ***REMOVED***
      var suggestedCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * visiblePages.length + 1);
      this._buffer.resize(suggestedCacheSize);
      this.renderingQueue.renderHighestPriority(visible);
      var currentId = this._currentPageNumber;
      var firstPage = visible.first;
      for (var i = 0, ii = visiblePages.length, stillFullyVisible = false; i < ii; ++i) {
        var page = visiblePages[i];
        if (page.percent < 100) {
          break;
      ***REMOVED***
        if (page.id === currentId) {
          stillFullyVisible = true;
          break;
      ***REMOVED***
    ***REMOVED***
      if (!stillFullyVisible) {
        currentId = visiblePages[0].id;
    ***REMOVED***
      if (!this.isInPresentationMode) {
        this._setCurrentPageNumber(currentId);
    ***REMOVED***
      this._updateLocation(firstPage);
      this.eventBus.dispatch('updateviewarea', {
        source: this,
        location: this._location
    ***REMOVED***);
  ***REMOVED***,
    containsElement: function (element) {
      return this.container.contains(element);
  ***REMOVED***,
    focus: function () {
      this.container.focus();
  ***REMOVED***,
    get isInPresentationMode() {
      return this.presentationModeState === PresentationModeState.FULLSCREEN;
  ***REMOVED***,
    get isChangingPresentationMode() {
      return this.presentationModeState === PresentationModeState.CHANGING;
  ***REMOVED***,
    get isHorizontalScrollbarEnabled() {
      return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  ***REMOVED***,
    _getVisiblePages: function () {
      if (!this.isInPresentationMode) {
        return getVisibleElements(this.container, this._pages, true);
    ***REMOVED***
      var visible = [];
      var currentPage = this._pages[this._currentPageNumber - 1];
      visible.push({
        id: currentPage.id,
        view: currentPage
    ***REMOVED***);
      return {
        first: currentPage,
        last: currentPage,
        views: visible
    ***REMOVED***;
  ***REMOVED***,
    cleanup: function () {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i] && this._pages[i].renderingState !== RenderingStates.FINISHED) {
          this._pages[i].reset();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    _cancelRendering: function PDFViewer_cancelRendering() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i]) {
          this._pages[i].cancelRendering();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
    _ensurePdfPageLoaded: function (pageView) {
      if (pageView.pdfPage) {
        return Promise.resolve(pageView.pdfPage);
    ***REMOVED***
      var pageNumber = pageView.id;
      if (this._pagesRequests[pageNumber]) {
        return this._pagesRequests[pageNumber];
    ***REMOVED***
      var promise = this.pdfDocument.getPage(pageNumber).then(function (pdfPage) {
        pageView.setPdfPage(pdfPage);
        this._pagesRequests[pageNumber] = null;
        return pdfPage;
    ***REMOVED***.bind(this));
      this._pagesRequests[pageNumber] = promise;
      return promise;
  ***REMOVED***,
    forceRendering: function (currentlyVisiblePages) {
      var visiblePages = currentlyVisiblePages || this._getVisiblePages();
      var pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, this.scroll.down);
      if (pageView) {
        this._ensurePdfPageLoaded(pageView).then(function () {
          this.renderingQueue.renderView(pageView);
      ***REMOVED***.bind(this));
        return true;
    ***REMOVED***
      return false;
  ***REMOVED***,
    getPageTextContent: function (pageIndex) {
      return this.pdfDocument.getPage(pageIndex + 1).then(function (page) {
        return page.getTextContent({ normalizeWhitespace: true });
    ***REMOVED***);
  ***REMOVED***,
    createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {
      return new TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        eventBus: this.eventBus,
        pageIndex: pageIndex,
        viewport: viewport,
        findController: this.isInPresentationMode ? null : this.findController,
        enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection
    ***REMOVED***);
  ***REMOVED***,
    createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
      return new AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        renderInteractiveForms: renderInteractiveForms,
        linkService: this.linkService,
        downloadManager: this.downloadManager
    ***REMOVED***);
  ***REMOVED***,
    setFindController: function (findController) {
      this.findController = findController;
  ***REMOVED***,
    getPagesOverview: function () {
      var pagesOverview = this._pages.map(function (pageView) {
        var viewport = pageView.pdfPage.getViewport(1);
        return {
          width: viewport.width,
          height: viewport.height,
          rotation: viewport.rotation
      ***REMOVED***;
    ***REMOVED***);
      if (!this.enablePrintAutoRotate) {
        return pagesOverview;
    ***REMOVED***
      var isFirstPagePortrait = isPortraitOrientation(pagesOverview[0]);
      return pagesOverview.map(function (size) {
        if (isFirstPagePortrait === isPortraitOrientation(size)) {
          return size;
      ***REMOVED***
        return {
          width: size.height,
          height: size.width,
          rotation: (size.rotation + 90) % 360
      ***REMOVED***;
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;
  return PDFViewer;
}();
exports.PresentationModeState = PresentationModeState;
exports.PDFViewer = PDFViewer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var SCROLLBAR_PADDING = uiUtils.SCROLLBAR_PADDING;
var mozL10n = uiUtils.mozL10n;
var SecondaryToolbar = function SecondaryToolbarClosure() {
  function SecondaryToolbar(options, mainContainer, eventBus) {
    this.toolbar = options.toolbar;
    this.toggleButton = options.toggleButton;
    this.toolbarButtonContainer = options.toolbarButtonContainer;
    this.buttons = [{
      element: options.presentationModeButton,
      eventName: 'presentationmode',
      close: true
  ***REMOVED***, {
      element: options.openFileButton,
      eventName: 'openfile',
      close: true
  ***REMOVED***, {
      element: options.printButton,
      eventName: 'print',
      close: true
  ***REMOVED***, {
      element: options.downloadButton,
      eventName: 'download',
      close: true
  ***REMOVED***, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
  ***REMOVED***, {
      element: options.firstPageButton,
      eventName: 'firstpage',
      close: true
  ***REMOVED***, {
      element: options.lastPageButton,
      eventName: 'lastpage',
      close: true
  ***REMOVED***, {
      element: options.pageRotateCwButton,
      eventName: 'rotatecw',
      close: false
  ***REMOVED***, {
      element: options.pageRotateCcwButton,
      eventName: 'rotateccw',
      close: false
  ***REMOVED***, {
      element: options.toggleHandToolButton,
      eventName: 'togglehandtool',
      close: true
  ***REMOVED***, {
      element: options.documentPropertiesButton,
      eventName: 'documentproperties',
      close: true
  ***REMOVED***];
    this.items = {
      firstPage: options.firstPageButton,
      lastPage: options.lastPageButton,
      pageRotateCw: options.pageRotateCwButton,
      pageRotateCcw: options.pageRotateCcwButton
  ***REMOVED***;
    this.mainContainer = mainContainer;
    this.eventBus = eventBus;
    this.opened = false;
    this.containerHeight = null;
    this.previousContainerHeight = null;
    this.reset();
    this._bindClickListeners();
    this._bindHandToolListener(options.toggleHandToolButton);
    this.eventBus.on('resize', this._setMaxHeight.bind(this));
***REMOVED***
  SecondaryToolbar.prototype = {
    get isOpen() {
      return this.opened;
  ***REMOVED***,
    setPageNumber: function SecondaryToolbar_setPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
      this._updateUIState();
  ***REMOVED***,
    setPagesCount: function SecondaryToolbar_setPagesCount(pagesCount) {
      this.pagesCount = pagesCount;
      this._updateUIState();
  ***REMOVED***,
    reset: function SecondaryToolbar_reset() {
      this.pageNumber = 0;
      this.pagesCount = 0;
      this._updateUIState();
  ***REMOVED***,
    _updateUIState: function SecondaryToolbar_updateUIState() {
      var items = this.items;
      items.firstPage.disabled = this.pageNumber <= 1;
      items.lastPage.disabled = this.pageNumber >= this.pagesCount;
      items.pageRotateCw.disabled = this.pagesCount === 0;
      items.pageRotateCcw.disabled = this.pagesCount === 0;
  ***REMOVED***,
    _bindClickListeners: function SecondaryToolbar_bindClickListeners() {
      this.toggleButton.addEventListener('click', this.toggle.bind(this));
      for (var button in this.buttons) {
        var element = this.buttons[button].element;
        var eventName = this.buttons[button].eventName;
        var close = this.buttons[button].close;
        element.addEventListener('click', function (eventName, close) {
          if (eventName !== null) {
            this.eventBus.dispatch(eventName, { source: this });
        ***REMOVED***
          if (close) {
            this.close();
        ***REMOVED***
      ***REMOVED***.bind(this, eventName, close));
    ***REMOVED***
  ***REMOVED***,
    _bindHandToolListener: function SecondaryToolbar_bindHandToolListener(toggleHandToolButton) {
      var isHandToolActive = false;
      this.eventBus.on('handtoolchanged', function (e) {
        if (isHandToolActive === e.isActive) {
          return;
      ***REMOVED***
        isHandToolActive = e.isActive;
        if (isHandToolActive) {
          toggleHandToolButton.title = mozL10n.get('hand_tool_disable.title', null, 'Disable hand tool');
          toggleHandToolButton.firstElementChild.textContent = mozL10n.get('hand_tool_disable_label', null, 'Disable hand tool');
      ***REMOVED*** else {
          toggleHandToolButton.title = mozL10n.get('hand_tool_enable.title', null, 'Enable hand tool');
          toggleHandToolButton.firstElementChild.textContent = mozL10n.get('hand_tool_enable_label', null, 'Enable hand tool');
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***,
    open: function SecondaryToolbar_open() {
      if (this.opened) {
        return;
    ***REMOVED***
      this.opened = true;
      this._setMaxHeight();
      this.toggleButton.classList.add('toggled');
      this.toolbar.classList.remove('hidden');
  ***REMOVED***,
    close: function SecondaryToolbar_close() {
      if (!this.opened) {
        return;
    ***REMOVED***
      this.opened = false;
      this.toolbar.classList.add('hidden');
      this.toggleButton.classList.remove('toggled');
  ***REMOVED***,
    toggle: function SecondaryToolbar_toggle() {
      if (this.opened) {
        this.close();
    ***REMOVED*** else {
        this.open();
    ***REMOVED***
  ***REMOVED***,
    _setMaxHeight: function SecondaryToolbar_setMaxHeight() {
      if (!this.opened) {
        return;
    ***REMOVED***
      this.containerHeight = this.mainContainer.clientHeight;
      if (this.containerHeight === this.previousContainerHeight) {
        return;
    ***REMOVED***
      this.toolbarButtonContainer.setAttribute('style', 'max-height: ' + (this.containerHeight - SCROLLBAR_PADDING) + 'px;');
      this.previousContainerHeight = this.containerHeight;
  ***REMOVED***
***REMOVED***;
  return SecondaryToolbar;
}();
exports.SecondaryToolbar = SecondaryToolbar;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domEvents = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var EXPAND_DIVS_TIMEOUT = 300;
var TextLayerBuilder = function TextLayerBuilderClosure() {
  function TextLayerBuilder(options) {
    this.textLayerDiv = options.textLayerDiv;
    this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
    this.textContent = null;
    this.renderingDone = false;
    this.pageIdx = options.pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = options.viewport;
    this.textDivs = [];
    this.findController = options.findController || null;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = options.enhanceTextSelection;
    this._bindMouse();
***REMOVED***
  TextLayerBuilder.prototype = {
    _finishRendering: function TextLayerBuilder_finishRendering() {
      this.renderingDone = true;
      if (!this.enhanceTextSelection) {
        var endOfContent = document.createElement('div');
        endOfContent.className = 'endOfContent';
        this.textLayerDiv.appendChild(endOfContent);
    ***REMOVED***
      this.eventBus.dispatch('textlayerrendered', {
        source: this,
        pageNumber: this.pageNumber,
        numTextDivs: this.textDivs.length
    ***REMOVED***);
  ***REMOVED***,
    render: function TextLayerBuilder_render(timeout) {
      if (!this.textContent || this.renderingDone) {
        return;
    ***REMOVED***
      this.cancel();
      this.textDivs = [];
      var textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = pdfjsLib.renderTextLayer({
        textContent: this.textContent,
        container: textLayerFrag,
        viewport: this.viewport,
        textDivs: this.textDivs,
        timeout: timeout,
        enhanceTextSelection: this.enhanceTextSelection
    ***REMOVED***);
      this.textLayerRenderTask.promise.then(function () {
        this.textLayerDiv.appendChild(textLayerFrag);
        this._finishRendering();
        this.updateMatches();
    ***REMOVED***.bind(this), function (reason) {});
  ***REMOVED***,
    cancel: function TextLayerBuilder_cancel() {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
    ***REMOVED***
  ***REMOVED***,
    setTextContent: function TextLayerBuilder_setTextContent(textContent) {
      this.cancel();
      this.textContent = textContent;
  ***REMOVED***,
    convertMatches: function TextLayerBuilder_convertMatches(matches, matchesLength) {
      var i = 0;
      var iIndex = 0;
      var bidiTexts = this.textContent.items;
      var end = bidiTexts.length - 1;
      var queryLen = this.findController === null ? 0 : this.findController.state.query.length;
      var ret = [];
      if (!matches) {
        return ret;
    ***REMOVED***
      for (var m = 0, len = matches.length; m < len; m++) {
        var matchIdx = matches[m];
        while (i !== end && matchIdx >= iIndex + bidiTexts[i].str.length) {
          iIndex += bidiTexts[i].str.length;
          i++;
      ***REMOVED***
        if (i === bidiTexts.length) {
          console.error('Could not find a matching mapping');
      ***REMOVED***
        var match = {
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
        ***REMOVED***
      ***REMOVED***;
        if (matchesLength) {
          matchIdx += matchesLength[m];
      ***REMOVED*** else {
          matchIdx += queryLen;
      ***REMOVED***
        while (i !== end && matchIdx > iIndex + bidiTexts[i].str.length) {
          iIndex += bidiTexts[i].str.length;
          i++;
      ***REMOVED***
        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
      ***REMOVED***;
        ret.push(match);
    ***REMOVED***
      return ret;
  ***REMOVED***,
    renderMatches: function TextLayerBuilder_renderMatches(matches) {
      if (matches.length === 0) {
        return;
    ***REMOVED***
      var bidiTexts = this.textContent.items;
      var textDivs = this.textDivs;
      var prevEnd = null;
      var pageIdx = this.pageIdx;
      var isSelectedPage = this.findController === null ? false : pageIdx === this.findController.selected.pageIdx;
      var selectedMatchIdx = this.findController === null ? -1 : this.findController.selected.matchIdx;
      var highlightAll = this.findController === null ? false : this.findController.state.highlightAll;
      var infinity = {
        divIdx: -1,
        offset: undefined
    ***REMOVED***;
      function beginText(begin, className) {
        var divIdx = begin.divIdx;
        textDivs[divIdx].textContent = '';
        appendTextToDiv(divIdx, 0, begin.offset, className);
    ***REMOVED***
      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        var div = textDivs[divIdx];
        var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
        var node = document.createTextNode(content);
        if (className) {
          var span = document.createElement('span');
          span.className = className;
          span.appendChild(node);
          div.appendChild(span);
          return;
      ***REMOVED***
        div.appendChild(node);
    ***REMOVED***
      var i0 = selectedMatchIdx,
          i1 = i0 + 1;
      if (highlightAll) {
        i0 = 0;
        i1 = matches.length;
    ***REMOVED*** else if (!isSelectedPage) {
        return;
    ***REMOVED***
      for (var i = i0; i < i1; i++) {
        var match = matches[i];
        var begin = match.begin;
        var end = match.end;
        var isSelected = isSelectedPage && i === selectedMatchIdx;
        var highlightSuffix = isSelected ? ' selected' : '';
        if (this.findController) {
          this.findController.updateMatchPosition(pageIdx, i, textDivs, begin.divIdx);
      ***REMOVED***
        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        ***REMOVED***
          beginText(begin);
      ***REMOVED*** else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
      ***REMOVED***
        if (begin.divIdx === end.divIdx) {
          appendTextToDiv(begin.divIdx, begin.offset, end.offset, 'highlight' + highlightSuffix);
      ***REMOVED*** else {
          appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, 'highlight begin' + highlightSuffix);
          for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
            textDivs[n0].className = 'highlight middle' + highlightSuffix;
        ***REMOVED***
          beginText(end, 'highlight end' + highlightSuffix);
      ***REMOVED***
        prevEnd = end;
    ***REMOVED***
      if (prevEnd) {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
    ***REMOVED***
  ***REMOVED***,
    updateMatches: function TextLayerBuilder_updateMatches() {
      if (!this.renderingDone) {
        return;
    ***REMOVED***
      var matches = this.matches;
      var textDivs = this.textDivs;
      var bidiTexts = this.textContent.items;
      var clearedUntilDivIdx = -1;
      for (var i = 0, len = matches.length; i < len; i++) {
        var match = matches[i];
        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
          var div = textDivs[n];
          div.textContent = bidiTexts[n].str;
          div.className = '';
      ***REMOVED***
        clearedUntilDivIdx = match.end.divIdx + 1;
    ***REMOVED***
      if (this.findController === null || !this.findController.active) {
        return;
    ***REMOVED***
      var pageMatches, pageMatchesLength;
      if (this.findController !== null) {
        pageMatches = this.findController.pageMatches[this.pageIdx] || null;
        pageMatchesLength = this.findController.pageMatchesLength ? this.findController.pageMatchesLength[this.pageIdx] || null : null;
    ***REMOVED***
      this.matches = this.convertMatches(pageMatches, pageMatchesLength);
      this.renderMatches(this.matches);
  ***REMOVED***,
    _bindMouse: function TextLayerBuilder_bindMouse() {
      var div = this.textLayerDiv;
      var self = this;
      var expandDivsTimer = null;
      div.addEventListener('mousedown', function (e) {
        if (self.enhanceTextSelection && self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(true);
          if (expandDivsTimer) {
            clearTimeout(expandDivsTimer);
            expandDivsTimer = null;
        ***REMOVED***
          return;
      ***REMOVED***
        var end = div.querySelector('.endOfContent');
        if (!end) {
          return;
      ***REMOVED***
        var adjustTop = e.target !== div;
        adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue('-moz-user-select') !== 'none';
        if (adjustTop) {
          var divBounds = div.getBoundingClientRect();
          var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
          end.style.top = (r * 100).toFixed(2) + '%';
      ***REMOVED***
        end.classList.add('active');
    ***REMOVED***);
      div.addEventListener('mouseup', function (e) {
        if (self.enhanceTextSelection && self.textLayerRenderTask) {
          expandDivsTimer = setTimeout(function () {
            if (self.textLayerRenderTask) {
              self.textLayerRenderTask.expandTextDivs(false);
          ***REMOVED***
            expandDivsTimer = null;
        ***REMOVED***, EXPAND_DIVS_TIMEOUT);
          return;
      ***REMOVED***
        var end = div.querySelector('.endOfContent');
        if (!end) {
          return;
      ***REMOVED***
        end.style.top = '';
        end.classList.remove('active');
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;
  return TextLayerBuilder;
}();
function DefaultTextLayerFactory() {}
DefaultTextLayerFactory.prototype = {
  createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {
    return new TextLayerBuilder({
      textLayerDiv: textLayerDiv,
      pageIndex: pageIndex,
      viewport: viewport,
      enhanceTextSelection: enhanceTextSelection
  ***REMOVED***);
***REMOVED***
***REMOVED***
exports.TextLayerBuilder = TextLayerBuilder;
exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uiUtils = __webpack_require__(0);
var mozL10n = uiUtils.mozL10n;
var noContextMenuHandler = uiUtils.noContextMenuHandler;
var animationStarted = uiUtils.animationStarted;
var localized = uiUtils.localized;
var DEFAULT_SCALE_VALUE = uiUtils.DEFAULT_SCALE_VALUE;
var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
var MIN_SCALE = uiUtils.MIN_SCALE;
var MAX_SCALE = uiUtils.MAX_SCALE;
var PAGE_NUMBER_LOADING_INDICATOR = 'visiblePageIsLoading';
var SCALE_SELECT_CONTAINER_PADDING = 8;
var SCALE_SELECT_PADDING = 22;
var Toolbar = function ToolbarClosure() {
  function Toolbar(options, mainContainer, eventBus) {
    this.toolbar = options.container;
    this.mainContainer = mainContainer;
    this.eventBus = eventBus;
    this.items = options;
    this._wasLocalized = false;
    this.reset();
    this._bindListeners();
***REMOVED***
  Toolbar.prototype = {
    setPageNumber: function (pageNumber, pageLabel) {
      this.pageNumber = pageNumber;
      this.pageLabel = pageLabel;
      this._updateUIState(false);
  ***REMOVED***,
    setPagesCount: function (pagesCount, hasPageLabels) {
      this.pagesCount = pagesCount;
      this.hasPageLabels = hasPageLabels;
      this._updateUIState(true);
  ***REMOVED***,
    setPageScale: function (pageScaleValue, pageScale) {
      this.pageScaleValue = pageScaleValue;
      this.pageScale = pageScale;
      this._updateUIState(false);
  ***REMOVED***,
    reset: function () {
      this.pageNumber = 0;
      this.pageLabel = null;
      this.hasPageLabels = false;
      this.pagesCount = 0;
      this.pageScaleValue = DEFAULT_SCALE_VALUE;
      this.pageScale = DEFAULT_SCALE;
      this._updateUIState(true);
  ***REMOVED***,
    _bindListeners: function Toolbar_bindClickListeners() {
      var eventBus = this.eventBus;
      var self = this;
      var items = this.items;
      items.previous.addEventListener('click', function () {
        eventBus.dispatch('previouspage');
    ***REMOVED***);
      items.next.addEventListener('click', function () {
        eventBus.dispatch('nextpage');
    ***REMOVED***);
      items.zoomIn.addEventListener('click', function () {
        eventBus.dispatch('zoomin');
    ***REMOVED***);
      items.zoomOut.addEventListener('click', function () {
        eventBus.dispatch('zoomout');
    ***REMOVED***);
      items.pageNumber.addEventListener('click', function () {
        this.select();
    ***REMOVED***);
      items.pageNumber.addEventListener('change', function () {
        eventBus.dispatch('pagenumberchanged', {
          source: self,
          value: this.value
      ***REMOVED***);
    ***REMOVED***);
      items.scaleSelect.addEventListener('change', function () {
        if (this.value === 'custom') {
          return;
      ***REMOVED***
        eventBus.dispatch('scalechanged', {
          source: self,
          value: this.value
      ***REMOVED***);
    ***REMOVED***);
      items.presentationModeButton.addEventListener('click', function (e) {
        eventBus.dispatch('presentationmode');
    ***REMOVED***);
      items.openFile.addEventListener('click', function (e) {
        eventBus.dispatch('openfile');
    ***REMOVED***);
      items.print.addEventListener('click', function (e) {
        eventBus.dispatch('print');
    ***REMOVED***);
      items.download.addEventListener('click', function (e) {
        eventBus.dispatch('download');
    ***REMOVED***);
      items.scaleSelect.oncontextmenu = noContextMenuHandler;
      localized.then(this._localized.bind(this));
  ***REMOVED***,
    _localized: function Toolbar_localized() {
      this._wasLocalized = true;
      this._adjustScaleWidth();
      this._updateUIState(true);
  ***REMOVED***,
    _updateUIState: function Toolbar_updateUIState(resetNumPages) {
      function selectScaleOption(value, scale) {
        var options = items.scaleSelect.options;
        var predefinedValueFound = false;
        for (var i = 0, ii = options.length; i < ii; i++) {
          var option = options[i];
          if (option.value !== value) {
            option.selected = false;
            continue;
        ***REMOVED***
          option.selected = true;
          predefinedValueFound = true;
      ***REMOVED***
        if (!predefinedValueFound) {
          var customScale = Math.round(scale * 10000) / 100;
          items.customScaleOption.textContent = mozL10n.get('page_scale_percent', { scale: customScale }, '{{scale}}%');
          items.customScaleOption.selected = true;
      ***REMOVED***
    ***REMOVED***
      if (!this._wasLocalized) {
        return;
    ***REMOVED***
      var pageNumber = this.pageNumber;
      var scaleValue = (this.pageScaleValue || this.pageScale).toString();
      var scale = this.pageScale;
      var items = this.items;
      var pagesCount = this.pagesCount;
      if (resetNumPages) {
        if (this.hasPageLabels) {
          items.pageNumber.type = 'text';
      ***REMOVED*** else {
          items.pageNumber.type = 'number';
          items.numPages.textContent = mozL10n.get('of_pages', { pagesCount: pagesCount }, 'of {{pagesCount}}');
      ***REMOVED***
        items.pageNumber.max = pagesCount;
    ***REMOVED***
      if (this.hasPageLabels) {
        items.pageNumber.value = this.pageLabel;
        items.numPages.textContent = mozL10n.get('page_of_pages', {
          pageNumber: pageNumber,
          pagesCount: pagesCount
      ***REMOVED***, '({{pageNumber}} of {{pagesCount}})');
    ***REMOVED*** else {
        items.pageNumber.value = pageNumber;
    ***REMOVED***
      items.previous.disabled = pageNumber <= 1;
      items.next.disabled = pageNumber >= pagesCount;
      items.zoomOut.disabled = scale <= MIN_SCALE;
      items.zoomIn.disabled = scale >= MAX_SCALE;
      selectScaleOption(scaleValue, scale);
  ***REMOVED***,
    updateLoadingIndicatorState: function Toolbar_updateLoadingIndicatorState(loading) {
      var pageNumberInput = this.items.pageNumber;
      if (loading) {
        pageNumberInput.classList.add(PAGE_NUMBER_LOADING_INDICATOR);
    ***REMOVED*** else {
        pageNumberInput.classList.remove(PAGE_NUMBER_LOADING_INDICATOR);
    ***REMOVED***
  ***REMOVED***,
    _adjustScaleWidth: function Toolbar_adjustScaleWidth() {
      var container = this.items.scaleSelectContainer;
      var select = this.items.scaleSelect;
      animationStarted.then(function () {
        if (container.clientWidth === 0) {
          container.setAttribute('style', 'display: inherit;');
      ***REMOVED***
        if (container.clientWidth > 0) {
          select.setAttribute('style', 'min-width: inherit;');
          var width = select.clientWidth + SCALE_SELECT_CONTAINER_PADDING;
          select.setAttribute('style', 'min-width: ' + (width + SCALE_SELECT_PADDING) + 'px;');
          container.setAttribute('style', 'min-width: ' + width + 'px; ' + 'max-width: ' + width + 'px;');
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;
  return Toolbar;
}();
exports.Toolbar = Toolbar;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;
var ViewHistory = function ViewHistoryClosure() {
  function ViewHistory(fingerprint, cacheSize) {
    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize || DEFAULT_VIEW_HISTORY_CACHE_SIZE;
    this.isInitializedPromiseResolved = false;
    this.initializedPromise = this._readFromStorage().then(function (databaseStr) {
      this.isInitializedPromiseResolved = true;
      var database = JSON.parse(databaseStr || '{}');
      if (!('files' in database)) {
        database.files = [];
    ***REMOVED***
      if (database.files.length >= this.cacheSize) {
        database.files.shift();
    ***REMOVED***
      var index;
      for (var i = 0, length = database.files.length; i < length; i++) {
        var branch = database.files[i];
        if (branch.fingerprint === this.fingerprint) {
          index = i;
          break;
      ***REMOVED***
    ***REMOVED***
      if (typeof index !== 'number') {
        index = database.files.push({ fingerprint: this.fingerprint }) - 1;
    ***REMOVED***
      this.file = database.files[index];
      this.database = database;
  ***REMOVED***.bind(this));
***REMOVED***
  ViewHistory.prototype = {
    _writeToStorage: function ViewHistory_writeToStorage() {
      return new Promise(function (resolve) {
        var databaseStr = JSON.stringify(this.database);
        localStorage.setItem('pdfjs.history', databaseStr);
        resolve();
    ***REMOVED***.bind(this));
  ***REMOVED***,
    _readFromStorage: function ViewHistory_readFromStorage() {
      return new Promise(function (resolve) {
        var value = localStorage.getItem('pdfjs.history');
        if (!value) {
          var databaseStr = localStorage.getItem('database');
          if (databaseStr) {
            try {
              var database = JSON.parse(databaseStr);
              if (typeof database.files[0].fingerprint === 'string') {
                localStorage.setItem('pdfjs.history', databaseStr);
                localStorage.removeItem('database');
                value = databaseStr;
            ***REMOVED***
          ***REMOVED*** catch (ex) {}
        ***REMOVED***
      ***REMOVED***
        resolve(value);
    ***REMOVED***);
  ***REMOVED***,
    set: function ViewHistory_set(name, val) {
      if (!this.isInitializedPromiseResolved) {
        return;
    ***REMOVED***
      this.file[name] = val;
      return this._writeToStorage();
  ***REMOVED***,
    setMultiple: function ViewHistory_setMultiple(properties) {
      if (!this.isInitializedPromiseResolved) {
        return;
    ***REMOVED***
      for (var name in properties) {
        this.file[name] = properties[name];
    ***REMOVED***
      return this._writeToStorage();
  ***REMOVED***,
    get: function ViewHistory_get(name, defaultValue) {
      if (!this.isInitializedPromiseResolved) {
        return defaultValue;
    ***REMOVED***
      return this.file[name] || defaultValue;
  ***REMOVED***
***REMOVED***;
  return ViewHistory;
}();
exports.ViewHistory = ViewHistory;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DEFAULT_URL = 'compressed.tracemonkey-pldi-09.pdf';
;
var pdfjsWebApp;
{
  pdfjsWebApp = __webpack_require__(6);
}
;
;
{
  __webpack_require__(9);
}
function getViewerConfiguration() {
  return {
    appContainer: document.body,
    mainContainer: document.getElementById('viewerContainer'),
    viewerContainer: document.getElementById('viewer'),
    eventBus: null,
    toolbar: {
      container: document.getElementById('toolbarViewer'),
      numPages: document.getElementById('numPages'),
      pageNumber: document.getElementById('pageNumber'),
      scaleSelectContainer: document.getElementById('scaleSelectContainer'),
      scaleSelect: document.getElementById('scaleSelect'),
      customScaleOption: document.getElementById('customScaleOption'),
      previous: document.getElementById('previous'),
      next: document.getElementById('next'),
      zoomIn: document.getElementById('zoomIn'),
      zoomOut: document.getElementById('zoomOut'),
      viewFind: document.getElementById('viewFind'),
      openFile: document.getElementById('openFile'),
      print: document.getElementById('print'),
      presentationModeButton: document.getElementById('presentationMode'),
      download: document.getElementById('download'),
      viewBookmark: document.getElementById('viewBookmark')
  ***REMOVED***,
    secondaryToolbar: {
      toolbar: document.getElementById('secondaryToolbar'),
      toggleButton: document.getElementById('secondaryToolbarToggle'),
      toolbarButtonContainer: document.getElementById('secondaryToolbarButtonContainer'),
      presentationModeButton: document.getElementById('secondaryPresentationMode'),
      openFileButton: document.getElementById('secondaryOpenFile'),
      printButton: document.getElementById('secondaryPrint'),
      downloadButton: document.getElementById('secondaryDownload'),
      viewBookmarkButton: document.getElementById('secondaryViewBookmark'),
      firstPageButton: document.getElementById('firstPage'),
      lastPageButton: document.getElementById('lastPage'),
      pageRotateCwButton: document.getElementById('pageRotateCw'),
      pageRotateCcwButton: document.getElementById('pageRotateCcw'),
      toggleHandToolButton: document.getElementById('toggleHandTool'),
      documentPropertiesButton: document.getElementById('documentProperties')
  ***REMOVED***,
    fullscreen: {
      contextFirstPage: document.getElementById('contextFirstPage'),
      contextLastPage: document.getElementById('contextLastPage'),
      contextPageRotateCw: document.getElementById('contextPageRotateCw'),
      contextPageRotateCcw: document.getElementById('contextPageRotateCcw')
  ***REMOVED***,
    sidebar: {
      mainContainer: document.getElementById('mainContainer'),
      outerContainer: document.getElementById('outerContainer'),
      toggleButton: document.getElementById('sidebarToggle'),
      thumbnailButton: document.getElementById('viewThumbnail'),
      outlineButton: document.getElementById('viewOutline'),
      attachmentsButton: document.getElementById('viewAttachments'),
      thumbnailView: document.getElementById('thumbnailView'),
      outlineView: document.getElementById('outlineView'),
      attachmentsView: document.getElementById('attachmentsView')
  ***REMOVED***,
    findBar: {
      bar: document.getElementById('findbar'),
      toggleButton: document.getElementById('viewFind'),
      findField: document.getElementById('findInput'),
      highlightAllCheckbox: document.getElementById('findHighlightAll'),
      caseSensitiveCheckbox: document.getElementById('findMatchCase'),
      findMsg: document.getElementById('findMsg'),
      findResultsCount: document.getElementById('findResultsCount'),
      findStatusIcon: document.getElementById('findStatusIcon'),
      findPreviousButton: document.getElementById('findPrevious'),
      findNextButton: document.getElementById('findNext')
  ***REMOVED***,
    passwordOverlay: {
      overlayName: 'passwordOverlay',
      container: document.getElementById('passwordOverlay'),
      label: document.getElementById('passwordText'),
      input: document.getElementById('password'),
      submitButton: document.getElementById('passwordSubmit'),
      cancelButton: document.getElementById('passwordCancel')
  ***REMOVED***,
    documentProperties: {
      overlayName: 'documentPropertiesOverlay',
      container: document.getElementById('documentPropertiesOverlay'),
      closeButton: document.getElementById('documentPropertiesClose'),
      fields: {
        'fileName': document.getElementById('fileNameField'),
        'fileSize': document.getElementById('fileSizeField'),
        'title': document.getElementById('titleField'),
        'author': document.getElementById('authorField'),
        'subject': document.getElementById('subjectField'),
        'keywords': document.getElementById('keywordsField'),
        'creationDate': document.getElementById('creationDateField'),
        'modificationDate': document.getElementById('modificationDateField'),
        'creator': document.getElementById('creatorField'),
        'producer': document.getElementById('producerField'),
        'version': document.getElementById('versionField'),
        'pageCount': document.getElementById('pageCountField')
    ***REMOVED***
  ***REMOVED***,
    errorWrapper: {
      container: document.getElementById('errorWrapper'),
      errorMessage: document.getElementById('errorMessage'),
      closeButton: document.getElementById('errorClose'),
      errorMoreInfo: document.getElementById('errorMoreInfo'),
      moreInfoButton: document.getElementById('errorShowMore'),
      lessInfoButton: document.getElementById('errorShowLess')
  ***REMOVED***,
    printContainer: document.getElementById('printContainer'),
    openFileInputName: 'fileInput',
    debuggerScriptPath: './debugger.js',
    defaultUrl: DEFAULT_URL
***REMOVED***;
}
function webViewerLoad() {
  var config = getViewerConfiguration();
  window.PDFViewerApplication = pdfjsWebApp.PDFViewerApplication;
  pdfjsWebApp.PDFViewerApplication.run(config);
}
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  webViewerLoad();
} else {
  document.addEventListener('DOMContentLoaded', webViewerLoad, true);
}

/***/ })
/******/ ]);