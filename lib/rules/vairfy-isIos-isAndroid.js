/**
 * @fileoverview vairfy-isIos -isAndroid
 * @author dongce
 */
"use strict";

const travelLeft = (node) => {
  let currentNode = node
  const nodeList = []
  if (node && !node.left && !node.right) {
    if (node.type === 'UnaryExpression') {
      nodeList.push(node.argument)
    } else {
      nodeList.push(node)
    }
  }
  while (currentNode) {
    if (currentNode.left) {
      if (currentNode.left.type === 'UnaryExpression') {
        nodeList.push(currentNode.left.argument || {})
      } else {
        nodeList.push(currentNode.left)
      }
    }
    if (currentNode.right) {
      if (currentNode.right.type === 'UnaryExpression') {
        nodeList.push(currentNode.right.argument || {})
      } else {
        nodeList.push(currentNode.right)
      }
    }
    currentNode = currentNode.left
  }
  return nodeList
}
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '确保 isIos 以函数形式调用',
      category: 'Best Practices',
    },
  },
  create(context) {
    return {
      IfStatement(node) {
        const nodeList = travelLeft(node.test)
        for (let i = 0; i < nodeList.length; i++) {
          const n = nodeList[i];
          if (['isAndroid', 'isIOS', 'isHarmony'].findIndex(name => name === n.name) > -1) {
            context.report({
              node,
              message: 'isIos isAndroid isHarmony必须以函数形式调用',
            });
          }
        }
      },
    };
  },
};