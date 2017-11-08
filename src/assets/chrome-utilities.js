/* global chrome */
const clearCache = () => {
  chrome.storage.local.clear();
}

const fetch = (getWhat, callback) => {
  chrome.storage.local.get(getWhat,(data) => {
    callback(data);
  });
};

const notify = (params, stopSpinner) => {
  chrome.notifications.create({
    type: 'basic',
    title: params.title || 'Chrome Extension',
    message: params.message || '',
    buttons: params.buttons ? [{ title: 'Yes' }, { title: 'No' }] : [],
    requireInteraction: false,
    iconUrl: 'assets/img/icon.png',
  }, () => {
  });
}

const sendMessage = (msg) => {
  chrome.runtime.sendMessage(msg, () => {
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

const setupStartup = (callback) => {
  chrome.runtime.onStartup.addListener(() => {
    callback();
  });
}

const store = (dataObj, callback = () => {}) => {
  chrome.storage.local.set(dataObj, callback);
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

