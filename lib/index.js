/**
 * @fileoverview no url
 * @author wangyang
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

module.exports = {
    rules: {
        'no-url': require('./rules/cf-url'),
        'check-env': require('./rules/cf-env'),
    },
    configs: {
        recommended: {
            rules: {
                'cfscan/no-url': 1, // 可以省略 eslint-plugin 前缀, 1，警告  2，error  0,关闭
                'cfscan/check-env': 2
            },
        },
    },
};



