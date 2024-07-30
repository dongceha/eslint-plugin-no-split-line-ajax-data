/**
 * @fileoverview func-no-async-cb
 * @author dongce
 */
"use strict";
const path = require("path");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
let envConfig = ''
try {
  const env_path = path.resolve(process.cwd(), './eslint_config/index.js')
  envConfig = fs.readFileSync(env_path, 'utf-8')
} catch (error) {

}
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
    const options = envConfig || {}
    const {
      argumentFunction = {},
      configFunction = {}
    } = options
    const validateProperty = (argumentCfg, configArr, node, funcName, args) => {
      if (argumentCfg && argumentCfg.type === 'ObjectExpression') {
        const argProperties = argumentCfg.properties
        if (argProperties && argProperties.length > 0) {
          argProperties.forEach(prop => {
            if (configArr.includes(prop.key?.name)) {
              if (prop.value?.async) {
                context.report({
                  node: node,
                  message: `${funcName}的${prop.key?.name}参数不能是异步函数`,
                })
              } else {
                if (args) {
                  const { grandPa, index } = args
                  for (let i = index; i >= 0; i--) {
                    const element = grandPa.body[i];
                    if (element.type === 'FunctionDeclaration' && element.id.name === prop.value?.name) {
                      if (element.async) {
                        context.report({
                          node: node,
                          message: `${funcName}的${prop.key?.name}参数不能是异步函数`,
                        })
                      }
                      break
                    } else if (element.type === 'VariableDeclaration') {
                      const declaration = element.declarations?.[0]
                      if (declaration && declaration.id.name === prop.value?.name) {
                        if (declaration?.init?.async) {
                          context.report({
                            node: node,
                            message: `${funcName}的${prop.key?.name}参数不能是异步函数`,
                          })
                        }
                        break
                      }
                    }
                  }
                }
              }
            }
          })
        }
      }
    }

    const fundParents = (node, cfgName) => {
      const parent = node.parent
      const grandPa = parent.parent

      const nodeIndex = grandPa.body?.findIndex(item => item === parent)
      if (nodeIndex === -1) return
      for (let i = nodeIndex; i >= 0; i --) {
        const element = grandPa.body[i];
        if (element.type === 'VariableDeclaration') {
          const declaration = element.declarations?.[0]
          if (declaration && declaration.id.name === cfgName) {
            return {
              declaration,
              grandPa,
              index: i,
              element
            }
          }
        }
      }
      return {}
    }
    /**
     * 获取函数的参数的开始、结束位置
     * @param {node} node AST Node 
     */
    return {
      CallExpression: (node) => {
        const funcName = node.callee.name
        const argumentArr = argumentFunction[funcName]
        if (Array.isArray(argumentArr) && argumentArr.length > 0) {
          argumentArr.forEach(argIndex => {
            const arg = node.arguments[argIndex]
            if (arg && arg.async) {
              context.report({
                node: node,
                message: `${funcName}的第${argIndex}参数不能是异步函数`,
              })
            }
          })
        }
        const configArr = configFunction[funcName]
        if (configArr && configArr.length > 0) {
          const argumentCfg = node.arguments?.[0]
          if (argumentCfg && argumentCfg.type === 'Identifier') {
            const cfgName = argumentCfg.name
            const { declaration, ...args } = fundParents(node, cfgName) || {}
            if (declaration) {
              validateProperty(declaration.init || {}, configArr, node, funcName, { cfgName, ...args })
            }
          } else {
            validateProperty(argumentCfg, configArr, node, funcName)
          }
        }
      },
    };
  },
};
