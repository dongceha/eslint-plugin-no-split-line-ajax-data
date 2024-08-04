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
    recommended: {
      plugins: ['dc'],
      rules: {
        'dc/no-split-line-ajax-data': 'error',
        'dc/define-store-argument-key-unique': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'dc/func-no-async-cb': ['error'],
        // 'dc/template-vars-define': 'error',
        'dc/vairfy-isIos-isAndroid': 'error',
        'dc/varify-import-env': 'error',
      }
    }
  }
}