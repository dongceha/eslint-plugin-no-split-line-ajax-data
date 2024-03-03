/**
 * @fileoverview no-split-line-ajax-data
 * @author dongce
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-split-line-ajax-data"),
RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("no-split-line-ajax-data", rule, {
  valid: [
    "ajaxData('bff')",
    `var fn = function () {
      return ajaxData('bff')
    }`
  ],
  invalid: [
    {
      code: "ajaxData('/bff')",
      errors: [{
        message: "ajaxData 第一个参数不能以斜杠开头",
      }]
    },
    {
      code: `
      var fn = function() {
        return ajaxData('/bff')
      }`,
      errors: [{
        message: "ajaxData 第一个参数不能以斜杠开头",
      }]
    },
  ],
});
