if(!self.define){let e,o={};const s=(s,i)=>(s=new URL(s+".js",i).href,o[s]||new Promise((o=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=o,document.head.appendChild(e)}else e=s,importScripts(s),o()})).then((()=>{let e=o[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(o[n])return;let l={};const t=e=>s(e,n),a={module:{uri:n},exports:l,require:t};o[n]=Promise.all(i.map((e=>a[e]||t(e)))).then((e=>(r(...e),l)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"esphome-display-configurator"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/esphome-display-configurator/css/app.ef5e6b54.css",revision:null},{url:"/esphome-display-configurator/css/chunk-vendors.1e1cf0d1.css",revision:null},{url:"/esphome-display-configurator/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/esphome-display-configurator/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/esphome-display-configurator/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/esphome-display-configurator/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/esphome-display-configurator/img/boards/oled128x64.png",revision:"3e267b86a12a283c877b812359a4015f"},{url:"/esphome-display-configurator/index.html",revision:"1eb010a7f4f72791a8332e331efd1e35"},{url:"/esphome-display-configurator/js/app.4ffb9709.js",revision:null},{url:"/esphome-display-configurator/js/chunk-vendors.fcb42a63.js",revision:null},{url:"/esphome-display-configurator/manifest.json",revision:"8c3fe7538442374883239986eebc98cb"},{url:"/esphome-display-configurator/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
