/* global chrome */
const clearCache = () => {
  chrome.storage.local.clear();
}

const fetch = (getWhat) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(getWhat,(data) => {
      resolve(data);
    });
  });
};

const notify = (params) => {
  return new Promise((resolve, reject) => {
    chrome.notifications.create({
      type: 'basic',
      title: params.title || 'Chrome Extension',
      message: params.message || '',
      buttons: params.buttons ? [{ title: 'Yes' }, { title: 'No' }] : [],
      requireInteraction: false,
      iconUrl: 'assets/img/icon.png',
    }, resolve);
  });
}

const sendMessage = (msg) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(msg, resolve);
  });
}

const setBadgeIcon = (iconPath) => {
  chrome.browserAction.setIcon({path: iconPath});
}

const setBadgeText = (text = 'ext') => {
  chrome.browserAction.setBadgeText({
    text: text,
  });
};

const setupContextMenu = (reset) => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: 'reset_extension', title: 'Reset extension', contexts: ['browser_action'] });
    chrome.contextMenus.onClicked.addListener((info) => {
      if (info.menuItemId === 'reset_extension') {
        reset();
      }
    });
  });
}

const setupStartup = () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.onStartup.addListener(() => {
      resolve();
    });
  });
}

const store = (dataObj) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(dataObj, resolve);
  });
}

export {
  clearCache,
  fetch,
  notify,
  sendMessage,
  setBadgeIcon,
  setBadgeText,
  setupContextMenu,
  setupStartup,
  store,
}

