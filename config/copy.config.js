module.exports = {
  copyAssets: {
    src: ["{{SRC}}/assets/**/*"],
    dest: "{{WWW}}/assets"
  },
  copyIndexContent: {
    src: [
      "{{SRC}}/index.html",
      "{{SRC}}/manifest.json",
      "{{SRC}}/service-worker.js"
    ],
    dest: "{{WWW}}"
  },
  copyFonts: {
    src: [
      "{{ROOT}}/node_modules/ionicons/dist/fonts/**/*",
      "{{ROOT}}/node_modules/ionic-angular/fonts/**/*"
    ],
    dest: "{{WWW}}/assets/fonts"
  },
  copyPolyfills: {
    src: ["{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js"],
    dest: "{{BUILD}}"
  },
  copyWorkbox: {
    src: [
      "./node_modules/workbox-sw/build/workbox-sw.js",
      "./node_modules/workbox-core/build/workbox-core.prod.js",
      "./node_modules/workbox-precaching/build/workbox-precaching.prod.js"
    ],
    dest: "{{WWW}}/workbox-3.2.0"
  },
  copyC3Css: {
    src: "./node_modules/c3/c3.css",
    dest: "{{BUILD}}"
  },
  copyLeafletCss: {
    src: "./node_modules/leaflet/dist/leaflet.css",
    dest: "{{BUILD}}"
  }
};
