'use strict';
const {shell} = require('electron');
const dialog = require('./../dialog');
const settings = require('./../settings');
const url = require('./../url');
const win = require('./../win');

module.exports = [
  {
    label: '打开主界面',
    click() {
      win.toggle();
    }
  }, {
    type: 'separator'
  }, {
    label: '搜索',
    click() {
      win.appear();
      win.activate('search');
    }
  }, {
    type: 'separator'
  }, {
    label: '创建',
    submenu: [
      {
        label: '新列表',
        click() {
          win.appear();
          win.activate('new-list');
        }
      }, {
        label: '新任务',
        click() {
          win.appear();
          win.activate('new-todo');
        }
      }
    ]
  }, {
    label: '我的一天',
    click() {
      win.appear();
      win.activate('my-day');
    }
  }, {
    type: 'separator'
  }, {
    label: '主题',
    submenu: [
      {
        label: '护眼',
        click() {
          win.appear();
          win.activate('toggle-sepia-mode');
        }
      }, {
        label: '深色',
        click() {
          win.appear();
          win.activate('toggle-dark-mode');
        }
      }
    ]
  }, {
    label: '主题跟随系统',
    type: 'checkbox',
    checked: settings.get('autoNightMode'),
    click(item) {
      win.appear();
      settings.set('autoNightMode', item.checked);
      win.activate('auto-night-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: '设置',
    click() {
      win.appear();
      win.activate('settings');
    }
  }, {
    label: 'bug报告',
    click() {
      shell.openExternal(url.issue);
    }
  }, {
    type: 'separator'
  }, {
    label: '退出软件',
    click() {
      dialog.confirmExit();
    }
  }
];
