"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePreloadedQuery = void 0;

var react_1 = require("react");

var useForceUpdate_1 = require("./useForceUpdate");

var useRelayEnvironment_1 = require("./useRelayEnvironment");

var usePreloadedQuery = function (loadQuery) {
  var forceUpdate = (0, useForceUpdate_1.useForceUpdate)();
  var environment = (0, useRelayEnvironment_1.useRelayEnvironment)();
  (0, react_1.useEffect)(function () {
    return loadQuery.subscribe(forceUpdate); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadQuery]);
  return loadQuery.getValue(environment);
};

exports.usePreloadedQuery = usePreloadedQuery;