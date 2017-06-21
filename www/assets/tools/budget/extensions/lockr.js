(function(root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory(root, exports);
  ***REMOVED***
***REMOVED*** else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      root.Lockr = factory(root, exports);
  ***REMOVED***);
***REMOVED*** else {
    root.Lockr = factory(root, {});
***REMOVED***

}(this, function(root, Lockr) {
  'use strict';

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/)
    {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++)
      {
        if (from in this &&
            this[from] === elt)
          return from;
    ***REMOVED***
      return -1;
  ***REMOVED***;
***REMOVED***

  Lockr.prefix = "";

  Lockr._getPrefixedKey = function(key, options) {
    options = options || {***REMOVED***

    if (options.noPrefix) {
      return key;
  ***REMOVED*** else {
      return this.prefix + key;
  ***REMOVED***

***REMOVED***;

  Lockr.set = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    try {
      localStorage.setItem(query_key, JSON.stringify({"data": value}));
  ***REMOVED*** catch (e) {
      if (console) console.warn("Lockr didn't successfully save the '{"+ key +": "+ value +"}' pair, because the localStorage is full.");
  ***REMOVED***
***REMOVED***;

  Lockr.get = function (key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
  ***REMOVED*** catch (e) {
      if( localStorage[query_key] ){
        value = JSON.parse('{"data":"' + localStorage.getItem(query_key) + '"}')
    ***REMOVED***else{
        value = null;
    ***REMOVED***
  ***REMOVED***
    if(value === null)
      return missing;
    else
        return (typeof value == 'object' && typeof value.data != 'undefined')
                ? value.data
                : (value || missing);
***REMOVED***;

  Lockr.sadd = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json;

    var values = Lockr.smembers(key);

    if (values.indexOf(value) > -1) {
      return null;
  ***REMOVED***

    try {
      values.push(value);
      json = JSON.stringify({"data": values});
      localStorage.setItem(query_key, json);
  ***REMOVED*** catch (e) {
      console.log(e);
      if (console) console.warn("Lockr didn't successfully add the "+ value +" to "+ key +" set, because the localStorage is full.");
  ***REMOVED***
***REMOVED***;

  Lockr.smembers = function(key, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
  ***REMOVED*** catch (e) {
      value = null;
  ***REMOVED***

    if (value === null)
      return [];
    else
      return (value.data || []);
***REMOVED***;

  Lockr.sismember = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    return Lockr.smembers(key).indexOf(value) > -1;
***REMOVED***;

  Lockr.getAll = function () {
    var keys = Object.keys(localStorage);

    return keys.map(function (key) {
      return Lockr.get(key);
  ***REMOVED***);
***REMOVED***;

  Lockr.srem = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json,
        index;

    var values = Lockr.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
      values.splice(index, 1);

    json = JSON.stringify({"data": values});

    try {
      localStorage.setItem(query_key, json);
  ***REMOVED*** catch (e) {
      if (console) console.warn("Lockr couldn't remove the "+ value +" from the set "+ key);
  ***REMOVED***
***REMOVED***;

  Lockr.rm =  function (key) {
    localStorage.removeItem(key);
***REMOVED***;

  Lockr.flush = function () {
    localStorage.clear();
***REMOVED***;
  return Lockr;

}));
