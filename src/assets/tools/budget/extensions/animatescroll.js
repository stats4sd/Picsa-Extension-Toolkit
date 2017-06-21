/*
 * @build  : 20-07-2013
 * @author : Ram swaroop
 * @site   : Compzets.com
 */
(function($){
      
    // defines various easing effects
    $.easing['jswing'] = $.easing['swing'];
    $.extend( $.easing,
    {
            def: 'easeOutQuad',
            swing: function (x, t, b, c, d) {
                    return $.easing[$.easing.def](x, t, b, c, d);
          ***REMOVED***,
            easeInQuad: function (x, t, b, c, d) {
                    return c*(t/=d)*t + b;
          ***REMOVED***,
            easeOutQuad: function (x, t, b, c, d) {
                    return -c *(t/=d)*(t-2) + b;
          ***REMOVED***,
            easeInOutQuad: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
          ***REMOVED***,
            easeInCubic: function (x, t, b, c, d) {
                    return c*(t/=d)*t*t + b;
          ***REMOVED***,
            easeOutCubic: function (x, t, b, c, d) {
                    return c*((t=t/d-1)*t*t + 1) + b;
          ***REMOVED***,
            easeInOutCubic: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
          ***REMOVED***,
            easeInQuart: function (x, t, b, c, d) {
                    return c*(t/=d)*t*t*t + b;
          ***REMOVED***,
            easeOutQuart: function (x, t, b, c, d) {
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
          ***REMOVED***,
            easeInOutQuart: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
          ***REMOVED***,
            easeInQuint: function (x, t, b, c, d) {
                    return c*(t/=d)*t*t*t*t + b;
          ***REMOVED***,
            easeOutQuint: function (x, t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
          ***REMOVED***,
            easeInOutQuint: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
          ***REMOVED***,
            easeInSine: function (x, t, b, c, d) {
                    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
          ***REMOVED***,
            easeOutSine: function (x, t, b, c, d) {
                    return c * Math.sin(t/d * (Math.PI/2)) + b;
          ***REMOVED***,
            easeInOutSine: function (x, t, b, c, d) {
                    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
          ***REMOVED***,
            easeInExpo: function (x, t, b, c, d) {
                    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
          ***REMOVED***,
            easeOutExpo: function (x, t, b, c, d) {
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
          ***REMOVED***,
            easeInOutExpo: function (x, t, b, c, d) {
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
          ***REMOVED***,
            easeInCirc: function (x, t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
          ***REMOVED***,
            easeOutCirc: function (x, t, b, c, d) {
                    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
          ***REMOVED***,
            easeInOutCirc: function (x, t, b, c, d) {
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
          ***REMOVED***,
            easeInElastic: function (x, t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
          ***REMOVED***,
            easeOutElastic: function (x, t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
          ***REMOVED***,
            easeInOutElastic: function (x, t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
          ***REMOVED***,
            easeInBack: function (x, t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
          ***REMOVED***,
            easeOutBack: function (x, t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
          ***REMOVED***,
            easeInOutBack: function (x, t, b, c, d, s) {
                    if (s == undefined) s = 1.70158; 
                    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
          ***REMOVED***,
            easeInBounce: function (x, t, b, c, d) {
                    return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
          ***REMOVED***,
            easeOutBounce: function (x, t, b, c, d) {
                    if ((t/=d) < (1/2.75)) {
                            return c*(7.5625*t*t) + b;
                  ***REMOVED*** else if (t < (2/2.75)) {
                            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                  ***REMOVED*** else if (t < (2.5/2.75)) {
                            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                  ***REMOVED*** else {
                            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                  ***REMOVED***
          ***REMOVED***,
            easeInOutBounce: function (x, t, b, c, d) {
                    if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
                    return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
          ***REMOVED***
  ***REMOVED***);
    
    $.fn.animatescroll = function(options) {
        
        // fetches options
        var opts = $.extend({},$.fn.animatescroll.defaults,options);

        // make sure the callback is a function
        if (typeof opts.onScrollStart == 'function') {
            // brings the scope to the callback
            opts.onScrollStart.call(this);
      ***REMOVED***
                
        if(opts.element == "html,body") {
            // Get the distance of particular id or class from top
            var offset = this.offset().top;
        
            // Scroll the page to the desired position
            $(opts.element).stop().animate({ scrollTop: offset - opts.padding}, opts.scrollSpeed, opts.easing);
      ***REMOVED***
        else {
            // Scroll the element to the desired position
            $(opts.element).stop().animate({ scrollTop: this.offset().top - this.parent().offset().top + this.parent().scrollTop() - opts.padding}, opts.scrollSpeed, opts.easing);
      ***REMOVED***

        setTimeout(function() {

            // make sure the callback is a function
            if (typeof opts.onScrollEnd == 'function') {
                // brings the scope to the callback
                opts.onScrollEnd.call(this);
          ***REMOVED***
      ***REMOVED***, opts.scrollSpeed);
  ***REMOVED***;
    
    // default options
    $.fn.animatescroll.defaults = {        
        easing:"swing",
        scrollSpeed:800,
        padding:0,
        element:"html,body"
  ***REMOVED***;   
    
}(jQuery));