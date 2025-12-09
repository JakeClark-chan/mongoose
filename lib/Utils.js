"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOperation = exports.forceCache = exports.isStorePolicy = exports.isNetworkPolicy = void 0;

var relay_runtime_1 = require("relay-runtime");

var RelayHooksTypes_1 = require("./RelayHooksTypes");

var isNetworkPolicy = function (policy, full) {
  return policy === RelayHooksTypes_1.NETWORK_ONLY || policy === RelayHooksTypes_1.STORE_THEN_NETWORK || policy === RelayHooksTypes_1.STORE_OR_NETWORK && !full;
};

exports.isNetworkPolicy = isNetworkPolicy;

var isStorePolicy = function (policy) {
  return policy !== RelayHooksTypes_1.NETWORK_ONLY;
};

exports.isStorePolicy = isStorePolicy;
exports.forceCache = {
  force: true
}; // Fetcher

function createOperation(gqlQuery, variables, cacheConfig) {
  return (0, relay_runtime_1.createOperationDescriptor)((0, relay_runtime_1.getRequest)(gqlQuery), variables, cacheConfig);
}

exports.createOperation = createOperation;