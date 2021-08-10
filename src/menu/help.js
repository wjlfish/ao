'use strict';
const {app, shell} = require('electron');
const dialog = require('./../dialog');
const settings = require('./../settings');
const update = require('./../update');
const url = require('./../url');

module.exports = {
  label: '帮助',
  submenu: [
    {
      label: '查看服务协议',
      click() {
        shell.openExternal(url.license);
      }
    }, {

      type: 'separator'
    }, {
      label: `当前版本 ${app.getVersion()}`,
      enabled: false
    }, {
      label: '检查更新',
      click() {
        update.check();
      }
    }, {

      type: 'separator'
    }, {
      role: 'about',
      click() {
        dialog.confirmAbout();
      }
    }
  ]
};
