import h from "./src/h";
import patch from "./src/patch";
h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "F" }, "F"),
]);
patch(box, model1);
