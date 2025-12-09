"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");exports.useEffectAfterMount=(r,t)=>{const u=e.useRef(!1);e.useEffect(()=>{u.current?r():u.current=!0},t)};
//# sourceMappingURL=useEffectAfterMount.js.map
