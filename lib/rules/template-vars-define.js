module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '确保 Vue 3 template 中的变量和函数在 setup 中已定义',
      category: 'Best Practices',
    },
  },
  create(context) {
    // 获取到当前解析的 Vue 文件的 AST（抽象语法树）
    const ast = context.getSourceCode().ast;

    // 用于存储在 setup 中定义的变量和函数名
    const definedInSetup = new Set();

    // 遍历 AST 中的所有节点
    ast.traverse({
      // 处理 setup 函数的节点
      'ScriptSetup': (node) => {
        // 获取 setup 函数体中的所有声明节点
        const declarations = node.body.body.filter(n => n.type === 'VariableDeclaration' || n.type === 'FunctionDeclaration');
        // 将声明的变量和函数名添加到定义集合中
        declarations.forEach(declaration => {
          if (declaration.type === 'VariableDeclaration') {
            declaration.declarations.forEach(variable => definedInSetup.add(variable.id.name));
          } else {
            definedInSetup.add(declaration.id.name);
          }
        });
      },
      // 处理模板节点中的变量和函数引用
      'VElement': (node) => {
        const attributes = node.startTag.attributes;
        attributes.forEach(attr => {
          if (attr.value && attr.value.type === 'VExpressionContainer') {
            const expression = attr.value.expression;
            if (expression.type === 'Identifier') {
              const name = expression.name;
              // 如果在模板中使用的变量或函数未在 setup 中定义，报告错误
              if (!definedInSetup.has(name)) {
                context.report({
                  node: attr,
                  message: `在 template 中使用的 '${name}' 未在 setup 中定义`,
                });
              }
            }
          }
        });
      },
    });
  },
};