module.exports = {
    copyAssets: {
        src: ['{{SRC}}/assets/**/*'],
        dest: '{{WWW}}/assets'
  ***REMOVED***,
    copyIndexContent: {
        src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
        dest: '{{WWW}}'
  ***REMOVED***,
    copyFonts: {
        src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
        dest: '{{WWW}}/assets/fonts'
  ***REMOVED***,
    copyPolyfills: {
        src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
        dest: '{{BUILD}}'
  ***REMOVED***,
    copySwToolbox: {
        src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
        dest: '{{BUILD}}'
  ***REMOVED***,
    copyC3Css: {
        src: './node_modules/c3/c3.css',
        dest: '{{BUILD}}'
  ***REMOVED***,
    copyLeafletCss: {
        src: './node_modules/leaflet/dist/leaflet.css',
        dest: '{{BUILD}}'
  ***REMOVED***
}