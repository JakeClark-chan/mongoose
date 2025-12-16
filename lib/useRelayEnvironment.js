"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRelayEnvironment = void 0;

var React = require("react");

var ReactRelayContext_1 = require("./ReactRelayContext");

function useRelayEnvironment() {
  var environment = React.useContext(ReactRelayContext_1.ReactRelayContext).environment;
  return environment;
}

exports.useRelayEnvironment = useRelayEnvironment;