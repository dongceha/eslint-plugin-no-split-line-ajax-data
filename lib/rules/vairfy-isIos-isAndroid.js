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
      MemberExpression(node) {
        const nodeName = ['isAndroid', 'isIOS', 'isHarmony'].findIndex((name) => name === node.object.name);
        if (nodeName > -1 && node.property.name !== 'call' && node.property.name !== 'apply') {
          context.report({
            node,
            message: 'isIos isAndroid isHarmony必须以函数形式调用',
          });
        }
      },
    };
  },
};