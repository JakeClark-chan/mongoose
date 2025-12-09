// function throttle() {
//   // noop
//   return;
// };

// Bind should allow you to run a provided method using state
// as the object to used for `this`
function bind(func, state) {
  // noop
  return function () {
    const args = Array.prototype.slice(arguments);
    return func.apply(state, args);
  };
}

Function.prototype.bind = Function.prototype.bind || function (state) {
  return bind(this, state);
};

function a() {
  console.log(this.x);
}

// a();
const b = bind(a, { x: 20 });
// b();
// a.bind({ x: 10 })();

// function debounce() {
//   // noop
//   return;
// };

function throttle(func, delay) {
  var wait = null;
  return function () {
    // Allow user to cancel the function anytime they want
    this.cancel = function () {
      return clearTimeout(wait);
    };
    if (wait === null) {
      var args = Array.prototype.slice(arguments);
      func();
      wait = setTimeout(function () {
        clearTimeout(wait);
        console.log('ready');
      }, delay);
    }
  }
}

const c = throttle(b, 1000);
// while (true) {
//   c();
// }
for (var x = 0; x < 10000; x++) {
  c();
}
