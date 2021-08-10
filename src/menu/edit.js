'use strict';

module.exports = {
  label: '操作',
  submenu: [
    {
      type: 'separator'
    }, {
      label: '撤销',
      role: 'undo'
    }, {
      label: '重做',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: '剪切',
      role: 'cut'
    }, {
      label: '复制',
      role: 'copy'
    }, {
      label: '粘贴',
      role: 'paste'
    }, {
      label: '按原格式粘贴',
      role: 'pasteandmatchstyle'
    }, {
      label: '删除',
      role: 'delete'
    }, {
      label: '全选',
      role: 'selectall'
    }
  ]
};
