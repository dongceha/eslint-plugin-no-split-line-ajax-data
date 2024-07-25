/**
 * @fileoverview define-store-argument-key-unique
 * @author dongce
 */
"use strict";
const keySet = new Set()
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "这是defineStore的使用方法",
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
        if (node?.callee?.name === 'defineStore') {
          if (node?.arguments?.length > 0) {
            const arg = node.arguments[0]?.value
            if (keySet.has(arg)) {
              context.report({
                node: node,
                message: `${arg}作为defineStore的key重复了！！`,
              });
            } else {
              keySet.add(arg)
            }
          }
        }
      },
    };
  },
};
