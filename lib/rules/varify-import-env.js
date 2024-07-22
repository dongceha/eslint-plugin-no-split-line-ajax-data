/**
 * @fileoverview no-split-line-ajax-data
 * @author dongce
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// TODO: 手动导入 env 文件
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "检测 Vue 3 中未定义的环境变量使用情况",
      category: "Possible Errors",
    },
  },
  create(context) {
    return {
      Identifier(node) {
        if (
          node.name.startsWith("VUE_APP_") &&
          (typeof process.env[node.name] !== 'undefined')
        ) {
          context.report({
            node,
            message: `未定义的环境变量 '${node.name}' 被使用。`
          });
        }
      }
    };
  }
};
