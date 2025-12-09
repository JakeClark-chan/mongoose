/**
 * @fileoverview cf no url
 * @author wangyang
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/cf-url"),
 ruleEnv = require('../../../lib/rules/cf-env'),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("cfscan", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "location.href='http://www.baidu.com';",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
ruleTester.run("cf-env", ruleEnv, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "VUE_APP_API_BASE_URL='https://mstest.jr.jd.com'",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
})
