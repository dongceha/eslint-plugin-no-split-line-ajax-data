/**
 * @fileoverview no-split-line-ajax-data
 * @author dongce
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
const rules = requireIndex(__dirname + "/rules");

// 在这里导入了我们上面写的自定义规则
module.exports = {
  // rules是必须的
  rules,
  // 增加configs配置
  configs: {
    // 配置了这个之后，就可以在其他项目中像下面这样使用了
    // extends: ['plugin:no-split-line-ajax-data/recommended']
    recommended: {
      plugins: ['no-split-line-ajax-data'],
      rules: {
        'no-split-line-ajax-data/no-split-line-ajax-data': 'error',
      }
    }
  }
}

