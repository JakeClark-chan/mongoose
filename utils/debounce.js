"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.debounce=(e,t,o)=>{let u;return function(...l){const r=this,s=o&&!u;clearTimeout(u),u=setTimeout(()=>{u=null,o||e.apply(r,l)},t),s&&e.apply(r,l)}};
//# sourceMappingURL=debounce.js.map
