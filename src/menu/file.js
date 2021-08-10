'use strict';
const {shell} = require('electron');
const {activate} = require('./../win');
const {is} = require('./../util');
const {setAcc} = require('./../keymap');
const dialog = require('./../dialog');
const file = require('./../file');
const settings = require('./../settings');

module.exports = {
  label: '应用',
  submenu: [
    {
      label: '搜索',
      accelerator: 'CmdorCtrl+F',
      click() {
        activate('search');
      }
    }, {
      type: 'separator'
    }, {
      label: '列表',
      submenu: [
        {
          label: '新建列表',
          accelerator: setAcc('new-list', 'CmdorCtrl+L'),
          click() {
            activate('new-list');
          }
        }, {
          label: '删除列表',
          accelerator: setAcc('delete-list', 'CmdorCtrl+Shift+D'),
          click() {
            activate('delete-list');
          }
        }, {
          label: '重命名列表',
          accelerator: setAcc('rename-list', 'CmdorCtrl+Y'),
          click() {
            activate('rename-list');
          }
        }, {
          type: 'separator'
        }, {
          label: '隐藏已完成项目',
          accelerator: setAcc('hide-todo', 'CmdorCtrl+Shift+H'),
          click() {
            activate('hide-todo');
          }
        }
      ]
    }, {
      label: '任务',
      submenu: [
        {
          label: '新建任务',
          accelerator: setAcc('new-todo', 'CmdorCtrl+N'),
          click() {
            activate('new-todo');
          }
        }, {
          label: '删除任务',
          accelerator: setAcc('delete-todo', 'CmdorCtrl+D'),
          click() {
            activate('delete-todo');
          }
        }, {
          label: '重命名任务',
          accelerator: setAcc('rename-todo', 'CmdorCtrl+T'),
          click() {
            activate('rename-todo');
          }
        }, {
          type: 'separator'
        }, {
          label: '添加到”我的一天“',
          accelerator: setAcc('add-my-day', 'CmdorCtrl+K'),
          click() {
            activate('add-my-day');
          }
        }, {
          label: '完成此项任务',
          accelerator: setAcc('complete-todo', 'CmdorCtrl+Shift+N'),
          click() {
            activate('complete-todo');
          }
        }, {
          type: 'separator'
        }, {
          label: '设置提醒',
          accelerator: setAcc('set-reminder', 'CmdorCtrl+Shift+E'),
          click() {
            activate('set-reminder');
          }
        }, {
          label: '添加到期时间',
          accelerator: setAcc('add-due-date', 'CmdorCtrl+Shift+T'),
          click() {
            activate('add-due-date');
          }
        }
      ]
    }, {
      type: 'separator'
    }, {
      label: '前往',
      submenu: [
        {
          label: '我的一天',
          accelerator: setAcc('my-day', 'CmdorCtrl+M'),
          click() {
            activate('my-day');
          }
        }, {
          label: '任务',
          accelerator: setAcc('tasks', 'CmdorCtrl+A'),
          click() {
            activate('tasks');
          }
        }
      ]
    }, {
      type: 'separator'
    }, {
      label: '设置',
      accelerator: setAcc('settings', 'CmdorCtrl+,'),
      click() {
        activate('settings');
      }
    }, {
      label: '开机自启',
      type: 'checkbox',
      checked: settings.get('autoLaunch'),
      click(item) {
        settings.set('autoLaunch', item.checked);
        activate('auto-launch');
      }
    }, {
      label: '启动时最小化',
      type: 'checkbox',
      checked: settings.get('launchMinimized'),
      click(item) {
        settings.set('launchMinimized', item.checked);
      }
    }, {
      type: 'separator'
    }, {
      label: '编辑快捷键',
      accelerator: 'CmdorCtrl+.',
      click() {
        shell.openExternal(file.localConfig);
      }
    }, {
      label: '启用全局快捷键（可能与其他应用产生冲突）',
      type: 'checkbox',
      checked: settings.get('useGlobalShortcuts'),
      click(item) {
        dialog.confirmActivationRestart('useGlobalShortcuts', item.checked);
        item.checked = settings.get('useGlobalShortcuts');
      }
    }, {
      label: '退出时确认',
      type: 'checkbox',
      checked: settings.get('requestExitConfirmation'),
      click(item) {
        settings.set('requestExitConfirmation', item.checked);
      }
    }, {
      type: 'separator'
    }, {
      label: '退出微软账号登录',
      accelerator: setAcc('sign-out', 'CmdorCtrl+Alt+Q'),
      click() {
        dialog.confirmSignOut();
      }
    }, {
      label: '退出软件',
      visible: !is.darwin,
      click() {
        dialog.confirmExit();
      }
    }
  ]
};
