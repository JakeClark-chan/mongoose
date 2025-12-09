"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSubscription = void 0;

var react_1 = require("react");

var relay_runtime_1 = require("relay-runtime");

var useRelayEnvironment_1 = require("./useRelayEnvironment");

function useSubscription(config, opts) {
  var environment = (0, useRelayEnvironment_1.useRelayEnvironment)();
  var skip = opts && opts.skip;
  (0, react_1.useEffect)(function () {
    if (skip) {
      return;
    }

    var dispose = (0, relay_runtime_1.requestSubscription)(environment, config).dispose;
    return dispose;
  }, [environment, config, skip]);
}

exports.useSubscription = useSubscription;