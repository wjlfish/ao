'use strict';
const {app, clipboard, dialog, shell} = require('electron');
const os = require('os');
const {activate} = require('./win');
const {release} = require('./url');
const file = require('./file');
const settings = require('./settings');

class Dialog {
  get _systemInfo() {
    return [
      `版本: ${app.getVersion()}`,
      `系統: ${os.type()} ${os.arch()} ${os.release()}`
    ].join('\n');
  }

  _about() {
    return this._create({
      buttons: ['好嘞！', '复制'],
      detail: `Developed by Kevin Wang.\n由Kevin Wang维护.\n联系方式：wjlfish@qq.com.\n本软件永久免费\n\n${this._systemInfo}`,
      message: `Ao ${app.getVersion()} (${os.arch()})`,
      title: '关于 Ao'
    });
  }

  _create(options) {
    return dialog.showMessageBox(
      Object.assign({
        cancelId: 1,
        defaultId: 0,
        icon: file.icon
      }, options)
    );
  }

  _exit() {
    return this._create({
      buttons: ['退出', '取消'],
      detail: '你确定你想要退出码？',
      message: '退出',
      title: 'Ao - 退出确认'
    });
  }

  _signOut() {
    return this._create({
      buttons: ['注销', '取消'],
      detail: '你确定要登出你的微软账户登录吗？',
      message: '登出',
      title: 'Ao - 登出确认'
    });
  }

  _restart() {
    return this._create({
      buttons: ['重新启动', '取消'],
      detail: '你确定你想要重启软件以更新设置码？',
      message: '重启以更新选定的设置',
      title: 'Ao - 需要登出'
    });
  }

  _update(version) {
    return this._create({
      buttons: ['好嘞！'],
      detail: `软件暂无新版本`,
      message: '软件暂无新版本',
      title: 'Ao - 无更新可用'
    });
  }

  confirmAbout() {
    if (this._about() === 1) {
      clipboard.writeText(this._systemInfo);
    }
  }

  confirmExit() {
    if (settings.get('requestExitConfirmation')) {
      if (this._exit() === 0) {
        app.quit();
      }
    } else {
      app.quit();
    }
  }

  confirmActivationRestart(option, state) {
    if (this._restart() === 0) {
      settings.set(option, state);
      app.quit();
      app.relaunch();
    }
  }

  confirmSignOut() {
    if (this._signOut() === 0) {
      activate('sign-out');
    }
  }

  updateError(content) {
    return dialog.showErrorBox('获取最新版本失败！', content);
  }

  noUpdate() {
    return this._create({
      buttons: ['好嘞！'],
      detail: `软件暂无新版本`,
      message: '软件暂无新版本',
      title: 'Ao - 无更新可用'
    });
  }

  getUpdate(version) {
    if (this._update(version) === 0) {
      shell.openExternal(release);
    }
  }
}

module.exports = new Dialog();
