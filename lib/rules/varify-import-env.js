/**
 * @fileoverview varify-import -env
 * @author dongce
 */
"use strict";
const path = require("path");
const fs = require("fs");

const validateViteEnvName = (node) => {
  if (node.object && node.object.object) {
    const memberObject = node.object.object
    const memberProperty = node.object.property
    if (!memberObject || !memberProperty) return
    if (!memberObject.meta) return
    if (
      memberObject.meta.name === "import" &&
      memberObject.property.name === 'meta' &&
      memberProperty.name === "env") {
        return node.property.name
      }
  }
}

let envConfig = ''
try {
  const env_path = path.resolve(process.cwd(), './env/.env.prod')
  envConfig = fs.readFileSync(env_path, 'utf-8')
} catch (error) {
  
}
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
      MemberExpression(node) {
        const vite_env_name = validateViteEnvName(node)
        if (vite_env_name) {
          if (!vite_env_name.startsWith('VITE_')) {
            context.report({
              node: node,
              message: `未定义的环境变量${vite_env_name} 被使用，请使用 VITE_${vite_env_name} 替换`,
            });
          }
          if (envConfig.indexOf(`${vite_env_name} =`) === -1 && envConfig.indexOf(`${vite_env_name}=`) === -1) {
            context.report({
              node,
              message: `.env.prod 中未定义的环境变量${vite_env_name} 被使用`,
            });
          }
        }
      }
    };
  }
};
