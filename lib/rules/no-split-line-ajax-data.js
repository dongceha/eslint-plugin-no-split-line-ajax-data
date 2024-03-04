/**
 * @fileoverview no-split-line-ajax-data
 * @author dongce
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "这是ajaxData的使用方法",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create: function (context) {
    /**
     * 获取函数的参数的开始、结束位置
     * @param {node} node AST Node 
     */
    return {
      CallExpression: (node) => {
        if (node?.callee?.name === 'ajaxData') {
          if (node?.arguments?.length > 0) {
            const arg = node.arguments[0]?.value
            if (arg?.startsWith('/')) {
              context.report({
                node: node,
                message: "ajaxData 第一个参数不能以斜杠开头",
                // fix(fixer) {
                //   return fixer.replaceText(node.arguments[0], `'${arg.slice(1)}'`)
                // }
              });
            }
          }
        }
      },
    };
  },
};
