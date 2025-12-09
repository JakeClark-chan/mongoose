/**
 * @fileoverview cf no url
 * @author wangyang
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "cf no url",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      avoidUrl: "url '{{url}}' is forbidden.",
  },
  },

  create(context) {
    // variables should be defined here
    return {
      'Literal': (node)=> {
        var match = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        if(match.test(node.value)) {
          context.report({
              node,
              messageId: 'avoidUrl',
              data: {
                  url: node.value,
              },
          });
        }
      }
    };
  },
};
