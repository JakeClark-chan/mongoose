"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelayEnvironmentProvider = exports.useRelayEnvironment = exports.useRefetchableSubscription = exports.useRefetchableFragment = exports.useRefetchable = exports.usePaginationSubscription = exports.usePaginationFragment = exports.usePagination = exports.useOssFragment = exports.useSubscription = exports.useMutation = exports.useFragmentSubscription = exports.useSuspenseFragment = exports.useFragment = exports.usePreloadedQuery = exports.loadLazyQuery = exports.loadQuery = exports.useLazyLoadQuery = exports.useQuery = exports.ReactRelayContext = exports.requestSubscription = exports.graphql = exports.fetchQuery = exports.commitMutation = exports.commitLocalUpdate = exports.applyOptimisticMutation = void 0;

var relay_runtime_1 = require("relay-runtime");

Object.defineProperty(exports, "applyOptimisticMutation", {
  enumerable: true,
  get: function () {
    return relay_runtime_1.applyOptimisticMutation;
  }
});
Object.defineProperty(exports, "commitLocalUpdate", {
  enumerable: true,
  get: function () {
    return relay_runtime_1.commitLocalUpdate;
  }
});
Object.defineProperty(exports, "commitMutation", {
  enumerable: true,
  get: function () {
    return relay_runtime_1.commitMutation;
  }
});
Object.defineProperty(exports, "fetchQuery", {
  enumerable: true,
  get: function () {
    return relay_runtime_1.fetchQuery;
  }
});
Object.defineProperty(exports, "graphql", {
  enumerable: true,
  get: function () {
    return relay_runtime_1.graphql;
  }
});
Object.defineProperty(exports, "requestSubscription", {
  enumerable: true,
  get: function () {
    return relay_runtime_1.requestSubscription;
  }
});

var ReactRelayContext_1 = require("./ReactRelayContext");

Object.defineProperty(exports, "ReactRelayContext", {
  enumerable: true,
  get: function () {
    return ReactRelayContext_1.ReactRelayContext;
  }
});

var useQuery_1 = require("./useQuery");

Object.defineProperty(exports, "useQuery", {
  enumerable: true,
  get: function () {
    return useQuery_1.useQuery;
  }
});
Object.defineProperty(exports, "useLazyLoadQuery", {
  enumerable: true,
  get: function () {
    return useQuery_1.useLazyLoadQuery;
  }
});

var loadQuery_1 = require("./loadQuery");

Object.defineProperty(exports, "loadQuery", {
  enumerable: true,
  get: function () {
    return loadQuery_1.loadQuery;
  }
});
Object.defineProperty(exports, "loadLazyQuery", {
  enumerable: true,
  get: function () {
    return loadQuery_1.loadLazyQuery;
  }
});

var usePreloadedQuery_1 = require("./usePreloadedQuery");

Object.defineProperty(exports, "usePreloadedQuery", {
  enumerable: true,
  get: function () {
    return usePreloadedQuery_1.usePreloadedQuery;
  }
});

var useFragment_1 = require("./useFragment");

Object.defineProperty(exports, "useFragment", {
  enumerable: true,
  get: function () {
    return useFragment_1.useFragment;
  }
});
Object.defineProperty(exports, "useSuspenseFragment", {
  enumerable: true,
  get: function () {
    return useFragment_1.useSuspenseFragment;
  }
});
Object.defineProperty(exports, "useFragmentSubscription", {
  enumerable: true,
  get: function () {
    return useFragment_1.useFragmentSubscription;
  }
});

var useMutation_1 = require("./useMutation");

Object.defineProperty(exports, "useMutation", {
  enumerable: true,
  get: function () {
    return useMutation_1.useMutation;
  }
});

var useSubscription_1 = require("./useSubscription");

Object.defineProperty(exports, "useSubscription", {
  enumerable: true,
  get: function () {
    return useSubscription_1.useSubscription;
  }
});

var useOssFragment_1 = require("./useOssFragment");

Object.defineProperty(exports, "useOssFragment", {
  enumerable: true,
  get: function () {
    return useOssFragment_1.useOssFragment;
  }
});

var usePagination_1 = require("./usePagination");

Object.defineProperty(exports, "usePagination", {
  enumerable: true,
  get: function () {
    return usePagination_1.usePagination;
  }
});
Object.defineProperty(exports, "usePaginationFragment", {
  enumerable: true,
  get: function () {
    return usePagination_1.usePaginationFragment;
  }
});
Object.defineProperty(exports, "usePaginationSubscription", {
  enumerable: true,
  get: function () {
    return usePagination_1.usePaginationSubscription;
  }
});

var useRefetchable_1 = require("./useRefetchable");

Object.defineProperty(exports, "useRefetchable", {
  enumerable: true,
  get: function () {
    return useRefetchable_1.useRefetchable;
  }
});
Object.defineProperty(exports, "useRefetchableFragment", {
  enumerable: true,
  get: function () {
    return useRefetchable_1.useRefetchableFragment;
  }
});
Object.defineProperty(exports, "useRefetchableSubscription", {
  enumerable: true,
  get: function () {
    return useRefetchable_1.useRefetchableSubscription;
  }
});

var useRelayEnvironment_1 = require("./useRelayEnvironment");

Object.defineProperty(exports, "useRelayEnvironment", {
  enumerable: true,
  get: function () {
    return useRelayEnvironment_1.useRelayEnvironment;
  }
});

var RelayEnvironmentProvider_1 = require("./RelayEnvironmentProvider");

Object.defineProperty(exports, "RelayEnvironmentProvider", {
  enumerable: true,
  get: function () {
    return RelayEnvironmentProvider_1.RelayEnvironmentProvider;
  }
});

__exportStar(require("./RelayHooksTypes"), exports);