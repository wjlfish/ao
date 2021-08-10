'use strict';
const {activate} = require('./../win');
const {is} = require('./../util');
const {setAcc} = require('./../keymap');
const dialog = require('./../dialog');
const settings = require('./../settings');

module.exports = {
  label: '界面',
  submenu: [
    {
      label: '刷新',
      accelerator: 'CmdOrCtrl+Shift+R',
      click: (_, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.reload();
        }
      }
    }, {
      type: 'separator'
    }, {
      label: '字体大小',
      submenu: [
        {
          label: '字大点',
          accelerator: 'CmdOrCtrl+Plus',
          click() {
            activate('zoom-in');
          }
        }, {
          label: '字小点',
          accelerator: 'CmdOrCtrl+-',
          click() {
            activate('zoom-out');
          }
        }, {
          label: '重置字体大小',
          accelerator: 'CmdOrCtrl+0',
          click() {
            activate('zoom-reset');
          }
        }
      ]
    }, {
      type: 'separator'
    }, {
      label: '主题',
      submenu: [
        {
          label: '护眼',
          accelerator: setAcc('toggle-sepia-mode', 'CmdOrCtrl+G'),
          click() {
            activate('toggle-sepia-mode');
          }
        }, {
          label: '深色',
          accelerator: setAcc('toggle-dark-mode', 'CmdorCtrl+H'),
          click() {
            activate('toggle-dark-mode');
          }
        }
      ]
    }, {
      label: '主题跟随系统',
      type: 'checkbox',
      checked: settings.get('autoNightMode'),
      accelerator: 'CmdorCtrl+Alt+N',
      click(item) {
        settings.set('autoNightMode', item.checked);
        activate('auto-night-mode');
      }
    }, {
      type: 'separator'
    }, {
      label: '永远置顶',
      type: 'checkbox',
      checked: settings.get('alwaysOnTop'),
      accelerator: 'CmdorCtrl+Shift+P',
      click(item, focusedWindow) {
        settings.set('alwaysOnTop', item.checked);
        focusedWindow.setAlwaysOnTop(item.checked);
      }
    }, {
      label: '隐藏托盘图标',
      type: 'checkbox',
      visible: !is.darwin,
      checked: settings.get('hideTray'),
      click(item) {
        dialog.confirmActivationRestart('hideTray', item.checked);
        item.checked = settings.get('hideTray');
      }
    }, {
      type: 'separator'
    }, {
      label: '显示项目栏',
      type: 'checkbox',
      checked: !settings.get('sideBarHidden'),
      accelerator: setAcc('toggle-sidebar', 'CmdorCtrl+O'),
      click() {
        activate('toggle-sidebar');
      }
    }, {
      label: '显示顶部菜单栏',
      type: 'checkbox',
      checked: !settings.get('menuBarHidden'),
      visible: !is.darwin,
      click(item, focusedWindow) {
        settings.set('menuBarHidden', !item.checked);
        focusedWindow.setMenuBarVisibility(item.checked);
        focusedWindow.setAutoHideMenuBar(!item.checked);
      }
    }, {
      label: '全屏',
      accelerator: is.darwin ? 'Ctrl+Command+F' : 'F11',
      click: (_, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          focusedWindow.send('window:fullscreen', {state: focusedWindow.isFullScreen()});
        }
      }
    }
  ]
};
